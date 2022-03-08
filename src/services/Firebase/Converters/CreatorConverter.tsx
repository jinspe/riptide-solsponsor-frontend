import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';
import { ICreator } from 'types/types';

export const creatorConverter = {
  toFirestore(creatorInfos: ICreator): DocumentData {
    return {
      uId: creatorInfos.uId,
      userName: creatorInfos.userName,
      displayName: creatorInfos.displayName,
      profileImage: creatorInfos.profileImage,
      coverImage: creatorInfos.coverImage,
      bio: creatorInfos.bio,
      shortBio: creatorInfos.shortBio,
      tierImage: creatorInfos.tierImage,
      tierPrice: creatorInfos.tierPrice,
      tierTitle: creatorInfos.tierTitle,
      tierDescription: creatorInfos.tierDescription,
    };
  },
  fromFirestore(snapshot: QueryDocumentSnapshot): ICreator {
    const data = snapshot.data();
    return {
      uId: snapshot.id,
      userName: data.userName,
      displayName: data.displayName,
      profileImage: data.profileImage,
      coverImage: data.coverImage,
      bio: data.bio,
      shortBio: data.shortBio,
      tierImage: data.tierImage,
      tierPrice: data.tierPrice,
      tierTitle: data.tierTitle,
      tierDescription: data.tierDescription,
    } as ICreator;
  },
};
