import React, { ReactChildren, ReactChild } from 'react';
import { Link } from 'react-router-dom';
import { PencilIcon } from '@heroicons/react/outline';
import { Icreator, IpostPreview } from 'types/types';

import SelfPostCardContainer from './SelfPostCardContainer';

type TpostReaderContainer = {
  children: ReactChildren | ReactChild;
  creatorInfos: Icreator;
  postPreview: IpostPreview;
};

export default function SelfPostDraftCard({
  children,
  creatorInfos,
  postPreview,
}: TpostReaderContainer): JSX.Element {
  return (
    <div className="max-w-2xl mx-auto">
      <SelfPostCardContainer
        creatorInfos={creatorInfos}
        postPreview={postPreview}>
        <div>{children}</div>
      </SelfPostCardContainer>
      <div
        className="
      px-4 py-0 rounded-lg sm:px-6
      bg-neutral-100 dark:bg-neutral-800
       rounded-t-none
        border-t-0
        -mt-2
    border border-neutral-300 dark:border-neutral-600
      ">
        <div className="pt-3">
          <div
            className="flex justify-end items-center
        border-t border-neutral-300 dark:border-neutral-600
        ">
            <Link
              to={`/drafts/${postPreview.type}/${postPreview.id}`}
              className="
          p-1 text-cyan-600
            dark:text-cyan-600
            hover:text-cyan-500
            dark:hover:text-cyan-400
          font-bold underline flex 
          gap-1 items-center text-lg">
              <p>Edit</p>
              <PencilIcon className="h-5 mt-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
