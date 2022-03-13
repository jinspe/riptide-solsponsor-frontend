import React from 'react';

import ArticleEditor from 'services/Utils/CKeditor/Editor/ArticleEditor';
import PostMakerContainer from 'components/Posts/PostMaker/PostMakerContainer';

import {
  IpostPreview,
  TpostType,
  IattachmentLocal,
  Iattachment,
} from 'types/types';

type TpostMaker = {
  postType: TpostType;
  postPreview: IpostPreview;
  setPostPreview: React.Dispatch<React.SetStateAction<IpostPreview>>;
  attachments: Iattachment[];
  setAttachments: React.Dispatch<React.SetStateAction<Iattachment[]>>;
  attachmentsLocal: IattachmentLocal[];
  setAttachmentsLocal: React.Dispatch<React.SetStateAction<IattachmentLocal[]>>;
  postContent: string;
  setPostContent: React.Dispatch<React.SetStateAction<string>>;
};

const MAXLENGHTARTICLE = 500000;

export default function PostMaker({
  postType,
  postPreview,
  setPostPreview,
  attachments,
  setAttachments,
  attachmentsLocal,
  setAttachmentsLocal,
  postContent,
  setPostContent,
}: TpostMaker): JSX.Element {
  return (
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
  );
}
