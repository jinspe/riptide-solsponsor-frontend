/**
 * @param maxSize - maximum file size in Mib
 */
export function IsFileBelowMaxSize(file: File, maxSize: number): void {
  if (file.size > maxSize * 1024 * 1024) {
    throw new Error(
      `This is a demo, input file needs to be smaller than ${maxSize} Mb!`
    );
  }
}

export default function IsImageBelowMaxSize(file: File, maxSize: number): void {
  if (file.type.toString().indexOf('image/') !== 0) {
    throw new Error('Input file is not an image');
  }
  IsFileBelowMaxSize(file, maxSize);
}

export function usernameIsValid(username: string): boolean {
  return /^[0-9a-zA-Z_.-]+$/.test(username);
}
