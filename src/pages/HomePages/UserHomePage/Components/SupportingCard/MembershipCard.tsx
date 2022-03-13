import React from 'react';
import { Link } from 'react-router-dom';
import { TimestampToExpiration } from 'services/Utils/Functions/TimeFunctions';
import { ImembershipInfo } from 'types/types';

type TmembershipCard = {
  membershipInfos: ImembershipInfo;
};
export default function MembershipCard({
  membershipInfos,
}: TmembershipCard): JSX.Element {
  return (
    <Link to={`/c/${membershipInfos.creatorInfos.userName}`}>
      <div
        className=" my-2 py-2 px-5 flex items-center rounded-lg 
        dark:hover:bg-neutral-700 
      hover:bg-neutral-300">
        <img
          className="h-10 w-10 mx-auto rounded-full"
          src={membershipInfos.creatorInfos.profileImage}
          alt=""
        />
        <div
          className="block py-1 px-3 
            w-full truncate -mb-1">
          <p
            className="text-primary 
          text-sm font-bold truncate ">
            {membershipInfos.creatorInfos.displayName}
          </p>
          <p
            className=" truncate text-secondary
            text-xs font-medium">
            c/{membershipInfos.creatorInfos.userName}
          </p>
          <p
            className=" truncate
            text-secondary
            text-2xs font-medium italic">
            until:{' '}
            {TimestampToExpiration(membershipInfos.membership.expiration)}
          </p>
        </div>
      </div>
    </Link>
  );
}
