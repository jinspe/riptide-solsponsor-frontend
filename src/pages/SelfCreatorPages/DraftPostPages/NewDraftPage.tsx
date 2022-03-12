import React, { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { userPublicKeyAtom } from 'services/Utils/Recoil/userInfo';
import ArticleEditor from 'services/Utils/CKeditor/Editor/ArticleEditor';
import PostMakerContainer from 'components/Posts/PostMaker/PostMakerContainer';

import {
  IpostPreview,
  TpostType,
  postTypeList,
  IattachmentLocal,
  Iattachment,
} from 'types/types';

type InewDraftPage = {
  postType: TpostType;
};

const MAXLENGHTARTICLE = 500000;

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
    <div>
      <PostMakerContainer
        postPreview={postPreview}
        setPostPreview={setPostPreview}
        attachments={attachments}
        setAttachments={setAttachments}
        attachmentsLocal={attachmentsLocal}
        setAttachmentsLocal={setAttachmentsLocal}
        postContent={postContent}>
        <div>
          {postType === 'article' && (
            <ArticleEditor
              text={postContent}
              setText={setPostContent}
              maxLength={MAXLENGHTARTICLE}
            />
          )}
        </div>
      </PostMakerContainer>
    </div>
  );
}
