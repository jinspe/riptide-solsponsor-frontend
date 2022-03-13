import React, { ReactChildren, ReactChild } from 'react';
import { Link } from 'react-router-dom';
import { fullDate } from 'services/Utils/Functions/TimeFunctions';

import PostTypeBadge from 'components/Common/Util/PostTypeBadge';
import { Icreator, IpostPreview } from 'types/types';

type TpostFeedContainer = {
  children: ReactChildren | ReactChild;
  creatorInfos: Icreator;
  postPreview: IpostPreview;
};

export default function PostFeedContainer({
  children,
  creatorInfos,
  postPreview,
}: TpostFeedContainer): JSX.Element {
  return (
    <div
      className="bg-neutral-100 dark:bg-neutral-800 max-w-2xl mx-auto 
      shadow border border-neutral-300 dark:border-neutral-600 
     px-4 pt-2 pb-2 rounded-lg sm:px-6 
     hover:bg-neutral-300
     dark:hover:bg-neutral-700
     ">
      <div className=" mt-2 px-0 sm:px-2">
        {/* creator Profile */}
        <div className="flex justify-between ">
          <Link
            to={`/c/${creatorInfos.userName}`}
            className="flex gap-2 -ml-1 items-center max-w-max 
          text-primary 
          hover:text-cyan-500
          dark:hover:text-cyan-400
          hover:underline truncate">
            <img
              className="h-9 w-9 rounded-full "
              src={creatorInfos.profileImage}
              alt=""
            />
            <div className="overflow-hidden ">
              <p
                className="
        text-base font-semibold truncate ">
                {creatorInfos.displayName}
              </p>
            </div>
          </Link>
        </div>
        <Link to={`/c/${creatorInfos.userName}/${postPreview.id}`}>
          <div className="text-2xl mt-3 font-bold text-primary">
            {postPreview.title}
          </div>
          <div
            className="text-base mt-2 text-left
      text-primary whitespace-pre leading-tight">
            {postPreview.teaser}
          </div>
        </Link>

        <div className="mt-4">{children}</div>
        {/* Attachment count */}
        {postPreview.attachmentCount > 0 && (
          <div className="mt-2">
            <div className="text-secondary  text-sm flex">
              {postPreview.attachmentCount} attachment
              {postPreview.attachmentCount > 1 && <p>s</p>}
            </div>
          </div>
        )}
        <div className="flex justify-between items-center">
          <div
            className="text-xs  mt-1 
      max-w-3xl  font-bold text-left
  text-secondary">
            {fullDate(postPreview.timeCreation)}
          </div>
          <PostTypeBadge postType={postPreview.type} />
        </div>
      </div>
    </div>
  );
}
