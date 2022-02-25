import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import EditNFTPostPage from './EditNFTPostPage';

export default function EditPostPage(): JSX.Element {
  const { postType } = useParams<'postType'>();
  const { postId } = useParams<'postId'>();

  /* function SwitchPage(): JSX.Element {
    switch (postType) {
      case 'nft':
        return <p>popo</p>;
      default:
        return <p>caca</p>;
    }
  } */
  switch (postType) {
    case 'nft':
      return <EditNFTPostPage postId={postId} />;
    default:
      return <p>ehifhiwhefiuhfuw</p>;
  }

  // return <SwitchPage />;
}
