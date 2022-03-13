import React from 'react';
import { useRecoilValue } from 'recoil';
import { creatorInfosAtom } from 'services/Utils/Recoil/creatorInfo';

import { ClipboardCopyIcon } from '@heroicons/react/outline';

export default function NoSponsorsSection(): JSX.Element {
  const creatorUsername = useRecoilValue(creatorInfosAtom).userName;

  return (
    <div className="text-center my-20">
      <p className="font-bold text-2xl text-primary">
        You currently have no sponsors
      </p>
      <p className="font-semibold text-base text-secondary ">
        Consider sharing the link to your profile on social media.
      </p>
      <div className="mt-2">
        <a
          href={`https://solsponsor/c/${creatorUsername}.com`}
          className="text-cyan-600 text-lg italic underline font-semibold">
          {`https://solsponsor/c/${creatorUsername}.com`}
        </a>
      </div>
      <button
        type="button"
        className="mt-3 h-10 button-action"
        onClick={() => {
          navigator.clipboard.writeText(
            `https://solsponsor/c/${creatorUsername}.com`
          );
        }}>
        <p
          className="flex justify-center gap-1 text-center items-center
   text-lg font-semibold">
          copy link <ClipboardCopyIcon className="h-7" />
        </p>
      </button>
    </div>
  );
}
