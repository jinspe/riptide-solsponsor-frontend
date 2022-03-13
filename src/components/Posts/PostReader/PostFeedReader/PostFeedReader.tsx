import React from 'react';

import { Icreator, IFullPost } from 'types/types';
import NotAccessCard from './PostFeedContent/NotAccessFeedCard';

import PostFeedContainer from './PostFeedContainer';

type TpostFeedReader = {
  creatorInfos: Icreator;
  post: IFullPost;
};

export default function PostFeedReader({
  creatorInfos,
  post,
}: TpostFeedReader): JSX.Element {
  return (
    <PostFeedContainer creatorInfos={creatorInfos} postPreview={post.preview}>
      <div>
        {post.content === undefined && (
          <NotAccessCard creatorInfos={creatorInfos} />
        )}
      </div>
    </PostFeedContainer>
  );
}
