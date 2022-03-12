import { PublicKey } from '@solana/web3.js';

export interface Iuser {
  uId: string;
  displayName: string;
  profileImage: string;
}

export type TtransactionSate =
  | 'connect'
  | 'checkout'
  | 'checking'
  | 'file'
  | 'mint'
  | 'minting'
  | 'finish';

export interface Imembership {
  cId: string;
  expiration: string;
}

export interface ImessageToSign {
  uid: string;
  message: string;
  publicKey: PublicKey;
  signMessage: ((message: Uint8Array) => Promise<Uint8Array>) | undefined;
}

export interface Icreator {
  uId: string | undefined;
  userName: string | undefined;
  displayName: string | undefined;
  profileImage: string | undefined;
  coverImage: string | undefined;
  tags: string[] | undefined;
  bio: string | undefined;
  tierImage: string | undefined;
  tierPrice: number | undefined;
  tierTitle: string | undefined;
  tierDescription: string | undefined;
}

export interface ImembershipInfo {
  creatorInfos: Icreator;
  membership: Imembership;
}

export const postTypeList = ['article', 'images', 'link'];
export type TpostType = typeof postTypeList[number]; // 'article' | 'images' | 'link';
export type TpostSate = 'draft' | 'published';

export interface Iattachment {
  filePath: string;
  fileUrl: string;
  fileType: string;
  name: string;
}

export interface IattachmentLocal {
  file: File | Blob;
  fileUrl: string;
  fileType: string;
  name: string;
}

export interface IpostPreview {
  id: string;
  title: string;
  type: TpostType;
  cId: string;
  teaser: string;
  timeCreation: number;
  attachmentCount: number;
  state: TpostSate;
}

export interface IpostContent {
  id: string;
  content: string;
  attachments: Iattachment[];
}

export interface IFullPost {
  preview: IpostPreview;
  content: IpostContent | undefined;
}
