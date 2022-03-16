import React from 'react';
import {
  CheckCircleIcon,
  PlusIcon,
  ClipboardCopyIcon,
} from '@heroicons/react/solid';
import { timeGreeting } from 'services/Utils/Functions/TimeFunctions';
import { Icreator } from 'types/types';
import { Link } from 'react-router-dom';

type TcreatorHeader = {
  creatorInfos: Icreator;
};

export default function CreatorHomeHeader({
  creatorInfos,
}: TcreatorHeader): JSX.Element {
  return (
    <div>
      <div className="px-4 sm:px-6 lg:max-w-6xl lg:mx-auto lg:px-8">
        <div className="py-6 md:flex md:items-center md:justify-between ">
          <div className="flex-1 min-w-0">
            {/* Profile */}
            <div className="flex items-center">
              <img
                className="hidden h-16 w-16 rounded-full sm:block"
                src={creatorInfos.profileImage}
                alt=""
              />
              <div className=" overflow-hidden truncate">
                <div className="flex items-center ">
                  <img
                    className="h-16 w-16 rounded-full sm:hidden"
                    src={creatorInfos.profileImage}
                    alt=""
                  />
                  <h1
                    className="ml-3 text-2xl font-bold 
                    text-primary truncate overflow-hidden max-w-full">
                    {timeGreeting()}, {creatorInfos.displayName}
                  </h1>
                </div>
                <dl className="mt-6 flex flex-col sm:ml-3 sm:mt-1 sm:flex-row sm:flex-wrap">
                  <dt className="sr-only">Company</dt>
                  <dd
                    className=" text-sm 
                    text-secondary font-medium sm:mr-6 truncate">
                    c/{creatorInfos.userName}
                  </dd>
                  <dt className="sr-only">Account status</dt>
                  <dd
                    className="mt-3 flex items-center text-sm 
                    text-secondary font-medium sm:mr-6 sm:mt-0 capitalize">
                    <CheckCircleIcon
                      className="flex-shrink-0 mr-1.5 h-5 w-5 text-green-400"
                      aria-hidden="true"
                    />
                    Creator
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="mt-6 flex space-x-3 justify-center md:mt-0 md:ml-4">
            <Link to="/new-post">
              <button type="button" className="button-action">
                <div className="flex items-center gap-1">
                  <PlusIcon className="h-5 -ml-1 " />
                  Create a New Post
                </div>
              </button>
            </Link>
          </div>
        </div>
        <div className="sm:mt-2 mb-3 ">
          <div className="text-center space-y-2 sm:flex justify-around items-center">
            <div>
              <button
                type="button"
                className=""
                onClick={() => {
                  navigator.clipboard.writeText(
                    `https://solsponsor.com/c/${creatorInfos.userName}`
                  );
                }}>
                <p
                  className="flex justify-center gap-1 text-center items-center
                    text-base font-semibold text-primary dark:hover:text-cyan-400
                    hover:underline hover:text-cyan-500">
                  Share your profile <ClipboardCopyIcon className="h-5" />
                </p>
              </button>
            </div>
            <div>
              <Link
                to="/sponsors"
                className="text-base font-semibold 
                text-primary dark:hover:text-cyan-400
                hover:underline hover:text-cyan-500 
                text-center mx-auto">
                Manage your sponsors
                <span aria-hidden="true"> &rarr;</span>
              </Link>
            </div>
            <div>
              <Link
                to={`/c/${creatorInfos.userName}`}
                className="text-base font-semibold 
                text-primary dark:hover:text-cyan-400
                hover:underline hover:text-cyan-500  
                text-center mx-auto">
                Visit Your Profile
                <span aria-hidden="true"> &rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
