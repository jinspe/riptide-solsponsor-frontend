import React, { useState } from 'react';
import {
  CalendarIcon,
  HomeIcon,
  MapIcon,
  MenuIcon,
  SearchCircleIcon,
  SpeakerphoneIcon,
  UserGroupIcon,
  XIcon,
} from '@heroicons/react/outline';

import { Link, useLocation } from 'react-router-dom';

import ClassNamesLogic from 'components/Common/Util/ClassNamesLogic';

import 'style/Components/headers.css';

const navigation = [
  { name: 'Dashboard', href: '/creator-home', icon: HomeIcon, current: true },
  { name: 'Calendar', href: '#', icon: CalendarIcon, current: false },
  { name: 'Teams', href: '#', icon: UserGroupIcon, current: false },
  { name: 'Directory', href: '#', icon: SearchCircleIcon, current: false },
  { name: 'Announcements', href: '#', icon: SpeakerphoneIcon, current: false },
  { name: 'Office Map', href: '#', icon: MapIcon, current: false },
];

const postItems = [
  { name: 'New Post', href: '/new-post' },
  { name: 'Drafts', href: '/drafts' },
  { name: 'Published', href: '/published' },
];

export default function SideBarItems(): JSX.Element {
  const location = useLocation();
  const [current, setCurrent] = useState('dashboard');
  const [postExtended, setPostExtended] = useState(false);
  const [toggle, setToggle] = useState(false);

  return (
    <nav aria-label="Sidebar" className="mt-5">
      <div className="px-2 space-y-1">
        <Link
          to="/creator-home"
          className={ClassNamesLogic(
            location.pathname === '/creator-home'
              ? 'side-items-bg-active'
              : 'side-items-bg-hover ',
            'group flex items-center px-2 py-2 rounded-md side-items-text'
          )}
          onClick={() => {
            setPostExtended(false);
          }}
          aria-hidden="true">
          <HomeIcon
            className={ClassNamesLogic(
              current === 'dashboard'
                ? 'side-items-text-color'
                : 'side-icons-inactive side-icons-hover',
              'mr-4 side-icons-size'
            )}
            aria-hidden="true"
          />
          Dashboard
        </Link>
        <button
          type="button"
          className="side-items-bg-hover 
          group flex items-center 
          w-full px-2 py-2 rounded-md 
          side-items-text"
          onClick={() => {
            setPostExtended(!postExtended);
          }}>
          <HomeIcon
            className={ClassNamesLogic(
              postItems.map(({ href }) => href).includes(location.pathname)
                ? 'side-items-text-color'
                : 'side-icons-inactive side-icons-hover',
              'mr-4 side-icons-size'
            )}
            aria-hidden="true"
          />
          Posts
        </button>
        <div
          className={ClassNamesLogic(
            postExtended ||
              postItems.map(({ href }) => href).includes(location.pathname)
              ? 'h-32 '
              : ' h-0 ',
            'overflow-auto no-scrollbar space-y-1 pl-6 ' +
              ' transition-max-height duration-700 ease-in-out' +
              ' side-items-text'
          )}>
          {postItems.map((item) => (
            <div
              key={item.name}
              className={ClassNamesLogic(
                location.pathname === item.href
                  ? 'side-items-bg-active'
                  : 'side-items-bg-hover ',
                'py-2 rounded-md '
              )}>
              <Link to={item.href} className="">
                <p className="pl-8">{item.name}</p>
              </Link>
            </div>
          ))}
        </div>

        <Link
          to="/community"
          className={ClassNamesLogic(
            location.pathname === '/community'
              ? 'side-items-bg-active'
              : 'side-items-bg-hover ',
            'group flex items-center px-2 py-2 rounded-md side-items-text'
          )}
          onClick={() => {
            setPostExtended(false);
          }}>
          <HomeIcon
            className={ClassNamesLogic(
              current === 'dashboard'
                ? 'side-items-text-color'
                : 'side-icons-inactive side-icons-hover',
              'mr-4 side-icons-size'
            )}
            aria-hidden="true"
          />
          Community
        </Link>

        <Link
          to="/settings"
          className={ClassNamesLogic(
            location.pathname === '/community'
              ? 'side-items-bg-active'
              : 'side-items-bg-hover ',
            'group flex items-center px-2 py-2 rounded-md side-items-text'
          )}
          onClick={() => {
            setPostExtended(false);
          }}>
          <HomeIcon
            className={ClassNamesLogic(
              current === 'dashboard'
                ? 'side-items-text-color'
                : 'side-icons-inactive side-icons-hover',
              'mr-4 side-icons-size'
            )}
            aria-hidden="true"
          />
          Settings
        </Link>

        {/* {navigation.map((item) => (
          <a
            key={item.name}
            href={item.href}
            className={ClassNamesLogic(
              item.current ? 'side-items-bg-active' : 'side-items-bg-hover ',
              'group flex items-center px-2 py-2' +
                '  rounded-md side-items-text'
            )}>
            <item.icon
              className={ClassNamesLogic(
                item.current
                  ? 'side-items-text-color'
                  : 'side-icons-inactive side-icons-hover',
                'mr-4 side-icons-size'
              )}
              aria-hidden="true"
            />
            {item.name}
          </a>
        ))} */}
        {/* <div>
          <button type="button" onClick={() => setToggle(!toggle)}>
            toggle
          </button>
          <div
            className={ClassNamesLogic(
              toggle ? 'h-0' : ' h-12 ',
              'overflow-auto transition-max-height duration-700 ease-in-out'
            )}>
            <p>some moteh text</p>
          </div>
        </div> */}
      </div>
    </nav>
  );
}
