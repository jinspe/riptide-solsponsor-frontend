import React from 'react';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { userPublicKeyAtom } from 'services/Recoil/userInfo';

import NavSearchBar from './NavSearchBar';
import LoginButton from './LoginButton';
import ProfileDropdown from './MenuDropDown/ProfileDropdown';
import JoinCreatorButton from './JoinCreatorButton';
import 'style/Components/navbar.css';
/*
TODO:
-Logo with colors that are ok
*/

export default function Navbar(): JSX.Element {
  const userPublicKey = useRecoilValue(userPublicKeyAtom);

  return (
    <nav className="bg-white dark:bg-neutral-900 shadow mb-5">
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
          <div
            className="flex-1 flex items-center justify-center 
            lg:justify-end
            px-1  ">
            <NavSearchBar />
          </div>
          {/* Profile dropdown */}
          <div className=" ml-4 flex items-center">
            {userPublicKey === undefined && (
              <div className="mr-4 hidden sm:block ">
                <div className="flex">
                  <div className=" mr-2">
                    <LoginButton />
                  </div>
                  <div className="">
                    <JoinCreatorButton />
                  </div>
                </div>
              </div>
            )}
            <ProfileDropdown />
          </div>
        </div>
      </div>
    </nav>
  );
}
