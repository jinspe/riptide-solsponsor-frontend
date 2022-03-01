import { doc, setDoc } from 'firebase/firestore';

import { FirebaseAuth, Firestore } from '../../FirebaseConfig';
import UploadFile from '../../UploadFile';

/* eslint-disable max-len */

export async function SaveCreatorInfos(
  displayName: string,
  bio: string
): Promise<void> {
  if (FirebaseAuth.currentUser != null) {
    const userRef = doc(Firestore, 'creators', FirebaseAuth.currentUser.uid);

    await setDoc(
      userRef,
      {
        displayName,
        bio,
      },
      { merge: true }
    );
  } else {
    throw new Error('User can not be null to update info');
  }
}

export async function SaveProfileImage(
  fileToUpload: File | Blob
): Promise<string> {
  if (FirebaseAuth.currentUser != null) {
    const filePath = `creators/${FirebaseAuth.currentUser.uid}/profile/profileImage.png`;
    const [imageUrl] = await UploadFile(filePath, fileToUpload);
    const userRef = doc(Firestore, 'creators', FirebaseAuth.currentUser.uid);

    await setDoc(
      userRef,
      {
        profileImage: imageUrl,
      },
      { merge: true }
    );
    return imageUrl;
  }
  throw new Error('User can not be null to update profile image');
}

export async function SaveCoverImage(
  fileToUpload: File | Blob
): Promise<string> {
  if (FirebaseAuth.currentUser != null) {
    const filePath = `creators/${FirebaseAuth.currentUser.uid}/profile/coverImage.png`;
    const [imageUrl] = await UploadFile(filePath, fileToUpload);
    const userRef = doc(Firestore, 'creators', FirebaseAuth.currentUser.uid);

    await setDoc(
      userRef,
      {
        coverImage: imageUrl,
      },
      { merge: true }
    );
    return imageUrl;
  }
  throw new Error('User can not be null to update cover image');
}
