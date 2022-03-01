import React from 'react';
import { UserCircleIcon, PencilIcon } from '@heroicons/react/outline';
import { Link } from 'react-router-dom';

type IsupportingCard = {
  displayName: string | undefined;
  profileImage: string | undefined;
  publicKey: string | undefined;
};
export default function SupportingCard({
  displayName,
  profileImage,
  publicKey,
}: IsupportingCard): JSX.Element {
  return (
    <div className="bg-neutral-200 dark:bg-neutral-800 rounded-lg p-1">
      <div className=" p-2 flex ">
        {publicKey === undefined ||
        profileImage === '' ||
        profileImage === undefined ? (
          <UserCircleIcon className=" h-20 w-20 mx-auto" />
        ) : (
          <img
            className="h-16 w-16 mx-auto rounded-full"
            src={profileImage}
            alt=""
          />
        )}
        <div
          className="block py-1 px-3 
            w-full truncate -mb-1">
          <p
            className="text-neutral-800 dark:text-neutral-200 
          text-md font-bold truncate ">
            {displayName}
          </p>
          <p
            className=" mt-0.5 truncate
                      text-neutral-500
                      text-xs font-medium">
            {publicKey}
          </p>
          <Link
            to="/user-settings"
            className=" mt-1 font-medium text-sm
                text-cyan-600 hover:text-cyan-500 flex">
            edit profile
            <PencilIcon className="ml-1 h-auto w-4" />
          </Link>
        </div>
      </div>
      <div className="px-5 py-2">
        <div className="border-neutral-500 border-b " />
      </div>
      {/* List of creator Supported */}
      <div className="p-2 max-h-48 md:max-h-96 overflow-auto no-scrollbar">
        <div className="p-3">pop</div>
        <div className="p-3">pop</div>
        <div className="p-3">pop</div>
        <div className="p-3">pop</div>
        <div className="p-3">pop</div>
        <div className="p-3">pop</div>
        <div className="p-3">pop</div>
        <div className="p-3">pop</div>
        <div className="p-3">pop</div>
        <div className="p-3">pop</div>
        <div className="p-3">pop</div>
        <div className="p-3">pop</div>
      </div>

      <div className="px-5 py-2">
        <div className="border-neutral-500 border-b " />
      </div>
      <div className="p-2">
        <div className="mx-auto text-center">
          <Link
            to="/"
            className="  text-lg font-medium 
                text-cyan-600 hover:text-cyan-500 text-center mx-auto">
            Discover new creators <span aria-hidden="true"> &rarr;</span>
          </Link>
        </div>

        <div className="py-1 mt-3 flex">
          <Link to="/become-creator" className="mx-auto">
            <button type="button" className=" h-7 text-center button-action ">
              Become a creator
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
