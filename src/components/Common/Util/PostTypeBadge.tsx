import React from 'react';

import { TpostType } from 'types/types';

import 'style/Components/Posts/posttypecolors.css';

type TpostTypeBadge = {
  postType: TpostType;
};

export default function PostTypeBadge({
  postType,
}: TpostTypeBadge): JSX.Element {
  let colors = 'color-article';
  if (postType === 'images') {
    colors = 'color-images';
  }
  return (
    <div
      className={`text-sm px-2 font-bold text-left
      bg-opacity-80
      rounded-lg
  ${colors}`}>
      article
    </div>
  );
}
