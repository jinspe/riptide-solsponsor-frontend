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
  QueryDocumentSnapshot,
  limit,
} from 'firebase/firestore';
import { IpostContent, IpostPreview, TpostSate, IFullPost } from 'types/types';
import { PostPreviewConverter } from 'services/Firebase/Converters/PostPreviewConverter';
import { PostContentConverter } from 'services/Firebase/Converters/PostContentConverter';
import { Firestore, FirebaseAuth } from '../FirebaseConfig';

export async function getSelfPostPreview(
  postId: string,
  cId: string,
  state: TpostSate | 'any'
): Promise<IpostPreview | undefined> {
  const postRef = collection(Firestore, `posts/${cId}/previews`);

  let postQuery = query(
    postRef,
    where(documentId(), '==', postId)
  ).withConverter(PostPreviewConverter);

  if (state !== 'any') {
    postQuery = query(
      postRef,
      where('state', '==', state),
      where(documentId(), '==', postId)
    ).withConverter(PostPreviewConverter);
  }

  const postPreview = await getDocs(postQuery);
  if (postPreview.docs.length > 0) {
    return postPreview.docs[0].data();
  }
  return undefined;
}

export async function getSelfPostContent(
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

export async function getSelfFullPost(
  postId: string,
  cId: string,
  state: TpostSate | 'any'
): Promise<
  | [IpostPreview, undefined]
  | [IpostPreview, IpostContent]
  | [undefined, undefined]
> {
  // IpostPreview | [IpostPreview, IpostContent]

  const postPreview = await getSelfPostPreview(postId, cId, state);
  if (postPreview === undefined) {
    return [undefined, undefined];
  }

  // check if has access
  let hasAccess = false;
  const userTokens = await FirebaseAuth.currentUser?.getIdTokenResult();
  const claims = userTokens?.claims;
  if (claims !== undefined) {
    const claimForC = claims[cId] as unknown;
    if ((claimForC as number) > new Date().getTime()) {
      hasAccess = true;
    }
  }
  if (FirebaseAuth.currentUser?.uid === cId) {
    hasAccess = true;
  }

  if (hasAccess) {
    const postContent = await getSelfPostContent(postId, cId);
    if (postContent === undefined) {
      return [undefined, undefined];
    }
    return [postPreview, postContent];
  }
  return [postPreview, undefined];
}

export async function querySelfPreviewPost(
  state: TpostSate
): Promise<IpostPreview[]> {
  if (FirebaseAuth.currentUser != null) {
    const postPreviewList: IpostPreview[] = [];
    const postRef = collection(
      Firestore,
      `posts/${FirebaseAuth.currentUser.uid}/previews`
    );
    const postQuery = query(
      postRef,
      where('state', '==', state),
      orderBy('timeCreation', 'desc')
    ).withConverter(PostPreviewConverter);

    const postPreview = await getDocs(postQuery);

    postPreview.forEach((postDoc) => {
      postPreviewList.push(PostPreviewConverter.fromFirestore(postDoc));
    });

    return postPreviewList;
  }
  throw new Error('User can not be get its draft posts');
}

export async function querySelfPostPreview(
  state: string,
  startSnap: QueryDocumentSnapshot<IpostPreview> | undefined,
  quantity: number
): Promise<[IpostPreview[], QueryDocumentSnapshot<IpostPreview>]> {
  if (FirebaseAuth.currentUser != null) {
    const postPreviewList: IpostPreview[] = [];
    const postRef = collection(
      Firestore,
      `posts/${FirebaseAuth.currentUser.uid}/previews`
    );
    let postQuery = query(
      postRef,
      where('state', '==', state),
      orderBy('timeCreation', 'desc'),
      limit(quantity)
    ).withConverter(PostPreviewConverter);

    if (startSnap !== undefined) {
      postQuery = query(
        postRef,
        where('state', '==', state),
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
  throw new Error('User can not be get its posts');
}

export async function querySelfFullPost(
  state: string,
  startSnap: QueryDocumentSnapshot<IpostPreview> | undefined,
  quantity: number
): Promise<[IFullPost[], QueryDocumentSnapshot<IpostPreview>]> {
  if (FirebaseAuth.currentUser != null) {
    const cId = FirebaseAuth.currentUser.uid;
    const [postPreviews, lastVisible] = await querySelfPostPreview(
      state,
      startSnap,
      quantity
    );

    const fullPostList: IFullPost[] = [];
    const postContentPromises: Array<Promise<IpostContent | undefined>> = [];

    postPreviews.forEach((preview) => {
      if (FirebaseAuth.currentUser != null) {
        postContentPromises.push(getSelfPostContent(preview.id, cId));
      }
    });
    const postContents = await Promise.all(postContentPromises);

    postPreviews.forEach((preview, idx) => {
      fullPostList.push({ preview, content: postContents[idx] });
    });
    return [fullPostList, lastVisible];
  }
  throw new Error('User can not be get its posts');
}
