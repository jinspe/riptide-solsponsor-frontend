import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { postTypeList } from 'types/types';

import SelfPostQueryList from 'components/Posts/SelfPost/SelfPostQueryList';

import EditPostPage from '../EditPostPages/EditPostPage';

import NewDraftPage from '../EditPostPages/NewDraftPage';

export default function DraftPostsPage(): JSX.Element {
  const { postType } = useParams<'postType'>();
  const { postId } = useParams<'postId'>();
  const navigate = useNavigate();

  useEffect(() => {
    if (postType === undefined || !postTypeList.includes(postType)) {
      navigate('/drafts');
    }
  }, [postType, postId]);

  return (
    <div className="pageFrame">
      {postType === undefined && <SelfPostQueryList state="draft" />}
      {postType !== undefined && postId === undefined && (
        <NewDraftPage postType={postType} />
      )}
      {postId !== undefined && postType !== undefined && (
        <EditPostPage postType={postType} postId={postId} />
      )}
    </div>
  );
}
