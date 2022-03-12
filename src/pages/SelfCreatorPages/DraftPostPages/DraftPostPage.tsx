import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { postTypeList } from 'types/types';

import EditPostPage from '../EditPostPages/EditPostPage';

import AllDraftPage from './AllDraftPage';
import NewDraftPage from './NewDraftPage';

export default function DraftPostPage(): JSX.Element {
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
      {postType === undefined && <AllDraftPage />}
      {postType !== undefined && postId === undefined && (
        <NewDraftPage postType={postType} />
      )}
      {postId !== undefined && postType !== undefined && (
        <EditPostPage postType={postType} postId={postId} />
      )}
    </div>
  );
}
