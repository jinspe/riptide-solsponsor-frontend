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
          <div
            className="bg-neutral-100 dark:bg-neutral-800 max-w-4xl mx-auto 
          shadow-sm
         border border-neutral-300 dark:border-neutral-600 
        px-4 py-5 rounded-lg sm:p-6
        ">
            <div className="mx-auto max-w-3xl">
              {/* Title */}
              <h3 className="text-lg font-medium leading-6 bc-text-color truncate text-center">
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
