import React, { ReactChildren, ReactChild } from 'react';
import { Link } from 'react-router-dom';
import { fullDate } from 'services/Utils/Functions/TimeFunctions';
import { Icreator, IFullPost } from 'types/types';

import AttachmentReader from './PostFullContent/AttachmentReader';

type TpostReaderContainer = {
  children: ReactChildren | ReactChild;
  creatorInfos: Icreator;
  post: IFullPost;
};

export default function PostReaderContainer({
  children,
  creatorInfos,
  post,
}: TpostReaderContainer): JSX.Element {
  return (
    <div className="page-container-l1 max-w-3xl py-5 ">
      <div className="max-w-2xl mx-auto">
        {/* creator Profile */}
        <Link
          to={`/c/${creatorInfos.userName}`}
          className="flex gap-2 items-center max-w-max">
          <img
            className="h-10 w-10 rounded-full "
            src={creatorInfos.profileImage}
            alt=""
          />
          <div className="block overflow-hidden  ">
            <p
              className="text-primary hover:text-cyan-600
              hover:underline
              dark:hover:text-cyan-500
          text-base font-bold truncate ">
              {creatorInfos.displayName}
            </p>
            <p
              className="-mt-1
          text-sm text-secondary font-bold truncate ">
              c/{creatorInfos.userName}
            </p>
          </div>
        </Link>
        {/* Date */}
      </div>
      <div>
        <div className="max-w-2xl mx-auto mt-3">
          <div className="text-primary text-2xl font-bold ">
            {post.preview.title}
          </div>
          <div
            className="text-base mt-1 break-words
            whitespace-pre-wrap
        text-primary 
        leading-tight">
            {post.preview.teaser}
          </div>
        </div>
        <div className="my-6">{children}</div>
        <div
          className=" text-xs 
        max-w-2xl mx-auto font-bold text-left
    text-secondary">
          {fullDate(post.preview.timeCreation)}
        </div>
        <div>
          {post.content !== undefined && post.content.attachments.length > 0 && (
            <div className="max-w-2xl mx-auto">
              <AttachmentReader attachments={post.content.attachments} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
