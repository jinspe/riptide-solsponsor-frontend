import { doc, updateDoc } from 'firebase/firestore';

import { FirebaseAuth, Firestore } from '../../FirebaseConfig';
import UploadFile from '../UploadFile';

export async function SaveDisplayName(displayName: string): Promise<void> {
  if (FirebaseAuth.currentUser != null) {
    const userRef = doc(Firestore, 'users', FirebaseAuth.currentUser.uid);

    await updateDoc(userRef, {
      displayName,
    });
  } else {
    throw new Error('User can not be null to update info');
  }
}

export async function SaveProfileImage(
  fileToUpload: File | Blob
): Promise<string> {
  if (FirebaseAuth.currentUser != null) {
    const filePath = `users/${FirebaseAuth.currentUser.uid}/profileImage.png`;
    const [imageUrl] = await UploadFile(filePath, fileToUpload);
    const userRef = doc(Firestore, 'users', FirebaseAuth.currentUser.uid);

    await updateDoc(userRef, {
      profileImage: imageUrl,
    });
    return imageUrl;
  }
  throw new Error('User can not be null to update profile image');
}

export async function setUserAsCreator(): Promise<void> {
  if (FirebaseAuth.currentUser != null) {
    const userRef = doc(Firestore, 'users', FirebaseAuth.currentUser.uid);

    await updateDoc(userRef, {
      isCreator: true,
    });
  } else {
    throw new Error('User can not be null to update profile');
  }
}
