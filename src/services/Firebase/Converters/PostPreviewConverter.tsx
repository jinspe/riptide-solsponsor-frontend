import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';
import { IpostPreview } from 'types/types';

export const PostPreviewConverter = {
  toFirestore(postPreview: IpostPreview): DocumentData {
    return {
      title: postPreview.title,
      type: postPreview.type,
      cId: postPreview.cId,
      teaser: postPreview.teaser,
      timeCreation: postPreview.timeCreation,
      attachmentCount: postPreview.attachmentCount,
      state: postPreview.state,
    };
  },
  fromFirestore(snapshot: QueryDocumentSnapshot): IpostPreview {
    const data = snapshot.data();
    return {
      id: snapshot.id,
      title: data.title,
      type: data.type,
      cId: data.cId,
      teaser: data.teaser,
      timeCreation: data.timeCreation,
      attachmentCount: data.attachmentCount,
      state: data.state,
    } as IpostPreview;
  },
};
