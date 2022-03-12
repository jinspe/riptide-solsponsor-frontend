import React from 'react';
import { Icreator } from 'types/types';

type TnoMembershipSection = {
  setCurrentTab: React.Dispatch<React.SetStateAction<number>>;
  creatorInfos: Icreator;
};

export default function NoMembershipSection({
  setCurrentTab,
  creatorInfos,
}: TnoMembershipSection): JSX.Element {
  return (
    <div className="my-5 mt-10">
      <div
        className="text-lg font-bold text-center
        text-black
        dark:text-neutral-100">
        You currently don&apos;t sponsor this creator
      </div>
      <div className=" overflow-hidden">
        <p
          className=" w-min mx-auto text-2xl font-extrabold 
                text-transparent bg-clip-text
                   bg-gradient-to-br from-cyan-400 to-cyan-700 truncate
                   text-center">
          Sponsor {creatorInfos?.displayName} !
        </p>
      </div>
      <div className="flex justify-center">
        <button
          type="button"
          className="text-base font-medium 
        text-center mx-auto mt-2
                text-cyan-600 hover:text-cyan-500"
          onClick={() => setCurrentTab(1)}>
          Get a membership<span aria-hidden="true"> &rarr;</span>
        </button>
      </div>
    </div>
  );
}
