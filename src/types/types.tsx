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

export interface ICreator {
  uId: string | undefined;
  userName: string | undefined;
  displayName: string | undefined;
  profileImage: string | undefined;
  coverImage: string | undefined;
  shortBio: string | undefined;
  bio: string | undefined;
  tierImage: string | undefined;
  tierPrice: number | undefined;
  tierTitle: string | undefined;
  tierDescription: string | undefined;
}

export interface ImembershipInfo {
  creatorInfos: ICreator;
  membership: Imembership;
}
