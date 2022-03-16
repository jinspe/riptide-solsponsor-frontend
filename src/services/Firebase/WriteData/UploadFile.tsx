import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { FirebaseAuth, FirebaseStorage } from '../FirebaseConfig';

export default async function UploadFile(
  filePath: string,
  file: File | Blob
): Promise<[string, string]> {
  if (FirebaseAuth.currentUser != null) {
    const newFileRef = ref(FirebaseStorage, filePath);
    const fileSnapshot = await uploadBytesResumable(newFileRef, file);
    const fileUrl = await getDownloadURL(newFileRef);
    return [fileUrl, fileSnapshot.metadata.fullPath];
  }
  throw new Error('User can not be null to upload a file');
}
