import React from 'react';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

import { userPublicKeyAtom } from 'services/Utils/Recoil/userInfo';

import NavSearchBar from './NavSearchBar';
import LoginButton from './LoginButton';
import ProfileDropdown from './MenuDropDown/ProfileDropdown';
import JoinAsCreatorButton from './JoinAsCreatorButton';

import 'style/Components/headers.css';
/*
TODO:
-Logo with colors that are ok
*/

export default function UserNavbar(): JSX.Element {
  const userPublicKey = useRecoilValue(userPublicKeyAtom);

  return (
    <nav className="headers-bg shadow mb-5 sticky top-0 z-40">
      <div className="mcontainer-c0">
        <div className="flex justify-between h-12">
          {/* Logo */}
          <div className="flex px-2 lg:px-0">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/">
                <img
                  className="block lg:hidden h-8 w-auto"
                  src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                  alt="Workflow"
                />
                <img
                  className="hidden lg:block h-8 w-auto"
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
          <div className=" ml-4 align-middle flex items-center">
            {userPublicKey === undefined && (
              <div className="mr-4 hidden align-middle sm:block ">
                <div className="flex">
                  <div className=" mr-2">
                    <LoginButton />
                  </div>
                  <div className="">
                    <JoinAsCreatorButton />
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
