import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Spinner from 'components/Common/Util/Spinner';

import PostCardContainer from 'components/Posts/PostFeed/PostCardContainer';
import { queryFullPostByCreator } from 'services/Firebase/GetData/PostUtils';
import { Icreator, IFullPost } from 'types/types';

type TcreatorLatestPosts = {
  creatorInfos: Icreator;
  numberPost: number;
};

export default function CreatorLatestPosts({
  creatorInfos,
  numberPost,
}: TcreatorLatestPosts): JSX.Element {
  const [postList, setPostList] = useState<IFullPost[]>([]);

  const [postLoading, setPostLoading] = useState(true);

  async function getLatestPost() {
    if (creatorInfos.uId !== undefined) {
      const [postListFetch] = await queryFullPostByCreator(
        creatorInfos.uId,
        undefined,
        numberPost
      );
      setPostList(postListFetch);
    }
  }

  useEffect(() => {
    getLatestPost();
  }, []);

  return (
    <div>
      <div className=" ">
        <div
          className=" max-w-2xl mx-auto
         border-t border-neutral-400 dark:border-neutral-600">
          <div
            className="flex gap-1  items-center 
          text-primary  justify-center text-center">
            <div className=" overflow-hidden flex items-center gap-1 justify-center  ">
              <p
                className="
        text-lg font-semibold truncate ">
                {creatorInfos.displayName}
              </p>
              <p
                className="
        text-lg font-semibold truncate ">
                latest posts
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="my-5 space-y-5">
        {postList.map((post) => (
          <PostCardContainer
            creatorInfos={creatorInfos}
            postPreview={post.preview}>
            <div />
          </PostCardContainer>
        ))}
      </div>
    </div>
  );
}
