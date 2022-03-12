import React from 'react';
import PostReaderContainer from 'components/Posts/PostReader/PostReaderContainer';
import NotAccessCard from 'components/Posts/PostReader/PostContentPreview/NotAccessCard';
import { Icreator, IpostPreview } from 'types/types';

type TpostPreviewPage = {
  creatorInfos: Icreator;
  postPreview: IpostPreview;
};

export default function PostPreviewPage({
  creatorInfos,
  postPreview,
}: TpostPreviewPage): JSX.Element {
  return (
    <PostReaderContainer creatorInfos={creatorInfos} postPreview={postPreview}>
      <div>
        <NotAccessCard creatorInfos={creatorInfos} />
      </div>
    </PostReaderContainer>
  );
}
