import { doc, setDoc } from 'firebase/firestore';

import { FirebaseAuth, Firestore } from '../../FirebaseConfig';
import UploadFile from '../../UploadFile';

const CREATORPBSLICE = 10;

export async function SaveNFTImage(
  fileToUpload: File | Blob,
  creator: string
): Promise<string> {
  if (FirebaseAuth.currentUser != null) {
    const creatorShort = creator.slice(0, CREATORPBSLICE);
    const filePath = `users/${FirebaseAuth.currentUser.uid}/n/${creatorShort}/im.png`;
    const [imageUrl] = await UploadFile(filePath, fileToUpload);
    const userRef = doc(Firestore, 'memberFiles', FirebaseAuth.currentUser.uid);

    await setDoc(
      userRef,
      {
        [creator]: { image: imageUrl },
      },
      { merge: true }
    );

    return imageUrl;
  }
  throw new Error('User can not be null to update NFT image');
}

export async function SaveNFTJson(
  fileToUpload: File | Blob,
  creator: string
): Promise<string> {
  if (FirebaseAuth.currentUser != null) {
    const creatorShort = creator.slice(0, CREATORPBSLICE);
    const filePath = `users/${FirebaseAuth.currentUser.uid}/n/${creatorShort}/mt.json`;
    const [jsonUrl] = await UploadFile(filePath, fileToUpload);
    const userRef = doc(Firestore, 'memberFiles', FirebaseAuth.currentUser.uid);

    await setDoc(
      userRef,
      {
        [creator]: { metadata: jsonUrl },
      },
      { merge: true }
    );

    return jsonUrl;
  }
  throw new Error('User can not be null to update NFT metadata');
}
