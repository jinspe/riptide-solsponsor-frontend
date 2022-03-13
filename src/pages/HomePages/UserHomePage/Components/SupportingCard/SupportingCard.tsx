import React from 'react';
import { UserCircleIcon, PencilIcon } from '@heroicons/react/outline';
import { Link } from 'react-router-dom';

import Spinner from 'components/Common/Util/Spinner';

import { ImembershipInfo } from 'types/types';

import MembershipCard from './MembershipCard';

type IsupportingCard = {
  displayName: string | undefined;
  profileImage: string | undefined;
  publicKey: string | undefined;
  isCreator: boolean;
  memListActive: ImembershipInfo[];
  memListExpired: ImembershipInfo[];
  getCreatorsLoading: boolean;
};
export default function SupportingCard({
  displayName,
  profileImage,
  publicKey,
  isCreator,
  memListActive,
  memListExpired,
  getCreatorsLoading,
}: IsupportingCard): JSX.Element {
  return (
    <div className="surface-l1 rounded-lg p-1">
      <div className=" p-2 flex ">
        {publicKey === undefined ||
        profileImage === '' ||
        profileImage === undefined ? (
          <UserCircleIcon className=" h-20 w-20 mx-auto text-secondary" />
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
            className="text-primary 
          text-md font-bold truncate ">
            {displayName}
          </p>
          <p
            className=" mt-0.5 truncate
            text-secondary text-xs font-medium">
            {publicKey}
          </p>
          <Link
            to="/user-settings"
            className=" mt-1 font-medium text-sm
            text-link flex">
            edit profile
            <PencilIcon className="ml-1 h-auto w-4" />
          </Link>
        </div>
      </div>
      <div className="px-5 py-2">
        <div className="color-border-l1 border-b " />
      </div>
      {/* List of creator Supported */}
      <div
        className="px-2 max-h-60 md:max-h-96 overflow-auto no-scrollbar 
        rounded-lg
      ">
        <div className=" rounded-lg">
          {getCreatorsLoading && (
            <div className="flex justify-center spinner-color mt-2">
              <Spinner classExtend="h-10" />
            </div>
          )}
          {!getCreatorsLoading && memListActive.length > 0 && (
            <div>
              <p
                className="mt-1 px-6 text-left text-primary
          text-md font-semibold leading-none">
                Your memberships
              </p>
              {memListActive.map((memship) => (
                <div key={memship.creatorInfos.uId}>
                  <MembershipCard membershipInfos={memship} />
                </div>
              ))}
            </div>
          )}
          {!getCreatorsLoading && memListExpired.length > 0 && (
            <div>
              <p
                className="mt-1 px-6 text-left text-primary
          text-md font-semibold leading-none">
                Expired memberships
              </p>
              {memListExpired.map((memship) => (
                <div key={memship.creatorInfos.uId}>
                  <MembershipCard membershipInfos={memship} />
                </div>
              ))}
            </div>
          )}
          {!getCreatorsLoading &&
            memListActive.length === 0 &&
            memListExpired.length === 0 && (
              <p
                className="mt-1 px-6 py-2 text-center 
                text-primary
                text-md font-semibold ">
                You currently have no memberships
              </p>
            )}
        </div>
      </div>

      <div className="px-5 py-2">
        <div className="color-border-l1 border-b " />
      </div>
      <div className="p-2">
        <div className="mx-auto text-center">
          <Link
            to="/search?c="
            className="  text-lg font-medium 
            text-link text-center mx-auto">
            Discover new creators <span aria-hidden="true"> &rarr;</span>
          </Link>
        </div>
        {!isCreator && (
          <div className="py-1 mt-3 flex">
            <Link to="/become-creator" className="mx-auto">
              <button type="button" className=" h-7 text-center button-action ">
                Become a creator
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
