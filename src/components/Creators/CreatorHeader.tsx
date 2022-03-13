import React from 'react';

import { MailIcon } from '@heroicons/react/solid';

import { Icreator } from 'types/types';

type TcreatorHeader = {
  creatorInfos: Icreator;
};

export default function CreatorHeader({
  creatorInfos,
}: TcreatorHeader): JSX.Element {
  return (
    <div>
      {/* CoverImage */}
      <div>
        <img
          className="h-32 w-full object-cover lg:h-48 rounded-lg"
          src={creatorInfos?.coverImage}
          alt=""
        />
      </div>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="-mt-12 sm:-mt-16 
            sm:flex 
            sm:items-end sm:space-x-5">
          {/* ProfileImage */}
          <div className="flex">
            <img
              className="h-24 w-24 rounded-full 
                  ring-4 ring-neutral-200 
                  dark:ring-neutral-900 
                  sm:h-32 sm:w-32"
              src={creatorInfos?.profileImage}
              alt=""
            />
          </div>
          <div
            className="mt-2 sm:mt-6 sm:flex-1 sm:min-w-0 sm:flex 
              sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
            <div className="sm:hidden md:block sm:mt-6 min-w-0 flex-1">
              <p
                className="text-2xl font-bold text-neutral-900 
              dark:text-neutral-100 truncate">
                {creatorInfos?.displayName}
              </p>
            </div>
            {/*  Message Button */}
            <div
              className=" -mt-24 sm:mt-6 flex 
                  justify-end
                ">
              <div className=" transform scale-75">
                <p
                  className="font-semibold 
                    text-neutral-800 text-left px-2
                    dark:text-neutral-300">
                  Coming soon!
                </p>
                <div className="opacity-50">
                  <button
                    type="button"
                    className="inline-flex justify-center 
                        px-4 py-2 
                    border border-neutral-300 dark:border-neutral-800
                    shadow-sm text-sm font-medium rounded-md 
                    text-neutral-700 dark:text-neutral-300
                    bg-white 
                    hover:bg-neutral-100 
                    dark:bg-neutral-700 
                    dark:hover:bg-neutral-600 
                    focus:outline-none 
                    focus:ring-2 focus:ring-offset-2 
                    focus:ring-cyan-600">
                    <MailIcon
                      className="-ml-1 mr-2 h-5 w-5 text-neutral-500"
                      aria-hidden="true"
                    />
                    <span>Message</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className=" mt-8 sm:mt-2 min-w-0 flex-1">
          <p
            className="
                hidden sm:block md:hidden
                text-2xl font-bold text-neutral-900 
              dark:text-neutral-100 truncate">
            {creatorInfos?.displayName}
          </p>
          <p
            className="text-xl mt-1 sm:mt-3 font-bold text-neutral-900 
              dark:text-neutral-100 truncate">
            c/{creatorInfos?.userName}
          </p>
          <p
            className="text-sm mt-0.5 font-semibold italic text-neutral-500 
             truncate">
            {creatorInfos?.uId}
          </p>
        </div>
      </div>
    </div>
  );
}
