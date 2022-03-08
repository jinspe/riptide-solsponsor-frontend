import React, { useState, Fragment } from 'react';

import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronDownIcon, MailIcon } from '@heroicons/react/solid';
import ClassNamesLogic from 'components/Common/Util/ClassNamesLogic';

import { ICreator } from 'types/types';

import MembershipTab from './MembershipPages/MembershipTab';

type TcreatorTabsPage = {
  creatorInfos: ICreator | undefined;
};

export default function CreatorTabsPage({
  creatorInfos,
}: TcreatorTabsPage): JSX.Element {
  const [currentTab, setCurrentTab] = useState(0);

  const tabs = [{ name: 'Posts' }, { name: 'Membership' }];

  return (
    <div>
      <div
        className="bg-neutral-200 dark:bg-neutral-900 
      rounded-lg shadow mx-auto p-3">
        <div>
          {/* CoverImage */}
          <div>
            <img
              className="h-32 w-full object-cover lg:h-48 rounded-lg"
              src={creatorInfos?.coverImage}
              alt=""
            />
          </div>
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div
              className="-mt-12 sm:-mt-16 
            sm:flex 
            sm:items-end sm:space-x-5">
              {/* ProfileImage */}
              <div className="flex">
                <img
                  className="h-24 w-24 rounded-full 
                  ring-4 ring-neutral-200 
                  dark:ring-neutral-800 
                  sm:h-32 sm:w-32"
                  src={creatorInfos?.profileImage}
                  alt=""
                />
              </div>
              <div
                className="mt-2 sm:mt-6 sm:flex-1 sm:min-w-0 sm:flex 
              sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
                <div className="sm:hidden md:block sm:mt-6 min-w-0 flex-1">
                  <p
                    className="text-2xl font-bold text-neutral-900 
              dark:text-neutral-100 truncate">
                    {creatorInfos?.displayName}
                  </p>
                </div>
                {/*  Message Button */}
                <div
                  className=" -mt-24 sm:mt-6 flex 
                  justify-end
                ">
                  <div className=" transform scale-75">
                    <p
                      className="font-semibold 
                    text-neutral-800 text-left px-2
                    dark:text-neutral-300">
                      Coming soon!
                    </p>
                    <div className="opacity-50">
                      <button
                        type="button"
                        className="inline-flex justify-center 
                        px-4 py-2 
                    border border-neutral-300 dark:border-neutral-800
                    shadow-sm text-sm font-medium rounded-md 
                    text-neutral-700 dark:text-neutral-300
                    bg-white 
                    hover:bg-neutral-100 
                    dark:bg-neutral-700 
                    dark:hover:bg-neutral-600 
                    focus:outline-none 
                    focus:ring-2 focus:ring-offset-2 
                    focus:ring-cyan-600">
                        <MailIcon
                          className="-ml-1 mr-2 h-5 w-5 text-neutral-500"
                          aria-hidden="true"
                        />
                        <span>Message</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className=" mt-8 sm:mt-2 min-w-0 flex-1">
              <p
                className="
                hidden sm:block md:hidden
                text-2xl font-bold text-neutral-900 
              dark:text-neutral-100 truncate">
                {creatorInfos?.displayName}
              </p>
              <p
                className="text-xl mt-1 sm:mt-3 font-bold text-neutral-900 
              dark:text-neutral-100 truncate">
                c/{creatorInfos?.userName}
              </p>
              <p
                className="text-sm mt-0.5 font-semibold italic text-neutral-500 
             truncate">
                {creatorInfos?.uid}
              </p>
            </div>
          </div>
        </div>

        {/* Small tabs dropdown */}
        <div className="mt-4 sm:hidden">
          <Listbox value={currentTab} onChange={setCurrentTab}>
            {({ open }) => (
              <div className="relative">
                <Listbox.Button
                  className="relative w-full 
                  border
                border-neutral-300 
                bg-neutral-100
                dark:border-neutral-600
                dark:bg-neutral-700
                text-black
                dark:text-neutral-200
                rounded-md shadow-sm pl-3 pr-10 py-2 
                text-left 
                focus:outline-none 
                focus:ring-1 
                focus:ring-cyan-600 
                focus:border-cyan-600 
                font-medium text-sm">
                  <span className="block truncate">
                    {tabs[currentTab].name}
                  </span>
                  <span
                    className="absolute 
                  inset-y-0 right-0 flex items-center 
                  pr-2 pointer-events-none">
                    <ChevronDownIcon
                      className="h-5 w-5 
                      "
                      aria-hidden="true"
                    />
                  </span>
                </Listbox.Button>
                <Transition
                  show={open}
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0">
                  <Listbox.Options
                    className="absolute z-40 
                    mt-1 w-full 
                    border-neutral-300 
                    bg-neutral-100
                    dark:border-neutral-600
                    dark:bg-neutral-700
                    text-black
                    dark:text-neutral-200
                    shadow-lg max-h-60 
                    rounded-md py-1 
                     ring-1 
                  ring-black ring-opacity-5  
                  focus:outline-none
                  font-medium text-sm
                  ">
                    {tabs.map((tab, idx) => (
                      <Listbox.Option
                        key={tab.name}
                        className={({ active }) =>
                          ClassNamesLogic(
                            active ? ' bg-neutral-200 dark:bg-neutral-600' : '',
                            ' select-none relative py-2 pl-8 pr-4'
                          )
                        }
                        value={idx}>
                        {({ selected }) => (
                          <>
                            <span className="block truncate">{tab.name}</span>
                            {selected ? (
                              <span
                                className="absolute inset-y-0 
                              text-cyan-600
                              left-0 flex items-center 
                              pl-1.5">
                                <CheckIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            )}
          </Listbox>
        </div>
        {/* Large tabs */}
        <div className=" mt-2 hidden sm:block">
          <div className=" ">
            <nav className="-mb-px flex" aria-label="Tabs">
              {tabs.map((tab, idx) => (
                <button
                  key={tab.name}
                  type="button"
                  className={ClassNamesLogic(
                    idx === currentTab
                      ? 'border-cyan-600 text-cyan-600' +
                          ' dark:text-cyan-400 dark:border-cyan-400'
                      : 'border-transparant dark:border-neutral-800 ' +
                          ' text-neutral-500' +
                          ' hover:text-neutral-700 hover:border-neutral-300' +
                          ' dark:hover:text-neutral-300 ' +
                          'dark:hover:border-neutral-500',
                    'w-full py-4 px-1 text-center border-b-2 ' +
                      'font-bold text-base'
                  )}
                  onClick={() => setCurrentTab(idx)}>
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>
        </div>
        {/* Tab Content */}
        <div className="mt-6">
          <div
            className={ClassNamesLogic(
              currentTab === 0 ? 'block' : 'hidden',
              ''
            )}>
            <p>tab 0</p>
          </div>
          <div
            className={ClassNamesLogic(
              currentTab === 1 ? 'block' : 'hidden',
              ''
            )}>
            <MembershipTab creatorInfos={creatorInfos} />
          </div>
        </div>
      </div>
    </div>
  );
}
