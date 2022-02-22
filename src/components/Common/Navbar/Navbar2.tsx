import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { SearchIcon } from '@heroicons/react/solid';
import { BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline';

import ClassNamesLogic from 'components/Common/Util/ClassNamesLogic';
import NavSearchBar from './NavSearchBar';

import 'style/Components/navbar.css';
/*
TODO:
-Logo with colors that are ok
*/

export default function Navbar(): JSX.Element {
  const userNavigation = [
    { name: 'Dashboard', href: '/', current: true },
    { name: 'Team', href: '/', current: false },
    { name: 'Projects', href: '/', current: false },
    { name: 'Calendar', href: '/', current: false },
  ];

  return (
    <Disclosure as="nav" className="bg-white dark:bg-neutral-800 shadow mb-5">
      {({ open }) => (
        <>
          <div className="mcontainer-c0">
            <div className="flex justify-between h-12">
              {/* Logo */}
              <div className="flex px-2 lg:px-0">
                <div className="flex-shrink-0 flex items-center">
                  <Link to="/">
                    <img
                      className="navbar-logo-sm"
                      src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                      alt="Workflow"
                    />
                    <img
                      className="navbar-logo-lg"
                      src="https://tailwindui.com/img/logos/workflow-logo-indigo-600-mark-gray-800-text.svg"
                      alt="Workflow"
                    />
                  </Link>
                </div>
              </div>
              {/* search bar */}
              <NavSearchBar />
              {/* Mobile menu button */}
              <div className="flex items-center lg:hidden">
                <Disclosure.Button
                  className="inline-flex items-center 
                  justify-center p-1 rounded-lg 
                  text-neutral-500 
                  hover:text-neutral-800
                  dark:text-neutral-400 
                  dark:hover:text-neutral-200
                  hover:bg-neutral-100
                  dark:hover:bg-neutral-700 
                  focus:outline-none 
                  focus:ring-2 
                  focus:ring-cyan-500">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="hidden lg:ml-4 lg:flex lg:items-center">
                <button
                  type="button"
                  className="flex-shrink-0 p-1 
                  text-neutral-500 
                  hover:text-neutral-800
                  dark:text-neutral-400 
                  dark:hover:text-neutral-200 
                  rounded-full 
                  focus:outline-none 
                  focus:ring-2 
                  focus:ring-cyan-500">
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>

                {/* Profile dropdown */}
                <Menu as="div" className="ml-4 relative flex-shrink-0">
                  <div>
                    <Menu.Button
                      className="
                      rounded-full 
                      flex 
                      focus:outline-none 
                      focus:ring-2 
                      focus:ring-cyan-500">
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                      />
                    </Menu.Button>
                  </div>
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
                      bg-white dark:bg-neutral-800  
                      ring-1   
                      ring-neutral-200
                      dark:ring-neutral-700
                      focus:outline-none">
                      {userNavigation.map((item) => (
                        <Menu.Item key={item.name}>
                          {({ active }) => (
                            <Link
                              to={item.href}
                              className={ClassNamesLogic(
                                active
                                  ? 'bg-neutral-200 dark:bg-neutral-700'
                                  : '',
                                'block py-2 px-4 text-sm' +
                                  'text-neutral-800 dark:text-neutral-100'
                              )}>
                              {item.name}
                            </Link>
                          )}
                        </Menu.Item>
                      ))}
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="lg:hidden">
            <div
              className="pt-4 pb-3 border-t 
            border-neutral-200
            dark:border-neutral-700">
              <div className="flex items-center px-4">
                <div className="flex-none">
                  <img
                    className="h-10 w-10 rounded-full
                    border
                    border-natural-700
                    dark:border-natural-00"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />
                </div>
                <div className=" flex-1 truncate ml-3">
                  <div
                    className="text-base font-medium 
                  text-neutral-800
                  dark:text-neutral-100">
                    Display Name
                  </div>
                  <div
                    className=" text-sm truncate font-medium 
                  text-neutral-500">
                    Hpp7d9K4Yd4w36rxAUvAjn6vu9Qf42XShbC2sBkEGdZv
                  </div>
                </div>
                <button
                  type="button"
                  className="ml-auto flex-shrink-0 
                  p-1 
                  text-neutral-500 
                  hover:text-neutral-800
                  dark:text-neutral-400 
                  dark:hover:text-neutral-200 
                  rounded-full 
                  hover:text-gray-500 
                  focus:outline-none 
                  focus:ring-2 
                  focus:ring-cyan-500">
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="mt-3 space-y-1">
                {userNavigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    className="block w-full text-left 
                    px-4 py-2 text-base font-medium 
                    hover:bg-neutral-200 
                    dark:hover:bg-neutral-700
                    text-neutral-800 
                    dark:text-neutral-100 ">
                    <Link to={item.href} className="">
                      {item.name}
                    </Link>
                  </Disclosure.Button>
                ))}
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
