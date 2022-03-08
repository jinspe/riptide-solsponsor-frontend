import { atom } from 'recoil';
import { Iuser } from 'types/types';

export const creatorUserNameAtom = atom<string | undefined>({
  key: 'creatorUserName',
  default: undefined,
});

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
  key: 'creatorCoverImage',
  default: undefined,
});

export const creatorTierImageAtom = atom<string | undefined>({
  key: 'creatorTierImage',
  default: undefined,
});

export const creatorTierPriceAtom = atom<number | undefined>({
  key: 'creatorTierPrice',
  default: undefined,
});

export const creatorTierTitleAtom = atom<string | undefined>({
  key: 'creatorTierTitle',
  default: undefined,
});

export const creatorTierDescriptionAtom = atom<string | undefined>({
  key: 'creatorTierDescription',
  default: undefined,
});

export const creatorMembersAtom = atom<Array<Iuser>>({
  key: 'creatorMembers',
  default: [],
});
