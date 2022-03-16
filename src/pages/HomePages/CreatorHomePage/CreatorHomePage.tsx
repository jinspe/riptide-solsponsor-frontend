import React from 'react';
import { useRecoilValue } from 'recoil';

import SelfPostQueryList from 'components/Posts/SelfPost/SelfPostQueryList';
import { creatorInfosAtom } from 'services/Utils/Recoil/creatorInfo';

import CreatorHomeHeader from './CreatorHomeHeader';

export default function CreatorHomePage(): JSX.Element {
  const creatorInfos = useRecoilValue(creatorInfosAtom);

  return (
    <div className="pageFrame">
      <div className="max-w-5xl">
        <div className="surface-l1 rounded-lg shadow">
          <div className=" pb-5 mx-auto p-1 rounded-lg ">
            <CreatorHomeHeader creatorInfos={creatorInfos} />
          </div>
        </div>
        <div className=" mt-5 rounded-lg surface-l1 mx-auto">
          <SelfPostQueryList state="published" />
        </div>
      </div>
    </div>
  );
}
