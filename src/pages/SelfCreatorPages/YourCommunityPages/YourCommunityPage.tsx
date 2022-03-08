import React, { Fragment, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/solid';

import ClassNamesLogic from 'components/Common/Util/ClassNamesLogic';

import MessagesTab from './MessagesTab';
import MembersTab from './MembersTab';

export default function YourCommunityPage(): JSX.Element {
  const [currentTab, setCurrentTab] = useState(0);

  const tabs = [{ name: 'Members' }, { name: 'Messages' }];
  return (
    <div className="pageFrame">
      <div
        className="bg-neutral-200 dark:bg-neutral-900 
      rounded-lg shadow mx-auto p-3">
        <div
          className="text-xl mt-1 font-bold text-center
        text-black
        dark:text-neutral-100">
          Your Community
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
        <div className=" mt-4 hidden sm:block">
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
            <MembersTab />
          </div>
          <div
            className={ClassNamesLogic(
              currentTab === 1 ? 'block' : 'hidden',
              ''
            )}>
            <MessagesTab />
          </div>
        </div>
      </div>
    </div>
  );
}
