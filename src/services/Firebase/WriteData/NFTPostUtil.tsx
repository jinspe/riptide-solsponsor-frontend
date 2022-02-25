import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { FirebaseStorage } from '../FirebaseConfig';

export interface Iattribute {
  trait_type: string;
  value: string;
}

export async function UploadMetadataToFirebase(
  filePath: string,
  file: Blob
): Promise<[string, string]> {
  const newImageRef = ref(FirebaseStorage, filePath);
  const fileSnapshot = await uploadBytesResumable(newImageRef, file);
  const fileUrl = await getDownloadURL(newImageRef);
  return [fileUrl, fileSnapshot.metadata.fullPath];
}

export async function UploadMetadata(
  name: string,
  description: string,
  attributes: Array<Iattribute>,
  file: string
): Promise<string> {
  const newMetadata = {
    name,
    description,
    attributes,
    files: [{ uri: file, type: 'image/png' }],
  };
  const jsonFile = JSON.stringify(newMetadata);
  console.log(jsonFile, null, 1);
  const Blobfile = new Blob([jsonFile], { type: ' application/json' });
  const upResp = await UploadMetadataToFirebase(
    'nft/new/fileJson.json',
    Blobfile
  );
  console.log(upResp);
  return 'hello';
}
