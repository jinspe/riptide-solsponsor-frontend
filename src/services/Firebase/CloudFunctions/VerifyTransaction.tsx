import { httpsCallable } from 'firebase/functions';
import { FirebaseFunctions, FirebaseAuth } from '../FirebaseConfig';

export async function VerifyTransaction(signature: string): Promise<any> {
  const verifyTransactionCloud = httpsCallable(
    FirebaseFunctions,
    'verifyTransaction-verifyTransaction'
  );
  const data = { signature };

  if (FirebaseAuth.currentUser != null) {
    const result = await verifyTransactionCloud(data);
    return result;
  }
  throw new Error('User can not be null to update its membership');
}
