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
} from '@heroicons/react/outline';

import ClassNamesLogic from 'components/Common/Util/ClassNamesLogic';
import {
  userPublicKeyAtom,
  userProfileImageAtom,
  userDisplayNameAtom,
} from 'services/Recoil/userInfo';

import DarkModeSwitch from './DarkModeSwitch';

import 'style/Components/navbar.css';

export default function ProfileDropdown(): JSX.Element {
  const userPublicKey = useRecoilValue(userPublicKeyAtom);
  const userProfileImage = useRecoilValue(userProfileImageAtom);
  const userDisplayName = useRecoilValue(userDisplayNameAtom);

  const userNavigation = [
    {
      name: 'My Creators Posts',
      href: '/',
      icon: <CollectionIcon className="flex-initial h-6 w-6" />,
    },
    {
      name: 'My Profile',
      href: '/',
      icon: <UserIcon className="flex-initial h-6 w-6" />,
    },
    {
      name: 'Explore Creators',
      href: '/',
      icon: <GlobeIcon className="flex-initial h-6 w-6" />,
    },
  ];

  return (
    <Menu as="div" className="text-md relative flex-shrink-0">
      {({ open }) => (
        <>
          <Menu.Button
            className="
                      rounded-lg 
                      flex 
                      py-0.5
                      border
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
                      bg-white dark:bg-neutral-900  
                      ring-1   
                      ring-neutral-200
                      dark:ring-neutral-700
                      focus:outline-none">
              {userPublicKey !== undefined && (
                <div>
                  <Menu.Item disabled key="displayName">
                    <div
                      className=" 
                      block py-1 px-3 
                      text-neutral-800 
                      dark:text-neutral-200
                      hover:bg-neutral-200 
                      dark:hover:bg-neutral-700
                      w-full truncate -mb-1">
                      <p className="text-center truncate ">{userDisplayName}</p>
                      <p
                        className="text-center mt-0.5 truncate
                      text-neutral-500
                      text-xs">
                        {userPublicKey}
                      </p>
                    </div>
                  </Menu.Item>
                  {userNavigation.map((item) => (
                    <Menu.Item key={item.name}>
                      {({ active }) => (
                        <Link
                          to={item.href}
                          className={ClassNamesLogic(
                            active ? 'bg-neutral-200 dark:bg-neutral-700' : '',
                            'block py-2 px-3 ' +
                              'text-neutral-800 dark:text-neutral-200 mt-1'
                          )}>
                          <div className="flex-1 flex items-center ">
                            {item.icon}
                            <p className="pl-2">{item.name}</p>
                          </div>
                        </Link>
                      )}
                    </Menu.Item>
                  ))}
                  <div className="px-3 mt-1 mb-1">
                    <div
                      className=" border-t 
                border-neutral-500"
                    />
                  </div>
                </div>
              )}

              <Menu.Item key="Dark mode">
                <DarkModeSwitch />
              </Menu.Item>
              <Menu.Item key="HelpCenter">
                {({ active }) => (
                  <Link
                    to="/"
                    className={ClassNamesLogic(
                      active ? 'bg-neutral-200 dark:bg-neutral-700' : '',
                      'block py-2 px-3 ' +
                        'text-neutral-800 dark:text-neutral-200 mt-1'
                    )}>
                    <div className="flex-1 flex items-center ">
                      <QuestionMarkCircleIcon
                        className="flex-initial 
                      h-6 w-6"
                      />
                      <p className="pl-2">Help Center</p>
                    </div>
                  </Link>
                )}
              </Menu.Item>
              <div className="px-3 mt-1 mb-1">
                <div
                  className=" border-t 
                border-neutral-500"
                />
              </div>
              <Menu.Item key="LoginSignin">
                {({ active }) => (
                  <Link
                    to="/"
                    className={ClassNamesLogic(
                      active ? 'bg-neutral-200 dark:bg-neutral-700' : '',
                      'block py-2 px-3 ' +
                        'text-neutral-800 dark:text-neutral-200 '
                    )}>
                    <div className="flex-1 flex items-center ">
                      {userPublicKey !== undefined ? (
                        <LogoutIcon
                          className="flex-initial transform 
              rotate-180 h-6 w-6"
                        />
                      ) : (
                        <LoginIcon
                          className="flex-initial transform 
              rotate-180 h-6 w-6"
                        />
                      )}

                      <p className="pl-2">
                        {userPublicKey !== undefined
                          ? 'Signout'
                          : 'Signin/Login'}
                      </p>
                    </div>
                  </Link>
                )}
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );
}
