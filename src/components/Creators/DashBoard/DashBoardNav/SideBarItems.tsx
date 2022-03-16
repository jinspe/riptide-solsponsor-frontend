import React, { Dispatch, SetStateAction } from 'react';
import {
  HomeIcon,
  UserGroupIcon,
  CogIcon,
  DocumentAddIcon,
  DocumentReportIcon,
  PencilAltIcon,
} from '@heroicons/react/outline';

import { Link, useLocation } from 'react-router-dom';

import ClassNamesLogic from 'components/Common/Util/ClassNamesLogic';

import 'style/Components/headers.css';

const navItems = [
  { name: 'Dashboard', href: '/creator-home', icon: HomeIcon },
  { name: 'New Post', href: '/new-post', icon: DocumentAddIcon },
  { name: 'Draft Posts', href: '/drafts', icon: PencilAltIcon },
  { name: 'Published Posts', href: '/published', icon: DocumentReportIcon },
  { name: 'Your Sponsors', href: '/sponsors', icon: UserGroupIcon },
  { name: 'Settings', href: '/settings', icon: CogIcon },
];

type IsideBarItems = {
  setSidebarOpen: Dispatch<SetStateAction<boolean>> | null;
};

export default function SideBarItems({
  setSidebarOpen,
}: IsideBarItems): JSX.Element {
  const location = useLocation();

  return (
    <nav aria-label="Sidebar" className="mt-3">
      {/* <div
        className="px-2 py-0 rounded-md text-left pl-14 
      text-neutral-500 text-lg font-semibold">
        Creator Manager
      </div> */}
      <div className="px-2 space-y-1 mt-2">
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.href}
            className={ClassNamesLogic(
              location.pathname.startsWith(item.href)
                ? 'side-items-bg-active'
                : 'side-items-bg-hover ',
              'group flex items-center px-2 py-3 rounded-md side-items-text'
            )}
            onClick={() => {
              if (setSidebarOpen) setSidebarOpen(false);
            }}>
            <item.icon
              className={ClassNamesLogic(
                location.pathname.startsWith(item.href)
                  ? 'side-items-text-color'
                  : 'side-icons-inactive side-icons-hover',
                'mr-4 side-icons-size'
              )}
              aria-hidden="true"
            />
            {item.name}
          </Link>
        ))}
      </div>
    </nav>
  );
}
