import React from 'react';
import { Link } from 'react-router-dom';
import {
  DocumentTextIcon,
  PhotographIcon,
  VideoCameraIcon,
  LinkIcon,
  ChartBarIcon,
  VolumeUpIcon,
  CurrencyDollarIcon,
} from '@heroicons/react/outline';
import ClassNamesLogic from 'components/Common/Util/ClassNamesLogic';

import 'style/Components/Posts/posttypecolors.css';

const classicPosts = [
  {
    title: 'Article',
    href: '/drafts/article',
    icon: DocumentTextIcon,
    iconColor: 'color-article',
  },
  {
    title: 'Images',
    href: '#',
    icon: PhotographIcon,
    iconColor: 'color-images',
  },
  {
    title: 'Video',
    href: '#',
    icon: VideoCameraIcon,
    iconColor: 'color-video',
  },
  {
    title: 'Link',
    href: '#',
    icon: LinkIcon,
    iconColor: 'color-link',
  },
  {
    title: 'Poll',
    href: '#',
    icon: ChartBarIcon,
    iconColor: 'color-poll',
  },
  {
    title: 'Audio',
    href: '#',
    icon: VolumeUpIcon,
    iconColor: 'color-audio',
  },
];

export default function NewPostPage(): JSX.Element {
  return (
    <div className="pageFrame">
      <div
        className=" rounded-lg 
        max-w-4xl
        mx-auto
    bg-neutral-200
    dark:bg-neutral-900
    overflow-hidden 
    shadow-lg mb-5">
        <div className="max-w-3xl mb-8 mx-auto">
          <div className="py-3 ">
            <p className="mt-1 page-title ">New Post</p>
            <p className=" mt-1 page-title ">Choose a type of post</p>
          </div>
          {/* Classic Posts */}
          <div
            className=" 
            rounded-lg
            sm:divide-y-0 
            grid 
            p-0.5
            mt-2
            sm:grid-cols-2 
            md:grid-cols-3 
            gap-0.5">
            {classicPosts.map((action) => (
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
                    className={`${action.iconColor}  rounded-lg inline-flex p-4 shadow-md`}>
                    <action.icon className="h-7 w-7" aria-hidden="true" />
                  </span>
                </div>
                <div className="mt-8">
                  <h3 className="text-lg font-medium text-primary">
                    <Link to={action.href} className="focus:outline-none">
                      <span className="absolute inset-0" aria-hidden="true" />
                      {action.title}
                    </Link>
                  </h3>
                  {action.href === '#' && (
                    <p
                      className="opacity-100 dark:text-neutral-200
                  text-black">
                      Coming soon!
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="py-3">
            <p className=" mt-8 page-title ">Smart Posts</p>
          </div>
          {/* Smart Posts */}
          <div className="space-y-0.5 p-0.5 mt-2 ">
            {/* NFT Auction */}
            <div
              key="NFT"
              className="  
              mt-0.5
              sm:mt-0
              bg-white 
              hover:bg-neutral-200
              dark:bg-neutral-800
              dark:hover:bg-neutral-700
              py-6 px-4 sm:px-6 
             rounded-lg
             text-center
             shadow
             opacity-100 
             ">
              <div className="sm:flex items-center justify-around">
                {/* Logo */}
                <div className=" ">
                  <div>
                    <span
                      className="color-nft-auction
                    rounded-lg inline-flex p-4 shadow-md">
                      <div className="h-7 w-7 font-bold" aria-hidden="true">
                        <p className="">NFT</p>
                      </div>
                    </span>
                  </div>
                  <div className="mt-8">
                    <h3
                      className="text-lg font-medium 
                text-primary">
                      <div className="focus:outline-none">
                        <span className="" aria-hidden="true" />
                        NFT Auction
                      </div>
                    </h3>
                  </div>
                </div>
                <div
                  className="text-primary text-left sm:w-2/3
               mt-2 sm:mt-0 px-5  pl-7 sm:px-1">
                  <p>
                    Create a NFT Auction, we will support three types of
                    auctions:
                  </p>
                  <ul className="list-disc list-inside mt-0.5">
                    <li>
                      Open Editions: Your sponsors will be able to print as many
                      as they want.
                    </li>
                    <li>
                      Limited Editions: Create or use a master edition NFT and
                      sell a set amount of copies.
                    </li>
                    <li>Single Items: Sell normal NFTs and re-sell prints.</li>
                  </ul>

                  <div className="flex items-baseline gap-1">
                    <p className="font-bold">Reference:</p>
                    <a
                      href="https://docs.metaplex.com/storefront/auction"
                      className="mt-1 text-cyan-700 underline italic break-all">
                      https://docs.metaplex.com/storefront/auction
                    </a>
                  </div>
                </div>
              </div>
              <p
                className="opacity-100 dark:text-neutral-200
                  text-black mt-3">
                Coming soon!
              </p>
            </div>
            {/* Fund raising */}
            <div
              key="Fund"
              className="  
              mt-0.5
              sm:mt-0
              bg-white 
              hover:bg-neutral-200
              dark:bg-neutral-800
              dark:hover:bg-neutral-700
              p-6 
             rounded-lg
             text-center
             shadow
             opacity-100 
             ">
              <div className="sm:flex items-center justify-around">
                {/* Logo */}
                <div className=" ">
                  <div>
                    <span
                      className=" color-fund-raising
                  rounded-lg inline-flex p-4 shadow-md">
                      <CurrencyDollarIcon
                        className="h-7 w-7"
                        aria-hidden="true"
                      />
                    </span>
                  </div>
                  <div className="mt-8">
                    <h3
                      className="text-lg font-medium 
                    text-primary">
                      <div className="focus:outline-none">
                        <span className="" aria-hidden="true" />
                        Fund Raising
                      </div>
                    </h3>
                  </div>
                </div>
                <div
                  className="text-primary text-left sm:w-2/3
               mt-2 sm:mt-0 px-5 sm:px-1">
                  <p>
                    Raise funds for a project or a charity.
                    <br />
                    We will implement a contract that will let you receive funds
                    for a project. <br />
                    You will have the option the send back SOLs to the sponsors
                    who participated.
                    <br /> For example if you have a project and need financing
                    you can redistribute the profits.
                  </p>
                </div>
              </div>
              <p
                className="opacity-100 dark:text-neutral-200
                  text-black mt-3">
                Coming soon!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
