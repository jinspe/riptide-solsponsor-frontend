import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

import { getMembershipFiles } from 'services/Firebase/GetData/UserUtils';
import { Imembership, ICreator } from 'types/types';
import { userMembershipsAtom } from 'services/Utils/Recoil/userInfo';
import { refreshMembershipAtom } from 'services/Utils/Recoil/appState';
import { toast } from 'react-toastify';

type TcurrentMembership = {
  creatorInfos: ICreator | undefined;
};
export default function CurrentMembership({
  creatorInfos,
}: TcurrentMembership): JSX.Element {
  const [creatorMembership, setCreatorMembership] = useState<
    Imembership | undefined
  >();

  const memberships = useRecoilValue(userMembershipsAtom);
  const refreshMembership = useRecoilValue(refreshMembershipAtom);

  const [membershipImage, setMemeberhsipImage] = useState<string | undefined>();
  const [expiration, setExpiration] = useState<string | undefined>();

  async function readMembershipFile() {
    try {
      if (creatorInfos?.uid !== undefined) {
        const memberFile = await getMembershipFiles(creatorInfos?.uid);
        setMemeberhsipImage(memberFile.image);
      }
    } catch (error: any) {
      toast.error('Failed to get your current membership Image');
    }
  }

  useEffect(() => {
    setCreatorMembership(
      memberships.find((element) => element.cId === creatorInfos?.uid)
    );
    readMembershipFile();
  }, [memberships, creatorInfos, refreshMembership]);

  useEffect(() => {
    if (creatorMembership !== undefined) {
      const date = new Date(
        parseFloat(creatorMembership.expiration)
      ).toDateString();
      setExpiration(date);
    }
  }, [creatorMembership]);

  return (
    <div
      className="bg-neutral-100 dark:bg-neutral-800 max-w-4xl 
    mx-auto 
    shadow-sm
   border border-neutral-300 dark:border-neutral-600 
  px-4 py-5 rounded-lg sm:p-6
 
  ">
      <div className="">
        <h3 className="text-lg font-medium leading-6 bc-text-color  text-center">
          Your current membership
        </h3>
      </div>
      {creatorInfos?.uid !== undefined && creatorMembership !== undefined ? (
        <div className="mt-4 ">
          {/* have membership */}
          <img
            src={membershipImage}
            alt="membershipImage"
            className="h-96 mx-auto "
          />
          <div className="bc-text-color font-semibold text-center mt-4">
            Expires: {expiration}
          </div>
        </div>
      ) : (
        <div className="mt-2 ">
          {/* No membership */}
          <div className="bc-text-color text-center">
            You currently have no membership to this creator
          </div>
        </div>
      )}
    </div>
  );
}
