import {
  getDoc,
  doc,
  collection,
  query,
  where,
  documentId,
  getDocs,
  orderBy,
} from 'firebase/firestore';
import { IpostContent, IpostPreview, TpostSate } from 'types/types';
import { PostPreviewConverter } from 'services/Firebase/Converters/PostPreviewConverter';
import { PostContentConverter } from 'services/Firebase/Converters/PostContentConverter';
import { Firestore, FirebaseAuth } from '../FirebaseConfig';

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
