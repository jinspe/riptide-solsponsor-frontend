import { getDoc, doc } from 'firebase/firestore';

import { Firestore, FirebaseAuth } from '../FirebaseConfig';

export async function getMembershipsTransaction(
  creator: string
): Promise<Array<string>> {
  if (FirebaseAuth.currentUser != null) {
    const transactionList: string[] = [];
    const membershipRef = doc(
      Firestore,
      'memberships',
      FirebaseAuth.currentUser.uid
    );

    const membershipDoc = await getDoc(membershipRef);
    if (membershipDoc.exists()) {
      const creatorTransaction = membershipDoc.data()[creator];
      if (creatorTransaction !== undefined) {
        creatorTransaction.forEach((element: any) => {
          transactionList.push(String(element));
        });
      }
    }

    return transactionList;
  }
  throw new Error('User can not be null to read its memberships');
}

type TmembershipFiles = {
  image: string;
  metadata: string;
};

export async function getMembershipFiles(
  creator: string
): Promise<TmembershipFiles> {
  if (FirebaseAuth.currentUser != null) {
    const memberFile: TmembershipFiles = { image: '', metadata: '' };
    const memberFileRef = doc(
      Firestore,
      'memberFiles',
      FirebaseAuth.currentUser.uid
    );

    const memberFileDoc = await getDoc(memberFileRef);
    if (memberFileDoc.exists()) {
      const memberFileFire = memberFileDoc.data()[creator];
      if (memberFileFire !== undefined) {
        memberFile.image = memberFileFire.image;
        memberFile.metadata = memberFileFire.metadata;
      }
    }

    return memberFile;
  }
  throw new Error('User can not be null to read its memberships files');
}
