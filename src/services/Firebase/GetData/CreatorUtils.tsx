import {
  query,
  collection,
  where,
  getDocs,
  getDoc,
  DocumentData,
  doc,
} from 'firebase/firestore';
import { ICreator } from 'types/types';

import { Firestore } from '../FirebaseConfig';

export async function getCreatorInfosByUserName(
  userName: string
): Promise<DocumentData> {
  const userQuery = query(
    collection(Firestore, 'creators'),
    where('userName', '==', userName)
  );
  const userSnapshot = await getDocs(userQuery);
  if (userSnapshot.docs.length !== 0) {
    return userSnapshot.docs[0];
  }
  throw new Error("User doesn't exist");
}

export async function checkUserNameExist(userName: string): Promise<boolean> {
  const userQuery = query(
    collection(Firestore, 'creators'),
    where('userName', '==', userName)
  );
  const userSnapshot = await getDocs(userQuery);
  return userSnapshot.docs.length !== 0;
}

export async function getCreatorByUserName(
  userName: string
): Promise<ICreator> {
  const creatorInfos = await getCreatorInfosByUserName(userName);

  return {
    uid: creatorInfos.id,
    userName: creatorInfos.data().userName,
    displayName: creatorInfos.data().displayName,
    profileImage: creatorInfos.data().profileImage,
    coverImage: creatorInfos.data().coverImage,
    bio: creatorInfos.data().bio,
    tierImage: creatorInfos.data().tierImage,
    tierPrice: creatorInfos.data().tierPrice,
    tierTitle: creatorInfos.data().tierTitle,
    tierDescription: creatorInfos.data().tierDescription,
  };
}

export async function getCreator(cId: string): Promise<ICreator | undefined> {
  const creatorRef = doc(Firestore, 'creators', cId);
  const creatorInfos = await getDoc(creatorRef);
  if (creatorInfos.exists()) {
    return {
      uid: creatorInfos.id,
      userName: creatorInfos.data().userName,
      displayName: creatorInfos.data().displayName,
      profileImage: creatorInfos.data().profileImage,
      coverImage: creatorInfos.data().coverImage,
      bio: creatorInfos.data().bio,
      tierImage: creatorInfos.data().tierImage,
      tierPrice: creatorInfos.data().tierPrice,
      tierTitle: creatorInfos.data().tierTitle,
      tierDescription: creatorInfos.data().tierDescription,
    };
  }
  return undefined;
}
