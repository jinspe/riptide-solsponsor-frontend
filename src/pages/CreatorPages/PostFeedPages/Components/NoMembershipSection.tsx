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
    <div className="my-5 mt-10 ">
      <div
        className="text-lg font-bold text-center
        text-black
        dark:text-neutral-100">
        You currently don&apos;t sponsor this creator
      </div>
      <div className=" ">
        <div
          className=" mx-auto text-2xl font-extrabold 
                   text-center">
          <p className="text-gradiant-accent overflow-hidden truncate">
            Sponsor {creatorInfos?.displayName} !
          </p>
        </div>
      </div>
      <div className="flex justify-center">
        <button
          type="button"
          className="text-base font-medium 
        text-center mx-auto mt-2
                text-link"
          onClick={() => setCurrentTab(1)}>
          Get a membership<span aria-hidden="true"> &rarr;</span>
        </button>
      </div>
    </div>
  );
}
