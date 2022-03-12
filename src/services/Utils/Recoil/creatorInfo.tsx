import { atom } from 'recoil';
import { Iuser, Icreator } from 'types/types';

const defaultCreatorInfos: Icreator = {
  uId: undefined,
  userName: undefined,
  displayName: undefined,
  profileImage: undefined,
  coverImage: undefined,
  bio: undefined,
  tags: undefined,
  tierImage: undefined,
  tierPrice: undefined,
  tierTitle: undefined,
  tierDescription: undefined,
};
export const creatorInfosAtom = atom<Icreator>({
  key: 'creatorInfos',
  default: defaultCreatorInfos,
});

export const creatorMembersAtom = atom<Array<Iuser>>({
  key: 'creatorMembers',
  default: [],
});
