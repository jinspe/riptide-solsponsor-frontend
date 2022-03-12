import React from 'react';
import PostReaderContainer from 'components/Posts/PostReader/PostReaderContainer';
import ArticleReader from 'components/Posts/PostReader/PostContentReader/ArticleReader';
import AttachmentReader from 'components/Posts/PostReader/PostContentReader/AttachmentReader';
import { Icreator, IpostPreview, IpostContent } from 'types/types';

type TfullPostPage = {
  creatorInfos: Icreator;
  postPreview: IpostPreview;
  postContent: IpostContent;
};

export default function FullPostPage({
  creatorInfos,
  postPreview,
  postContent,
}: TfullPostPage): JSX.Element {
  return (
    <PostReaderContainer creatorInfos={creatorInfos} postPreview={postPreview}>
      <div className="space-y-4">
        {postContent.content.length > 0 && (
          <div>
            {postPreview.type === 'article' && (
              <ArticleReader postContent={postContent} />
            )}
          </div>
        )}
        {postContent.attachments.length > 0 && (
          <AttachmentReader attachments={postContent.attachments} />
        )}
      </div>
    </PostReaderContainer>
  );
}
