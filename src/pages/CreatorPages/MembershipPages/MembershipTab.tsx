import React from 'react';
import BasicEditorReader from 'services/Utils/CKeditor/Reader/BasicEditorReader';

import { Icreator } from 'types/types';
import AddToMembership from './AddToMembership';
import CurrentMembership from './CurrentMembership';

type TmembershipTab = {
  creatorInfos: Icreator;
};

export default function MembershipTab({
  creatorInfos,
}: TmembershipTab): JSX.Element {
  return (
    <div className="">
      <div className=" space-y-6 ">
        {/* Your Current Membership */}
        <CurrentMembership creatorInfos={creatorInfos} />
        {/* Add to Membership */}
        <AddToMembership creatorInfos={creatorInfos} />
        {/* About section */}
        {creatorInfos?.bio !== undefined && (
          <div className="content-l2-container max-w-4xl mx-auto">
            <div className="mx-auto max-w-3xl">
              {/* Title */}
              <h3
                className="text-lg font-medium leading-6 text-primary 
              truncate text-center">
                About {creatorInfos?.displayName}
              </h3>
              <div className="flex mt-4 ">
                <div className=" rounded-lg overflow-auto  mx-auto ">
                  <BasicEditorReader text={creatorInfos?.bio} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
