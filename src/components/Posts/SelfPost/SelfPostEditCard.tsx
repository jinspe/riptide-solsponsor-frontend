import React from 'react';
import { Link } from 'react-router-dom';
import { PencilIcon } from '@heroicons/react/outline';
import { Icreator, IFullPost, TpostSate } from 'types/types';

import PostFeedReader from '../PostReader/PostFeedReader/PostFeedReader';

type TselfPostEditCard = {
  creatorInfos: Icreator;
  post: IFullPost;
  state: TpostSate;
};

export default function SelfPostEditCard({
  creatorInfos,
  post,
  state,
}: TselfPostEditCard): JSX.Element {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="pointer-events-none">
        <PostFeedReader creatorInfos={creatorInfos} post={post} />
      </div>
      <div
        className="
      px-4 py-0 rounded-lg sm:px-6
      surface-l2
       rounded-t-none
        border-t-0
        -mt-2
    border border-neutral-300 dark:border-neutral-600
      ">
        <div className="pt-3">
          <div className="border-t border-neutral-300 dark:border-neutral-600" />
          {state === 'draft' && (
            <div className="flex justify-end items-center py-2">
              <Link
                to={`/drafts/${post.preview.type}/${post.preview.id}`}
                className=" p-1 text-link font-bold underline flex 
          gap-1 items-center text-base">
                <p>Edit</p>
                <PencilIcon className="h-4 mt-0.5" />
              </Link>
            </div>
          )}
          {state === 'published' && (
            <div className="flex justify-between items-center py-2">
              <Link
                to={`/c/${creatorInfos.userName}/${post.preview.id}`}
                className="text-base p-1 font-bold text-link">
                View post
                <span aria-hidden="true"> &rarr;</span>
              </Link>
              <Link
                to={`/drafts/${post.preview.type}/${post.preview.id}`}
                className="p-1 text-link font-bold flex gap-1 items-center text-base">
                <p>Edit</p>
                <PencilIcon className="h-4 mt-0.5" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
