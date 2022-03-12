import React from 'react';
import { ImembershipInfo } from 'types/types';

import CreatorLatestPosts from './CreatorLatestPosts';

type IrecentPosts = {
  memListActive: ImembershipInfo[];
};

const NUMBEROFPOSTS = 2;

export default function RecentPosts({
  memListActive,
}: IrecentPosts): JSX.Element {
  return (
    <div>
      {memListActive.map((mem) => (
        <div className="my-5 space-y-10">
          {mem.creatorInfos.displayName}
          <CreatorLatestPosts
            creatorInfos={mem.creatorInfos}
            numberPost={NUMBEROFPOSTS}
          />
        </div>
      ))}
    </div>
  );
}
