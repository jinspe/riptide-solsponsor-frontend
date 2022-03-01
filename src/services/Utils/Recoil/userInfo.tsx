import { atom } from 'recoil';

export const userPublicKeyAtom = atom<string | undefined>({
  key: 'userPublicKey',
  default: undefined,
});

export const userDisplayNameAtom = atom<string | undefined>({
  key: 'userDisplayName',
  default: undefined,
});

export const userProfileImageAtom = atom<string | undefined>({
  key: 'userProfileImage',
  default: undefined,
});

export const userIsCreatorAtom = atom<boolean>({
  key: 'userPersonalLink',
  default: false,
});
