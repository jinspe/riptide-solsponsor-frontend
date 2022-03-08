import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { getCreator } from 'services/Firebase/GetData/CreatorUtils';
import {
  userPublicKeyAtom,
  userDisplayNameAtom,
  userProfileImageAtom,
  userIsCreatorAtom,
  userMembershipsAtom,
} from 'services/Utils/Recoil/userInfo';
import { ICreator, ImembershipInfo } from 'types/types';

import SupportingCard from './Components/SupportingCard';
import YourCreatorFeed from './Components/YourCreatorFeed';

export default function UserHomePage(): JSX.Element {
  const userProfileImage = useRecoilValue(userProfileImageAtom);
  const userPublicKey = useRecoilValue(userPublicKeyAtom);
  const userDisplayName = useRecoilValue(userDisplayNameAtom);
  const userIsCreator = useRecoilValue(userIsCreatorAtom);
  const userMemberships = useRecoilValue(userMembershipsAtom);

  const [memListActive, setMemListActive] = useState<Array<ImembershipInfo>>(
    []
  );
  const [memListExpired, setMemListExpired] = useState<Array<ImembershipInfo>>(
    []
  );

  const [getCreatorsLoading, setGetCreatorLoading] = useState(true);

  async function getCreators() {
    setGetCreatorLoading(true);
    const memberListActive: ImembershipInfo[] = [];
    const memberListExpired: ImembershipInfo[] = [];
    const currentDate = new Date();
    const timeNow = currentDate.getTime();

    /* eslint-disable no-restricted-syntax */
    for await (const memship of userMemberships) {
      try {
        const creatorI = await getCreator(memship.cId);
        if (creatorI !== undefined) {
          if (parseFloat(memship.expiration) > timeNow)
            memberListActive.push({
              creatorInfos: creatorI,
              membership: memship,
            });
          else
            memberListExpired.push({
              creatorInfos: creatorI,
              membership: memship,
            });
        }
        // eslint-disable-next-line no-empty
      } catch {}
    }

    setMemListActive(memberListActive);
    setMemListExpired(memberListExpired);
    setGetCreatorLoading(false);
  }

  useEffect(() => {
    getCreators();
  }, [userMemberships]);

  return (
    <div>
      <div className="pageFrame">
        <div className="flex mx-auto gap-2 mt-2 mb-2 ">
          <div className="items-center w-56 lg:w-72 hidden md:block">
            <SupportingCard
              displayName={userDisplayName}
              profileImage={userProfileImage}
              publicKey={userPublicKey}
              isCreator={userIsCreator}
              memListActive={memListActive}
              memListExpired={memListExpired}
              getCreatorsLoading={getCreatorsLoading}
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
            isCreator={userIsCreator}
            memListActive={memListActive}
            memListExpired={memListExpired}
            getCreatorsLoading={getCreatorsLoading}
          />
        </div>
      </div>
    </div>
  );
}
