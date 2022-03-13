import React, { useState, useEffect } from 'react';
import Spinner from 'components/Common/Util/Spinner';

import PostFeedReader from 'components/Posts/PostReader/PostFeedReader/PostFeedReader';
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
    setPostLoading(true);
    if (creatorInfos.uId !== undefined) {
      const [postListFetch] = await queryFullPostByCreator(
        creatorInfos.uId,
        undefined,
        numberPost
      );
      setPostList(postListFetch);
    }
    setPostLoading(false);
  }

  useEffect(() => {
    getLatestPost();
  }, []);

  return (
    <div>
      <div
        className=" max-w-2xl mx-auto
         border-t border-neutral-500">
        <p
          className=" text-primary text-center
        text-lg font-semibold truncate mt-1">
          From {creatorInfos.displayName}
        </p>
      </div>
      {postLoading && (
        <div className="mx-auto flex justify-center my-10">
          <Spinner classExtend="h-12 spinner-color " />
        </div>
      )}
      {!postLoading && (
        <div className="my-5 px-1 space-y-5">
          {postList.map((post) => (
            <PostFeedReader
              key={post.preview.id}
              creatorInfos={creatorInfos}
              post={post}
            />
          ))}
        </div>
      )}
    </div>
  );
}
