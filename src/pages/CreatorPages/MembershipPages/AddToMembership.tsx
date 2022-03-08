import React, { useState, useEffect } from 'react';
import BasicEditorReader from 'services/Utils/CKeditor/Reader/BasicEditorReader';

import { ICreator } from 'types/types';

import CheckoutSection from './CheckoutSection/CheckoutSection';

type TmembershipTab = {
  creatorInfos: ICreator | undefined;
};

export default function AddToMembership({
  creatorInfos,
}: TmembershipTab): JSX.Element {
  const [membershipTime, setMembershipTime] = useState(30);
  const [membershipPrice, setMembershipPrice] = useState(
    creatorInfos?.tierPrice ?? 1
  );

  function updatePrice(time: number) {
    let price = membershipPrice;
    const usedTime = time >= 30 ? time : 30;
    if (creatorInfos?.tierPrice !== undefined) {
      price = (creatorInfos.tierPrice * usedTime) / 30;
    }
    setMembershipTime(time);
    setMembershipPrice(parseFloat(price.toFixed(5)));

    return price;
  }

  useEffect(() => {
    updatePrice(membershipTime);
  }, [creatorInfos]);

  return (
    <div className="">
      {/* Support Creator section */}
      <div
        className="bg-neutral-100 dark:bg-neutral-800 max-w-4xl mx-auto 
          shadow-sm
         border border-neutral-300 dark:border-neutral-600 
        px-4 py-5 rounded-lg sm:p-6">
        <div className="mx-auto max-w-3xl">
          {/* Title */}
          <div className="">
            {/* Action heading */}
            <div className=" overflow-hidden">
              <p
                className=" w-min mx-auto text-2xl font-extrabold 
                text-transparent bg-clip-text
                   bg-gradient-to-br from-cyan-400 to-cyan-700 truncate
                   text-center">
                Join {creatorInfos?.displayName}
              </p>
            </div>
            <p className="text-2xl mt-5 font-bold leading-6 bc-text-color text-center">
              Add time to your membership
            </p>
            <p className="mt-2 text-base text-neutral-500 text-center">
              Buy an access to all their content for a chosen period of time!
            </p>
            <p className="mt-2  text-xl font-bold bc-text-color text-center">
              {creatorInfos?.tierPrice} SOL / month
            </p>
          </div>
          <div className="mt-5 ">
            <form
              className="space-y-6"
              onSubmit={(e) => {
                e.preventDefault();
              }}
              autoComplete="off">
              {/* Tier Description */}
              <div>
                <p className="block text-lg font-medium bc-text-color text-center">
                  Membership description
                </p>
                <div className="flex mt-1  ">
                  <div className=" rounded-lg overflow-auto mx-auto">
                    <BasicEditorReader text={creatorInfos?.tierDescription} />
                  </div>
                </div>
              </div>

              <div className="">
                {/* Set a time */}
                <div className="mt-6">
                  <div
                    className=" text-center
                    text-lg font-medium bc-text-color">
                    Choose a time to add in days
                  </div>
                  <p className="text-base ml-2  text-center text-neutral-500">
                    (minimum 30 days)
                  </p>
                  <input
                    type="number"
                    className="shadow-sm 
                    mx-auto
                      mt-2
                  text-input-field
                  bc-field-input
                   block w-24 text-xl border 
                    rounded-md"
                    value={membershipTime}
                    min={30}
                    step={1}
                    onChange={(e) => {
                      updatePrice(e.target.valueAsNumber);
                    }}
                  />
                </div>

                {/* Preview Costs */}
                <div className="mt-2">
                  <div className="flex justify-center items-baseline gap-2">
                    <div className=" text-lg font-medium bc-text-color">
                      Total costs :
                    </div>
                    {creatorInfos?.tierPrice !== undefined && (
                      <div
                        className="text-neutral-900 text-lg
                      dark:text-neutral-100 font-semibold">
                        {membershipPrice} SOL
                      </div>
                    )}
                  </div>
                </div>

                {/* Connect Wallet */}
                {creatorInfos?.uId !== undefined && (
                  <CheckoutSection
                    price={membershipPrice}
                    creatorInfos={creatorInfos}
                    membershipTime={membershipTime}
                  />
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
