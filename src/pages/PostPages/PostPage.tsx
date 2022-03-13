import React, { useEffect, useState } from 'react';
import { Icreator, IFullPost } from 'types/types';

import { getFullPost } from 'services/Firebase/GetData/PostUtils';
import PostFullreader from 'components/Posts/PostReader/PostFullReader/PostFullreader';
import Spinner from 'components/Common/Util/Spinner';
import NotFoundPostPage from './NotFoundPostPage';

type TpostPage = {
  postId: string;
  creatorInfos: Icreator;
};

export default function PostPage({
  postId,
  creatorInfos,
}: TpostPage): JSX.Element {
  const [fullPost, setFullPost] = useState<IFullPost | undefined>();

  const [pageLoading, setPageLoading] = useState(true);

  async function getPost() {
    setPageLoading(true);
    if (creatorInfos?.uId !== undefined && postId !== undefined) {
      setFullPost(await getFullPost(postId, creatorInfos.uId));
    }
    setPageLoading(false);
  }

  useEffect(() => {
    getPost();
  }, [postId]);

  return (
    <div>
      {pageLoading && (
        <div className="spinner-color flex justify-center my-10">
          <Spinner classExtend="h-16" />
        </div>
      )}
      {!pageLoading && fullPost === undefined && (
        <NotFoundPostPage creatorInfos={creatorInfos} />
      )}
      {!pageLoading && fullPost !== undefined && (
        <PostFullreader creatorInfos={creatorInfos} post={fullPost} />
      )}
    </div>
  );
}
