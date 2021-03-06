import React, { Fragment, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/solid';

import ClassNamesLogic from 'components/Common/Util/ClassNamesLogic';

import ProfileSettings from './ProfileSettings/ProfileSettings';
import SocialSettings from './SocialSettings';
import BenefitSettings from './BenefitSettings';

export default function SettingsPage(): JSX.Element {
  const [currentTab, setCurrentTab] = useState(0);

  const tabs = [
    { name: 'Sponsors benefits' },
    { name: 'Profile' },
    { name: 'Socials' },
  ];
  return (
    <div className="pageFrame">
      <div className="page-container-l1">
        <div className="mt-1 page-title">Creator settings</div>
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
                      ? 'large-tab-active'
                      : 'large-tab-inactive',
                    'large-tab-base'
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
            <BenefitSettings />
          </div>
          <div
            className={ClassNamesLogic(
              currentTab === 1 ? 'block' : 'hidden',
              ''
            )}>
            <ProfileSettings />
          </div>
          <div
            className={ClassNamesLogic(
              currentTab === 2 ? 'block' : 'hidden',
              ''
            )}>
            <SocialSettings />
          </div>
        </div>
      </div>
    </div>
  );
}
