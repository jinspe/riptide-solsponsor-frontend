import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getCreatorByUserName } from 'services/Firebase/GetData/CreatorUtils';

import Spinner from 'components/Common/Util/Spinner';

import ClassNamesLogic from 'components/Common/Util/ClassNamesLogic';

import NotFoundPage from 'pages/CommonPages/NotFoundPage';

import { ICreator } from 'types/types';

import CreatorTabsPage from './CreatorTabsPage';
import PostPage from './PostPages/PostPage';

export default function CreatorPage(): JSX.Element {
  const { creator } = useParams<'creator'>();
  const { postId } = useParams<'postId'>();

  const [creatorInfos, setCreatorInfos] = useState<ICreator | undefined>();
  const [creatorNotFound, setCreatorNotFound] = useState(true);
  const [pageLoading, setPageLoading] = useState(true);
  const [postPageView, setPostPageView] = useState(false);

  async function loadCreator() {
    setPageLoading(true);
    setCreatorNotFound(true);
    if (creator !== undefined) {
      try {
        setCreatorInfos(await getCreatorByUserName(creator));
        setCreatorNotFound(false);
      } catch {
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

  useEffect(() => {
    if (postId === undefined) {
      setPostPageView(false);
    } else {
      setPostPageView(true);
    }
  }, [postId]);

  return (
    <div>
      {/* Not Found Page */}
      <div
        className={ClassNamesLogic(
          creatorNotFound && !pageLoading ? 'block' : 'hidden',
          ' '
        )}>
        <NotFoundPage />
      </div>
      {/* Normal Pages */}
      <div className="pageFrame">
        {/* Loading Page */}
        <div
          className={ClassNamesLogic(
            pageLoading ? 'block overflow-hidden mt-10' : 'hidden',
            ' '
          )}>
          <div className="h-full flex">
            <Spinner classExtend=" h-20 w-20 mt-10 text-cyan-700 m-auto" />
          </div>
        </div>
        {/* Creator Tabs */}
        <div
          className={ClassNamesLogic(
            pageLoading || postPageView || creatorNotFound ? 'hidden' : '',
            ' '
          )}>
          <CreatorTabsPage creatorInfos={creatorInfos} />
        </div>
        {/* Post Pages */}
        <div
          className={ClassNamesLogic(
            pageLoading || !postPageView || creatorNotFound ? 'hidden' : '',
            ' '
          )}>
          <PostPage />
        </div>
      </div>
    </div>
  );
}
