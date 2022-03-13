import React from 'react';
import { Link } from 'react-router-dom';
import { Icreator } from 'types/types';

type TpostPreviewPage = {
  creatorInfos: Icreator;
};

export default function NotAccessCard({
  creatorInfos,
}: TpostPreviewPage): JSX.Element {
  return (
    <div
      className="p-3 my-2 border text-center 
        border-neutral-200
        dark:border-neutral-700
      rounded-lg text-base space-y-1">
      <p className="text-primary font-semibold">
        Only sponsors have access to this post
      </p>
      <div className="mx-auto text-accent text-center overflow-hidden truncate">
        <div className="text-sm font-medium mx-auto truncate">
          Get a membership to {creatorInfos.displayName} !
        </div>
      </div>
    </div>
  );
}
