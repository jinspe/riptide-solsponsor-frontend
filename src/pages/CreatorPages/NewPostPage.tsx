import React from 'react';
import { Link } from 'react-router-dom';
import {
  DocumentTextIcon,
  PhotographIcon,
  VideoCameraIcon,
  LinkIcon,
  ChartBarIcon,
  VolumeUpIcon,
} from '@heroicons/react/outline';
import ClassNamesLogic from 'components/Common/Util/ClassNamesLogic';

const actions = [
  {
    title: 'Article',
    href: '/edit/article',
    icon: DocumentTextIcon,
    iconForeground: 'text-cyan-700',
    iconBackground: 'bg-cyan-50',
  },
  {
    title: 'Images',
    href: '#',
    icon: PhotographIcon,
    iconForeground: 'text-purple-700',
    iconBackground: 'bg-purple-50',
  },
  {
    title: 'Video',
    href: '#',
    icon: VideoCameraIcon,
    iconForeground: 'text-green-700',
    iconBackground: 'bg-green-50',
  },
  {
    title: 'Link',
    href: '#',
    icon: LinkIcon,
    iconForeground: 'text-yellow-700',
    iconBackground: 'bg-yellow-50',
  },
  {
    title: 'Poll',
    href: '#',
    icon: ChartBarIcon,
    iconForeground: 'text-blue-700',
    iconBackground: 'bg-blue-50',
  },
  {
    title: 'Audio',
    href: '#',
    icon: VolumeUpIcon,
    iconForeground: 'text-indigo-700',
    iconBackground: 'bg-indigo-50',
  },
];

export default function NewPostPage(): JSX.Element {
  return (
    <div className="pageFrame">
      <div
        className=" rounded-lg 
        max-w-3xl
        mx-auto
    bg-neutral-200
    dark:bg-neutral-900
    overflow-hidden 
    shadow-lg
    ">
        <div className="py-3 ">
          <p
            className="font-extrabold text-xl text-center
          text-black dark:text-neutral-200">
            Choose a type of post
          </p>
        </div>
        <div
          className=" 
            rounded-lg
            sm:divide-y-0 
            sm:grid 
            p-0.5
            sm:grid-cols-2 
            md:grid-cols-3 
            gap-px">
          {/* NFT Posts */}
          <div
            key="NFT"
            className="relative group 
              mt-0.5
              sm:mt-0
              bg-white 
              hover:bg-neutral-200
              dark:bg-neutral-800
              dark:hover:bg-neutral-700
              p-6 
             rounded-lg
             text-center
             shadow">
            <div>
              <span
                className="bg-rose-50
                    text-rose-700
                    rounded-lg inline-flex p-4 shadow-md">
                <div className="h-7 w-7  font-bold" aria-hidden="true">
                  <p className="-ml-0.5">NFT</p>
                </div>
              </span>
            </div>
            <div className="mt-8">
              <h3
                className="text-lg font-medium 
                dark:text-neutral-200
                text-black">
                <Link to="/edit/nft" className="focus:outline-none">
                  <span className="absolute inset-0" aria-hidden="true" />
                  NFT
                </Link>
              </h3>
              <p
                className="opacity-100 dark:text-neutral-200
                  text-black">
                Create a Master Edition
              </p>
            </div>
          </div>
          {/* Classic Posts */}
          {actions.map((action) => (
            <div
              key={action.title}
              className={ClassNamesLogic(
                action.href === '#' ? 'opacity-50 ' : 'opacity-100',
                'relative group mt-0.5 sm:mt-0 p-6 rounded-lg' +
                  ' text-center shadow bg-white hover:bg-neutral-200' +
                  ' dark:bg-neutral-800 dark:hover:bg-neutral-700'
              )}>
              <div>
                <span
                  className={ClassNamesLogic(
                    action.iconBackground,
                    action.iconForeground,
                    'rounded-lg inline-flex p-4 shadow-md'
                  )}>
                  <action.icon className="h-7 w-7" aria-hidden="true" />
                </span>
              </div>
              <div className="mt-8">
                <h3
                  className="text-lg font-medium 
                dark:text-neutral-100
                text-black">
                  <Link to={action.href} className="focus:outline-none">
                    <span className="absolute inset-0" aria-hidden="true" />
                    {action.title}
                  </Link>
                </h3>
                {action.href === '#' && (
                  <p
                    className="opacity-100 dark:text-neutral-200
                  text-black">
                    Comming soon!
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
