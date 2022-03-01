import React from 'react';
import { useRecoilValue } from 'recoil';
import {
  userPublicKeyAtom,
  userDisplayNameAtom,
  userProfileImageAtom,
  userIsCreatorAtom,
} from 'services/Utils/Recoil/userInfo';

import InProgressApp from 'inprogress/InProgressApp';
import SupportingCard from './Components/SupportingCard';
import YourCreatorFeed from './Components/YourCreatorFeed';

export default function UserHomePage(): JSX.Element {
  const userProfileImage = useRecoilValue(userProfileImageAtom);
  const userPublicKey = useRecoilValue(userPublicKeyAtom);
  const userDisplayName = useRecoilValue(userDisplayNameAtom);
  const userIsCreator = useRecoilValue(userIsCreatorAtom);

  return (
    <div>
      <div className="pageFrame">
        <div className="flex mx-auto gap-2 mt-2 mb-2 ">
          <div className="items-center w-64 hidden md:block">
            <SupportingCard
              displayName={userDisplayName}
              profileImage={userProfileImage}
              publicKey={userPublicKey}
            />
          </div>
          <div className="w-full ">
            <YourCreatorFeed />
          </div>
        </div>
        <div className="items-center w-full block md:hidden">
          <SupportingCard
            displayName={userDisplayName}
            profileImage={userProfileImage}
            publicKey={userPublicKey}
          />
        </div>
      </div>
    </div>
  );
}
