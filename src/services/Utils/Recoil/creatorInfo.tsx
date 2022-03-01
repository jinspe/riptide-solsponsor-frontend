import { atom } from 'recoil';

export const creatorBioAtom = atom<string | undefined>({
  key: 'creatorBio',
  default: undefined,
});

export const creatorDisplayNameAtom = atom<string | undefined>({
  key: 'creatorDisplayName',
  default: undefined,
});

export const creatorProfileImageAtom = atom<string | undefined>({
  key: 'creatorProfileImage',
  default: undefined,
});

export const creatorCoverImageAtom = atom<string | undefined>({
  key: 'reatorCoverImage',
  default: undefined,
});
