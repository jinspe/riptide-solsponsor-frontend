import {
  query,
  collection,
  where,
  getDocs,
  getDoc,
  DocumentData,
  doc,
  limit,
} from 'firebase/firestore';
import { Icreator } from 'types/types';
import { creatorConverter } from '../Converters/CreatorConverter';

import { Firestore } from '../FirebaseConfig';

export async function getCreatorInfosByUserName(
  userName: string
): Promise<DocumentData> {
  const userQuery = query(
    collection(Firestore, 'creators'),
    where('userName', '==', userName)
  ).withConverter(creatorConverter);
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
): Promise<Icreator> {
  const creatorInfos = await getCreatorInfosByUserName(userName);

  return creatorInfos.data();
}

export async function getCreator(cId: string): Promise<Icreator | undefined> {
  const creatorRef = doc(Firestore, 'creators', cId);
  const creatorInfos = await getDoc(creatorRef);
  if (creatorInfos.exists()) {
    return creatorConverter.fromFirestore(creatorInfos);
  }
  return undefined;
}

export async function queryCreators(search: string): Promise<Icreator[]> {
  const creatorsRef = collection(Firestore, 'creators');
  const searchLow = search.toLowerCase();
  const qDisplayName = query(
    creatorsRef,
    where('displayName', '>=', `${search}`),
    where('displayName', '<=', `${search}~`),
    limit(5)
  ).withConverter(creatorConverter);

  const qUserName = query(
    creatorsRef,
    where('userName', '>=', `${search}`),
    where('userName', '<=', `${search}~`),
    limit(5)
  ).withConverter(creatorConverter);

  const qTags = query(
    creatorsRef,
    where('tags', 'array-contains', searchLow),
    limit(10)
  ).withConverter(creatorConverter);

  const allQueries = [
    getDocs(qDisplayName),
    getDocs(qUserName),
    getDocs(qTags),
  ];

  const querySnapshot = await Promise.all(allQueries);
  const result: Icreator[] = [];

  const IdList: Array<string | undefined> = [];

  querySnapshot.forEach((creatorQuery) => {
    creatorQuery.forEach((creatorDoc) => {
      if (!IdList.includes(creatorDoc.id)) {
        IdList.push(creatorDoc.id);
        result.push(creatorDoc.data());
      }
    });
  });
  return result;
}
