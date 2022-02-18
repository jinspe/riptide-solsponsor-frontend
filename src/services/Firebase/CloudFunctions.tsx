import { httpsCallable } from 'firebase/functions';
import { doc, updateDoc } from 'firebase/firestore';
import { FirebaseFunctions, Firestore } from './FirebaseConfig';

export async function testFunction(): Promise<void> {
  const testcall = httpsCallable(
    FirebaseFunctions,
    'testFunction-testFunction'
  );
  const result: any = await testcall({ uid: 'poopoo' });

  const userRef = doc(Firestore, 'users', 'poopoo');

  await updateDoc(userRef, {
    coverImage: 'booboo',
  });
}
