import { doc, setDoc, addDoc, collection } from 'firebase/firestore';

import {
  IattachmentLocal,
  IpostPreview,
  Iattachment,
  IpostContent,
} from 'types/types';
import { PostPreviewConverter } from 'services/Firebase/Converters/PostPreviewConverter';
import { PostContentConverter } from 'services/Firebase/Converters/PostContentConverter';
import { FirebaseAuth, Firestore } from '../../FirebaseConfig';
import UploadFile from '../UploadFile';

/* eslint-disable max-len */
export async function saveNewPostPreview(
  postPreview: IpostPreview
): Promise<string> {
  if (FirebaseAuth.currentUser != null) {
    const postRef = await addDoc(
      collection(
        Firestore,
        `posts/${FirebaseAuth.currentUser.uid}/previews`
      ).withConverter(PostPreviewConverter),
      postPreview
    );
    return postRef.id;
  }
  throw new Error('User can not be null to create a post');
}

export async function updatePostPreview(
  postPreview: IpostPreview
): Promise<void> {
  if (FirebaseAuth.currentUser != null) {
    const postPreviewRef = doc(
      Firestore,
      `posts/${FirebaseAuth.currentUser.uid}/previews`,
      postPreview.id
    ).withConverter(PostPreviewConverter);
    await setDoc(postPreviewRef, postPreview);
  } else {
    throw new Error('User can not be null to update a post');
  }
}

async function uploadAttachment(
  attachment: IattachmentLocal,
  postId: string
): Promise<Iattachment> {
  if (FirebaseAuth.currentUser != null) {
    const filePath = `posts/${FirebaseAuth.currentUser.uid}/${postId}/attachment/${attachment.name}`;
    const [fileUrl] = await UploadFile(filePath, attachment.file);
    return {
      filePath,
      fileUrl,
      fileType: attachment.fileType,
      name: attachment.name,
    };
  }
  throw new Error('User can not be null to upload an attachment');
}

export async function savePost(
  attachmentsLocal: IattachmentLocal[],
  postPreview: IpostPreview,
  postContent: string
): Promise<string> {
  if (FirebaseAuth.currentUser != null) {
    let postId = postPreview.id;
    if (postPreview.id === '') {
      postId = await saveNewPostPreview(postPreview);
    } else {
      await updatePostPreview(postPreview);
    }

    const attachmentPromises: Promise<Iattachment>[] = [];
    attachmentsLocal.forEach((att) => {
      // vs code doesn t see that I check up there
      if (FirebaseAuth.currentUser != null) {
        attachmentPromises.push(uploadAttachment(att, postId));
      }
    });

    const attachmentsResult = await Promise.all(attachmentPromises);

    const SavedPostContent: IpostContent = {
      id: postId,
      content: postContent,
      attachments: attachmentsResult,
    };
    const postContentRef = doc(
      Firestore,
      `posts/${FirebaseAuth.currentUser.uid}/content`,
      postId
    ).withConverter(PostContentConverter);
    await setDoc(postContentRef, SavedPostContent);

    return postId;
  }
  throw new Error('User can not be null to create a post');
}
/* 
export async function publishPost(postId: string): Promise<void> {
  if (FirebaseAuth.currentUser != null) {
    const postPreviewRef = doc(
      Firestore,
      `posts/${FirebaseAuth.currentUser.uid}/previews`,
      postId
    );

    await updateDoc(postPreviewRef, {
      state: 'published',
    });
  }
  throw new Error('User can not be null to publish a post');
} */
