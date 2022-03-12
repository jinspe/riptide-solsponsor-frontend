import React from 'react';

import Spinner from 'components/Common/Util/Spinner';

export default function CreatorFeedLoading(): JSX.Element {
  return (
    <div className="bg-neutral-200 dark:bg-neutral-800 rounded-lg p-1">
      <div className="mx-auto flex justify-center my-10">
        <Spinner classExtend="h-12 spinner-color " />
      </div>
    </div>
  );
}
