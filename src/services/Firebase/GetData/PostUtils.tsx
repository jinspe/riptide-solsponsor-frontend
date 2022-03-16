import {
  getDoc,
  doc,
  collection,
  query,
  where,
  documentId,
  getDocs,
  orderBy,
  startAt,
  limit,
  QueryDocumentSnapshot,
} from 'firebase/firestore';
import { IpostContent, IpostPreview, IFullPost } from 'types/types';
import { PostPreviewConverter } from 'services/Firebase/Converters/PostPreviewConverter';
import { PostContentConverter } from 'services/Firebase/Converters/PostContentConverter';
import { Firestore, FirebaseAuth } from '../FirebaseConfig';

export async function getPostPreview(
  postId: string,
  cId: string
): Promise<IpostPreview | undefined> {
  const postRef = collection(Firestore, `posts/${cId}/previews`);

  const postQuery = query(
    postRef,
    where('state', '==', 'published'),
    where(documentId(), '==', postId)
  ).withConverter(PostPreviewConverter);

  const postPreview = await getDocs(postQuery);
  if (postPreview.docs.length > 0) {
    return postPreview.docs[0].data();
  }
  return undefined;
}

export async function getPostContent(
  postId: string,
  cId: string
): Promise<IpostContent | undefined> {
  const postRef = doc(
    Firestore,
    `posts/${cId}/content/${postId}`
  ).withConverter(PostContentConverter);

  const postContent = await getDoc(postRef);
  if (postContent.exists()) {
    return postContent.data();
  }
  return undefined;
}

export async function hasAccessToContent(cId: string): Promise<boolean> {
  // check if has access
  if (FirebaseAuth.currentUser?.uid === cId) {
    return true;
  }

  let hasAccess = false;
  const userTokens = await FirebaseAuth.currentUser?.getIdTokenResult();
  const claims = userTokens?.claims;
  if (claims !== undefined) {
    const claimForC = claims[cId] as unknown;
    if ((claimForC as number) > new Date().getTime()) {
      hasAccess = true;
    }
  }

  return hasAccess;
}

export async function getFullPost(
  postId: string,
  cId: string
): Promise<IFullPost | undefined> {
  // IpostPreview | [IpostPreview, IpostContent]

  const postPreview = await getPostPreview(postId, cId);
  if (postPreview === undefined) {
    return undefined;
  }

  // check if has access
  const hasAccess = await hasAccessToContent(cId);

  if (hasAccess) {
    const postContent = await getPostContent(postId, cId);
    if (postContent === undefined) {
      return undefined;
    }
    return { preview: postPreview, content: postContent };
  }
  return { preview: postPreview, content: undefined };
}

export async function queryPostPreviewByCreator(
  cId: string,
  startSnap: QueryDocumentSnapshot<IpostPreview> | undefined,
  quantity: number
): Promise<[IpostPreview[], QueryDocumentSnapshot<IpostPreview>]> {
  const postPreviewList: IpostPreview[] = [];
  const postRef = collection(Firestore, `posts/${cId}/previews`);
  let postQuery = query(
    postRef,
    where('state', '==', 'published'),
    orderBy('timeCreation', 'desc'),
    limit(quantity)
  ).withConverter(PostPreviewConverter);

  if (startSnap !== undefined) {
    postQuery = query(
      postRef,
      where('state', '==', 'published'),
      orderBy('timeCreation', 'desc'),
      startAt(startSnap),
      limit(quantity)
    ).withConverter(PostPreviewConverter);
  }

  const postPreview = await getDocs(postQuery);
  const lastVisible = postPreview.docs[postPreview.docs.length - 1];

  postPreview.forEach((postDoc) => {
    postPreviewList.push(PostPreviewConverter.fromFirestore(postDoc));
  });

  return [postPreviewList, lastVisible];
}

export async function queryFullPostByCreator(
  cId: string,
  startSnap: QueryDocumentSnapshot<IpostPreview> | undefined,
  quantity: number
): Promise<[IFullPost[], QueryDocumentSnapshot<IpostPreview>]> {
  const [postPreviews, lastVisible] = await queryPostPreviewByCreator(
    cId,
    startSnap,
    quantity
  );
  const hasAccess = await hasAccessToContent(cId);

  const fullPostList: IFullPost[] = [];

  if (!hasAccess) {
    postPreviews.forEach((preview) => {
      fullPostList.push({ preview, content: undefined });
    });

    return [fullPostList, lastVisible];
  }
  const postContentPromises: Array<Promise<IpostContent | undefined>> = [];
  postPreviews.forEach((preview) => {
    postContentPromises.push(getPostContent(preview.id, cId));
  });
  const postContents = await Promise.all(postContentPromises);

  postPreviews.forEach((preview, idx) => {
    fullPostList.push({ preview, content: postContents[idx] });
  });
  return [fullPostList, lastVisible];
}
