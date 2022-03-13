import React from 'react';

import { Icreator, IFullPost } from 'types/types';
import NotAccessCard from './PostFullContent/NotAccessCard';
import ArticleReader from './PostFullContent/ArticleReader';

import PostReaderContainer from './PostReaderContainer';

type TpostFullreader = {
  creatorInfos: Icreator;
  post: IFullPost;
};

export default function PostFullreader({
  creatorInfos,
  post,
}: TpostFullreader): JSX.Element {
  return (
    <div className="pageFrame">
      <PostReaderContainer creatorInfos={creatorInfos} post={post}>
        <div>
          {post.content === undefined && (
            <NotAccessCard creatorInfos={creatorInfos} />
          )}
          {post.content !== undefined && post.content.content.length > 0 && (
            <div>
              {post.preview.type === 'article' && (
                <ArticleReader postContent={post.content} />
              )}
            </div>
          )}
        </div>
      </PostReaderContainer>
    </div>
  );
}
