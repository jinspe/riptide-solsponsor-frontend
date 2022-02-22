import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';

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
    <nav className="bg-white dark:bg-neutral-800 shadow mb-5">
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
          {/* Profile dropdown */}
          <div className=" ml-2 flex items-center">
            <Menu as="div" className=" relative flex-shrink-0">
              {({ open }) => (
                <>
                  <Menu.Button
                    className="
                      rounded-lg 
                      flex 
                      py-0.5
                      border
                      bg-neutral-100
                      dark:bg-neutral-900
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
                      <img
                        className="h-7 w-7 ml-1 rounded-full"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                      />
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
                                'block py-2 px-4 ' +
                                  'text-neutral-800 dark:text-neutral-100'
                              )}>
                              {item.name}
                            </Link>
                          )}
                        </Menu.Item>
                      ))}
                    </Menu.Items>
                  </Transition>
                </>
              )}
            </Menu>
          </div>
        </div>
      </div>
    </nav>
  );
}
