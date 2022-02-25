import React, { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { ChevronDownIcon } from '@heroicons/react/solid';
import {
  LoginIcon,
  QuestionMarkCircleIcon,
  LogoutIcon,
  UserCircleIcon,
  UserIcon,
  CollectionIcon,
  GlobeIcon,
  FireIcon,
} from '@heroicons/react/outline';

import ClassNamesLogic from 'components/Common/Util/ClassNamesLogic';
import {
  userPublicKeyAtom,
  userProfileImageAtom,
  userDisplayNameAtom,
  userIsCreatorAtom,
} from 'services/Utils/Recoil/userInfo';

import DarkModeSwitch from './DarkModeSwitch';

import 'style/Components/headers.css';

export default function ProfileDropdown(): JSX.Element {
  const userPublicKey = useRecoilValue(userPublicKeyAtom);
  const userProfileImage = useRecoilValue(userProfileImageAtom);
  const userDisplayName = useRecoilValue(userDisplayNameAtom);
  const userIsCreator = useRecoilValue(userIsCreatorAtom);

  const userNavigation = [
    {
      name: 'My Creators Posts',
      href: '/',
      icon: <CollectionIcon className="flex-initial nav-icons-size" />,
    },
    {
      name: 'My Profile',
      href: '/',
      icon: <UserIcon className="flex-initial nav-icons-size" />,
    },
    {
      name: 'Explore Creators',
      href: '/',
      icon: <GlobeIcon className="flex-initial nav-icons-size" />,
    },
  ];

  return (
    <Menu as="div" className="text-md relative flex-shrink-0 z-50">
      {({ open }) => (
        <>
          <Menu.Button
            className="
                      rounded-lg 
                      flex 
                      py-0.5
                      bg-neutral-100
                      dark:bg-neutral-800
                      border
                      border-neutral-400
                      dark:border-neutral-600
                      focus:outline-none 
                      hover:ring-2
                      hover:ring-inset
                      hover:ring-cyan-500
                      hover:ring-opacity-30
                      focus:ring-2
                      focus:ring-inset  
                      focus:ring-cyan-500
                      focus:ring-opacity-100
                      text-neutral-500 
                      hover:text-neutral-800
                      dark:text-neutral-400 
                      dark:hover:text-neutral-200">
            <span className="sr-only">Open user menu</span>
            <div className="flex ">
              {userPublicKey === undefined ? (
                <UserCircleIcon className="ml-1 h-7 w-7" />
              ) : (
                <img
                  className="h-7 w-7 ml-1 rounded-full"
                  src={userProfileImage}
                  alt=""
                />
              )}

              <div
                className={ClassNamesLogic(
                  open ? 'transform rotate-180' : '',
                  'transition-transform duration-300 ease-in-out' +
                    ' my-auto flex items-center h-4 w-4 pr-0.5'
                )}>
                <ChevronDownIcon />
              </div>
            </div>
          </Menu.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95">
            <Menu.Items
              className="origin-top-right absolute 
                      right-0 mt-2 w-48 rounded-md shadow-lg py-1 
                      headers-bg  
                      ring-1   
                      ring-neutral-200
                      dark:ring-neutral-700
                      focus:outline-none
                      ">
              {userPublicKey !== undefined && (
                <div>
                  <Menu.Item disabled key="displayName">
                    <div
                      className=" 
                      block py-1 px-3 
                      w-full truncate -mb-1">
                      <p className="dropdown-text text-center truncate ">
                        {userDisplayName}
                      </p>
                      <p
                        className="text-center mt-0.5 truncate
                      text-neutral-500
                      text-xs font-medium">
                        {userPublicKey}
                      </p>
                    </div>
                  </Menu.Item>
                  {userNavigation.map((item) => (
                    <Link to={item.href} key={item.name}>
                      <Menu.Item>
                        {({ active }) => (
                          <div
                            className={ClassNamesLogic(
                              active ? 'dropdown-bg-active' : '',
                              'block py-2 px-3 dropdown-text mt-1'
                            )}>
                            <div className="flex-1 flex items-center ">
                              {item.icon}
                              <p className="pl-2 ">{item.name}</p>
                            </div>
                          </div>
                        )}
                      </Menu.Item>
                    </Link>
                  ))}
                  <div className="px-3 mt-1 mb-1">
                    <div
                      className=" border-t 
                border-neutral-500"
                    />
                  </div>
                </div>
              )}
              <Menu.Item disabled key="Dark mode">
                <div>
                  <DarkModeSwitch />
                </div>
              </Menu.Item>
              {/* HelpCenter */}
              <Link to="/help-center" key="HelpCenter">
                <Menu.Item>
                  {({ active }) => (
                    <div
                      className={ClassNamesLogic(
                        active ? 'dropdown-bg-active' : '',
                        'block py-2 px-3 dropdown-text mt-1'
                      )}>
                      <div className="flex-1 flex items-center ">
                        <QuestionMarkCircleIcon
                          className="flex-initial 
                        nav-icons-size"
                        />
                        <p className="pl-2 ">Help Center</p>
                      </div>
                    </div>
                  )}
                </Menu.Item>
              </Link>
              {/* BecomeCreator */}
              <Link
                to="/become-creator"
                key="BecomeCreator"
                className={ClassNamesLogic(
                  userPublicKey !== undefined && !userIsCreator
                    ? 'block'
                    : 'block sm:hidden',
                  ''
                )}>
                <Menu.Item>
                  {({ active }) => (
                    <div
                      className={ClassNamesLogic(
                        active ? 'dropdown-bg-active' : '',
                        'block py-2 px-3 dropdown-text mt-1'
                      )}>
                      <div className="flex-1 flex items-center ">
                        <FireIcon
                          className="flex-initial 
                          nav-icons-size"
                        />
                        <p className="pl-2">Become A Creator</p>
                      </div>
                    </div>
                  )}
                </Menu.Item>
              </Link>
              <div className="px-3 mt-1 mb-1">
                <div
                  className=" border-t 
                border-neutral-500"
                />
              </div>
              {/* Logout/ Signin */}
              <Link to="/login" key="LoginSignin">
                <Menu.Item>
                  {({ active }) => (
                    <div
                      className={ClassNamesLogic(
                        active ? 'dropdown-bg-active' : '',
                        ' block py-2 px-3 dropdown-text  '
                      )}>
                      <div className="flex-1 flex items-center ">
                        {userPublicKey !== undefined ? (
                          <LogoutIcon
                            className="flex-initial transform 
                              rotate-180 nav-icons-size"
                          />
                        ) : (
                          <LoginIcon
                            className="flex-initial transform 
                              rotate-180 nav-icons-size"
                          />
                        )}

                        <p className="pl-2">
                          {userPublicKey !== undefined
                            ? 'Signout'
                            : 'Signin/Login'}
                        </p>
                      </div>
                    </div>
                  )}
                </Menu.Item>
              </Link>
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );
}
