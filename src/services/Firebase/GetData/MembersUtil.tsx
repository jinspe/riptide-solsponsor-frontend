import {
  query,
  collection,
  getDocs,
  getDoc,
  doc,
  orderBy,
} from 'firebase/firestore';
import { Iuser } from 'types/types';

import { Firestore, FirebaseAuth } from '../FirebaseConfig';

export async function getUser(uId: string): Promise<Iuser | undefined> {
  const userRef = doc(Firestore, 'users', uId);
  const userDoc = await getDoc(userRef);
  if (userDoc.exists()) {
    return {
      uId,
      profileImage: userDoc.data().profileImage,
      displayName: userDoc.data().displayName,
    };
  }
  return undefined;
}

export async function getMembers(): Promise<Iuser[]> {
  if (FirebaseAuth.currentUser != null) {
    const membersList: Iuser[] = [];

    const membershipsRef = collection(Firestore, 'memberships');
    const memQuery = query(
      membershipsRef,
      orderBy(FirebaseAuth.currentUser.uid)
    );
    const membersDocs = await getDocs(memQuery);
    const membersListThread: Promise<Iuser | undefined>[] = [];

    membersDocs.forEach((user) => {
      membersListThread.push(getUser(user.id));
    });

    const membersData = await Promise.all(membersListThread);

    membersData.forEach((user) => {
      if (user !== undefined) {
        membersList.push({
          uId: user.uId,
          profileImage: user.profileImage,
          displayName: user.displayName,
        });
      }
    });

    return membersList;
  }
  throw new Error('User can not be null to read its members');
}
