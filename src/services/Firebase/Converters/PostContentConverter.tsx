import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';
import { IpostContent } from 'types/types';

export const PostContentConverter = {
  toFirestore(postContent: IpostContent): DocumentData {
    return {
      content: postContent.content,
      attachments: postContent.attachments,
    };
  },
  fromFirestore(snapshot: QueryDocumentSnapshot): IpostContent {
    const data = snapshot.data();
    return {
      id: snapshot.id,
      content: data.content,
      attachments: data.attachments,
    } as IpostContent;
  },
};
