import React, { ReactChildren, ReactChild } from 'react';
import { Link } from 'react-router-dom';
import { fullDate } from 'services/Utils/Functions/DateToString';
import { Icreator, IpostPreview } from 'types/types';

type TpostReaderContainer = {
  children: ReactChildren | ReactChild;
  creatorInfos: Icreator;
  postPreview: IpostPreview;
};

export default function PostReaderContainer({
  children,
  creatorInfos,
  postPreview,
}: TpostReaderContainer): JSX.Element {
  return (
    <div
      className="surface-l1
  rounded-lg shadow mx-auto p-3">
      <div
        className="text-xl mt-1 font-bold text-center
    text-black
    dark:text-neutral-100">
        {postPreview.title}
      </div>
      <div
        className="text-xs px-2 mt-3 
        max-w-2xl mx-auto font-bold text-left
    text-secondary">
        {fullDate(postPreview.timeCreation)}
      </div>
      <div
        className="bg-neutral-100 dark:bg-neutral-800 max-w-2xl mx-auto 
        shadow-sm
       border border-neutral-300 dark:border-neutral-600 
      px-3 pb-2 pt-2 rounded-lg sm:px-5 sm:pb-2 mb-6">
        <div className=" ">
          {/* creator Profile */}
          <Link
            to={`/c/${creatorInfos.userName}`}
            className="flex gap-2 items-center max-w-max 
            text-neutral-800 dark:text-neutral-200 
            hover:text-cyan-700
            dark:hover:text-cyan-600
            hover:underline">
            <img
              className="h-10 w-10 rounded-full "
              src={creatorInfos.profileImage}
              alt=""
            />
            <div className="block overflow-hidden  ">
              <p
                className="
          text-lg font-bold truncate ">
                {creatorInfos.displayName}
              </p>
            </div>
          </Link>
          {/* Teaser */}
          <div
            className="text-base px-1 mt-2 text-left
        text-primary whitespace-pre leading-tight">
            {postPreview.teaser}
          </div>
          <div className="mt-4">{children}</div>
          {/* Attachment count */}
          {postPreview.attachmentCount > 0 && (
            <div className="mt-2">
              <div className="text-secondary px-1 text-sm flex">
                {postPreview.attachmentCount} attachment
                {postPreview.attachmentCount > 1 && <p>s</p>}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
