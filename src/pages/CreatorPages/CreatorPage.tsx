import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getCreatorByUserName } from 'services/Firebase/GetData/CreatorUtils';

import Spinner from 'components/Common/Util/Spinner';

import NotFoundPage from 'pages/CommonPages/NotFoundPage';

import { Icreator } from 'types/types';

import CreatorTabsPage from './CreatorTabsPage';
import PostPage from '../PostPages/PostPage';

export default function CreatorPage(): JSX.Element {
  const { creator } = useParams<'creator'>();
  const { postId } = useParams<'postId'>();

  const [creatorInfos, setCreatorInfos] = useState<Icreator | undefined>();
  const [pageLoading, setPageLoading] = useState(true);

  async function loadCreator() {
    setPageLoading(true);
    if (creator !== undefined) {
      try {
        setCreatorInfos(await getCreatorByUserName(creator));
      } catch (error: any) {
        toast.error('Creator not found.');
      }
    } else {
      toast.error('Creator not found.');
    }
    setPageLoading(false);
  }
  useEffect(() => {
    loadCreator();
  }, [creator]);

  return (
    <div>
      {/* Not Found Page */}
      {!pageLoading && postId === undefined && creatorInfos === undefined && (
        <NotFoundPage />
      )}

      {/* Normal Pages */}
      <div className="pageFrame">
        {/* Loading Page */}
        {pageLoading && (
          <div className="overflow-hidden mt-10">
            <div className="h-full flex">
              <Spinner classExtend=" h-20 w-20 mt-10 spinner-color m-auto" />
            </div>
          </div>
        )}

        {/* Creator Tabs */}
        {!pageLoading && postId === undefined && creatorInfos !== undefined && (
          <CreatorTabsPage creatorInfos={creatorInfos} />
        )}

        {/* Post Pages */}
        {!pageLoading && postId !== undefined && creatorInfos !== undefined && (
          <PostPage postId={postId} creatorInfos={creatorInfos} />
        )}
      </div>
    </div>
  );
}
