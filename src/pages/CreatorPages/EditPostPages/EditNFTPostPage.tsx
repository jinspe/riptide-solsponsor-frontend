import React, { useState } from 'react';

import NFTFileInput from 'components/Creators/EditPosts/EditNFTPosts/NFTFileInput';
import {
  UploadMetadata,
  Iattribute,
} from 'services/Firebase/WriteData/NFTPostUtil';

import NFTFrom from 'components/Creators/EditPosts/EditNFTPosts/NFTForm';

type IeditNFTPostPage = {
  postId: string | undefined;
};
export default function EditNFTPostPage({
  postId,
}: IeditNFTPostPage): JSX.Element {
  return (
    <div className="pageFrame">
      <p>{postId}</p>
      <NFTFrom />
    </div>
  );
}
