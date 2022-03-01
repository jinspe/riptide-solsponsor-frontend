import React, { Fragment, useState, ReactNode } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';

import NavSearchBar from 'components/Common/Navbar/NavSearchBar';
import ProfileDropdown from 'components/Common/Navbar/MenuDropDown/ProfileDropdown';

import { LogoLarge } from 'components/Common/Util/LogoText';

import SideBarItems from './DashBoardNav/SideBarItems';

import SideNavFix from './DashBoardNav/SideNavFix';

import 'style/Components/headers.css';

export default function DashBoard({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className=" min-h-screen max-h-screen overflow-hidden flex ">
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 flex z-40 lg:hidden"
          onClose={setSidebarOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0">
            <Dialog.Overlay
              className="fixed inset-0 
              bg-neutral-600 
              bg-opacity-75"
            />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full">
            {/* Sidebar container */}
            <div
              className="relative flex-1 flex flex-col 
              max-w-xs 
              w-full 
              headers-bg
              focus:outline-none">
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0">
                <div className="absolute top-0 right-0 -mr-12 pt-2">
                  <button
                    type="button"
                    className="ml-1 flex items-center justify-center 
                    h-10 w-10 
                    rounded-full 
                    text-white 
                    hover:text-neutral-200
                    dark:text-neutral-200 
                    dark:hover:text-neutral-100
                    focus:outline-none 
                    hover:ring-2
                    hover:ring-inset
                    hover:ring-cyan-500
                    hover:ring-opacity-30
                    "
                    onClick={() => setSidebarOpen(false)}>
                    <span className="sr-only">Close sidebar</span>
                    <XIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
              </Transition.Child>
              <div className="flex-1 h-full pt-5 pb-4 overflow-y-auto">
                <div className="flex-shrink-0 flex items-center px-4">
                  <LogoLarge />
                </div>
                <SideBarItems setSidebarOpen={setSidebarOpen} />
              </div>
            </div>
          </Transition.Child>
          <div className="flex-shrink-0 w-14" aria-hidden="true">
            {/* Force sidebar to shrink to fit close icon */}
          </div>
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      <div className="max-h-screen  ">
        <SideNavFix />
      </div>
      {/* Top Bar */}
      <div className="flex flex-col min-w-0 flex-1 overflow-hidden ">
        <div
          className=" shadow 
          headers-bg  ">
          <div
            className="flex items-center 
            px-2 sm:px-4 lg:px-8 
          justify-between h-12
          ">
            {/* Logo */}
            <div className="lg:hidden">
              <button
                type="button"
                className=" h-10 w-10 
                focus:outline-none
                inline-flex items-center 
                justify-center 
                rounded-full 
                text-neutral-500 
                hover:text-neutral-800
                dark:text-neutral-300 
                dark:hover:text-neutral-200
                hover:ring-2
                hover:ring-inset
                hover:ring-cyan-500
                hover:ring-opacity-30"
                onClick={() => setSidebarOpen(true)}>
                <span className="sr-only">Open sidebar</span>
                <MenuIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="flex-1 flex items-center justify-center px-1">
              <NavSearchBar />
            </div>
            <ProfileDropdown />
          </div>
        </div>
        <div className=" z-0 overflow-y-auto max-h-screen">{children}</div>
      </div>
    </div>
  );
}
