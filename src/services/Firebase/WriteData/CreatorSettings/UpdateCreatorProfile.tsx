import { doc, setDoc } from 'firebase/firestore';

import { defaultTierImage } from 'components/Common/Util/DefaultValues';

import { FirebaseAuth, Firestore } from '../../FirebaseConfig';
import UploadFile from '../UploadFile';

export async function SaveCreatorInfos(
  displayName: string,
  bio: string,
  tags: string[],
  profileImage: string,
  coverImage: string
): Promise<void> {
  if (FirebaseAuth.currentUser != null) {
    const userRef = doc(Firestore, 'creators', FirebaseAuth.currentUser.uid);

    await setDoc(
      userRef,
      {
        displayName,
        bio,
        tags,
        profileImage,
        coverImage,
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

export async function SaveTierImage(
  fileToUpload: File | Blob
): Promise<string> {
  if (FirebaseAuth.currentUser != null) {
    const filePath = `creators/${FirebaseAuth.currentUser.uid}/profile/tierImage.png`;
    const [imageUrl] = await UploadFile(filePath, fileToUpload);
    const userRef = doc(Firestore, 'creators', FirebaseAuth.currentUser.uid);

    await setDoc(
      userRef,
      {
        tierImage: imageUrl,
      },
      { merge: true }
    );
    return imageUrl;
  }
  throw new Error('User can not be null to update cover image');
}

export async function CreateTier(): Promise<void> {
  if (FirebaseAuth.currentUser != null) {
    const userRef = doc(Firestore, 'creators', FirebaseAuth.currentUser.uid);

    await setDoc(
      userRef,
      {
        tierImage: defaultTierImage,
        tierPrice: 0.2,
        tierTitle: 'Buckle up!',
        tierDescription: '',
      },
      { merge: true }
    );
  } else {
    throw new Error('User can not be null to create a tier!');
  }
}

export async function UpdateTier(
  price: number,
  title: string,
  description: string
): Promise<void> {
  if (FirebaseAuth.currentUser != null) {
    const userRef = doc(Firestore, 'creators', FirebaseAuth.currentUser.uid);

    await setDoc(
      userRef,
      {
        tierPrice: price,
        tierTitle: title,
        tierDescription: description,
      },
      { merge: true }
    );
  } else {
    throw new Error('User can not be null to create a tier!');
  }
}
