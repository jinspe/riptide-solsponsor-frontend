import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';

import { userPublicKeyAtom } from 'services/Utils/Recoil/userInfo';
import PostMaker from 'components/Posts/PostMaker/PostMaker';

import {
  IpostPreview,
  TpostType,
  IattachmentLocal,
  Iattachment,
} from 'types/types';

type InewDraftPage = {
  postType: TpostType;
};

export default function NewDraftPage({ postType }: InewDraftPage): JSX.Element {
  const userPublickey = useRecoilValue(userPublicKeyAtom);

  const [postPreview, setPostPreview] = useState<IpostPreview>({
    id: '',
    title: '',
    type: postType,
    cId: userPublickey ?? '',
    teaser: '',
    timeCreation: 0,
    attachmentCount: 0,
    state: 'draft',
  });

  const [postContent, setPostContent] = useState<string>('');
  const [attachments, setAttachments] = useState<Iattachment[]>([]);
  const [attachmentsLocal, setAttachmentsLocal] = useState<IattachmentLocal[]>(
    []
  );

  return (
    <PostMaker
      postType={postType}
      postPreview={postPreview}
      setPostPreview={setPostPreview}
      attachments={attachments}
      setAttachments={setAttachments}
      attachmentsLocal={attachmentsLocal}
      setAttachmentsLocal={setAttachmentsLocal}
      postContent={postContent}
      setPostContent={setPostContent}
    />
  );
}
