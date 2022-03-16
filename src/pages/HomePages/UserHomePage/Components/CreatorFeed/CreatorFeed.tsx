import React from 'react';
import Spinner from 'components/Common/Util/Spinner';
import { ImembershipInfo } from 'types/types';

import RecentPosts from './RecentPosts';
import NoMembershipFeed from './NoMembershipFeed';

type IyourCreatorFeed = {
  memListActive: ImembershipInfo[];
  getCreatorsLoading: boolean;
};

export default function CreatorFeed({
  memListActive,
  getCreatorsLoading,
}: IyourCreatorFeed): JSX.Element {
  return (
    <div className="surface-l1 rounded-lg p-1">
      {getCreatorsLoading && (
        <div className="mx-auto flex justify-center my-24">
          <Spinner classExtend="h-14 spinner-color " />
        </div>
      )}
      {!getCreatorsLoading && memListActive.length === 0 && (
        <NoMembershipFeed />
      )}
      {!getCreatorsLoading && memListActive.length > 0 && (
        <RecentPosts memListActive={memListActive} />
      )}
    </div>
  );
}
