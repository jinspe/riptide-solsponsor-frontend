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
      <div className="page-title mt-3">Your creators latest posts</div>
      {memListActive.map((mem) => (
        <div className="my-10 space-y-10" key={mem.creatorInfos.uId}>
          <CreatorLatestPosts
            creatorInfos={mem.creatorInfos}
            numberPost={NUMBEROFPOSTS}
          />
        </div>
      ))}
    </div>
  );
}
