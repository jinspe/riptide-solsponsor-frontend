import React from 'react';
import { LogoLarge } from 'components/Common/Util/LogoText';

import SideBarItems from './SideBarItems';

import 'style/Components/headers.css';

export default function SideNavFix(): JSX.Element {
  return (
    <div className="hidden  min-h-full lg:flex lg:flex-shrink-0 ">
      <div className="flex flex-col w-64">
        <div
          className="flex-1 flex flex-col 
        min-h-0 
        shadow 
        headers-bg">
          <div className="px-4 pt-2">
            <LogoLarge />
          </div>
          <div className="flex-1 flex flex-col pb-3 pt-1 ">
            <div
              className="flex items-center 
            shadow border-b 
            dark:border-neutral-800 
            border-neutral-200 
            flex-shrink-0 pb-1 px-4 "
            />
            <div
              className="overflow-y-auto 
           max-h-screen  no-scrollbar">
              <SideBarItems setSidebarOpen={null} />
              <div className="mt-5" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
