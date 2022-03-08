import { atom } from 'recoil';
import { Iuser, ICreator } from 'types/types';

const defaultCreatorInfos: ICreator = {
  uId: undefined,
  userName: undefined,
  displayName: undefined,
  profileImage: undefined,
  coverImage: undefined,
  bio: undefined,
  shortBio: undefined,
  tierImage: undefined,
  tierPrice: undefined,
  tierTitle: undefined,
  tierDescription: undefined,
};
export const creatorInfosAtom = atom<ICreator>({
  key: 'creatorInfos',
  default: defaultCreatorInfos,
});

export const creatorMembersAtom = atom<Array<Iuser>>({
  key: 'creatorMembers',
  default: [],
});
