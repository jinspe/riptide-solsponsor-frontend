import { doc, deleteDoc } from 'firebase/firestore';
import { ref, deleteObject } from 'firebase/storage';

import { getPostContent } from 'services/Firebase/GetData/PostUtils';

import { FirebaseAuth, Firestore, FirebaseStorage } from '../../FirebaseConfig';

/* eslint-disable max-len */

export async function deleteAttachment(filePath: string): Promise<void> {
  if (FirebaseAuth.currentUser != null) {
    const attRef = ref(FirebaseStorage, filePath);
    await deleteObject(attRef);
  } else {
    throw new Error('User can not be null to delete an attachment');
  }
}

export async function postDelete(postId: string): Promise<void> {
  if (FirebaseAuth.currentUser != null) {
    const postContent = await getPostContent(
      postId,
      FirebaseAuth.currentUser.uid
    );
    if (postContent !== undefined) {
      const deletePromises: Promise<void>[] = [];
      postContent.attachments.forEach((att) => {
        const attRef = ref(FirebaseStorage, att.filePath);
        deletePromises.push(deleteObject(attRef));
      });
      await Promise.all(deletePromises);
    }

    const contentRef = doc(
      Firestore,
      `posts/${FirebaseAuth.currentUser.uid}/content/${postId}`
    );
    const previewRef = doc(
      Firestore,
      `posts/${FirebaseAuth.currentUser.uid}/previews/${postId}`
    );
    await Promise.all([deleteDoc(previewRef), deleteDoc(contentRef)]);
  } else {
    throw new Error('User can not be null to delete a post');
  }
}
