import { httpsCallable } from 'firebase/functions';
import { FirebaseFunctions, FirebaseAuth } from '../FirebaseConfig';

export async function CreateUserNameCloud(userName: string): Promise<void> {
  const createUserName = httpsCallable(
    FirebaseFunctions,
    'createUserName-createUserName'
  );

  if (FirebaseAuth.currentUser != null) {
    await createUserName(userName);
  } else {
    throw new Error('User can not be null to create an username');
  }
}

export async function UpdateUserName(userName: string): Promise<void> {
  const editUserName = httpsCallable(
    FirebaseFunctions,
    'updateUserName-updateUserName'
  );

  if (FirebaseAuth.currentUser != null) {
    await editUserName(userName);
  } else {
    throw new Error('User can not be null to update username');
  }
}
