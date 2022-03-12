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
    <div>
      <div
        className="p-3 mt-2 border text-center 
        border-neutral-200
        dark:border-neutral-700
      rounded-lg text-base space-y-2 text-primary">
        <p>Only sponsors have access to this post</p>
        <div className="mx-auto text-center">
          <Link
            to={`/c/${creatorInfos.userName}`}
            className="text-sm font-medium 
                text-cyan-600 hover:text-cyan-500 text-center mx-auto">
            Get a membership to {creatorInfos.displayName}{' '}
            <span aria-hidden="true"> &rarr;</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
