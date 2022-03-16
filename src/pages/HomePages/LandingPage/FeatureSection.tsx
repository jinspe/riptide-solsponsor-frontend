import React from 'react';

import feature1 from 'style/Assets/LandingPage/feature1.png';
import feature2 from 'style/Assets/LandingPage/feature2.png';

import {
  SparklesIcon,
  FingerPrintIcon,
  ExternalLinkIcon,
  DocumentAddIcon,
  ChipIcon,
  CloudUploadIcon,
} from '@heroicons/react/outline';

const monetizeFeatures = [
  {
    id: 1,
    name: 'NFT Membership cards',
    description:
      'Sponsors have the option to mint a NFT ' +
      'which will have your information on it as ' +
      'well as a history of transactions they have made with you.',
    icon: SparklesIcon,
  },
  {
    id: 2,
    name: 'Wallet authentication',
    description:
      'Your account is secured with our wallet authentication mechanism, ' +
      'contents and memberships are linked to your public key ' +
      'and accessed after a wallet signature.',
    icon: FingerPrintIcon,
  },
  {
    id: 3,
    name: 'Export your sponsors',
    description:
      'The memberships are simple A to B transactions you just have to ' +
      'query your transactions ' +
      'on Solana to fetch your sponsors, they can also submit their NFTs from ' +
      'which you can verify the transactions signatures.',
    icon: ExternalLinkIcon,
  },
];
const communicationFeatures = [
  {
    id: 1,
    name: 'Media posts',
    description:
      'We support or will support any type of posts: articles with our rich text editor' +
      ', images where you can create a carousel of pictures, videos, links, polls to ' +
      "get your sponsor's opinion and audio for music or podcasts.",
    icon: DocumentAddIcon,
  },
  {
    id: 2,
    name: 'Smart posts',
    description:
      'We support or will support two types of smart posts, NFT auctions' +
      ' where you will be able to sell exclusive NFTs using the Metaplex NFT auction sales' +
      ' tool and Fundraising were you will be able to raise funds for a project and also ' +
      'give back to the sponsors who participated.',
    icon: ChipIcon,
  },
  {
    id: 3,
    name: 'Upload any file',
    description:
      'You can attach any files to your posts,' +
      ' your files are secured and only accessible by your sponsors.',
    icon: CloudUploadIcon,
  },
];

export default function FeatureSection(): JSX.Element {
  return (
    <div className=" pb-16 mx-auto overflow-hidden">
      <div className="relative max-w-xl mx-auto px-4 sm:px-6 lg:px-8 lg:max-w-7xl">
        <svg
          className="hidden lg:block absolute left-full transform -translate-x-1/2 -translate-y-1/4"
          width={404}
          height={784}
          fill="none"
          viewBox="0 0 404 784"
          aria-hidden="true">
          <defs>
            <pattern
              id="b1e6e422-73f8-40a6-b5d9-c8586e37e0e7"
              x={0}
              y={0}
              width={20}
              height={20}
              patternUnits="userSpaceOnUse">
              <rect
                x={0}
                y={0}
                width={4}
                height={4}
                className="text-neutral-300 dark:text-neutral-700"
                fill="currentColor"
              />
            </pattern>
          </defs>
          <rect
            width={404}
            height={784}
            fill="url(#b1e6e422-73f8-40a6-b5d9-c8586e37e0e7)"
          />
        </svg>

        <div className="relative">
          <h2
            className="text-center text-3xl leading-8 font-extrabold tracking-tight 
          text-primary sm:text-4xl">
            On a mission to empower creators
          </h2>
          <p className="mt-4 max-w-3xl mx-auto text-center text-xl text-secondary">
            Utilize the power of the Solana ecosystem to create smart posts,
            engage with your fans and monetize your skills.
          </p>
        </div>

        <div className="relative mt-12 lg:mt-24 lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
          <div className="relative">
            <h3 className="text-2xl font-extrabold text-primary tracking-tight sm:text-3xl">
              Monetize your skills with solana.
            </h3>
            <p className="mt-3 text-lg text-secondary">
              Solana is the fastest blockchain in the world and the fastest
              growing ecosystem in crypto, with thousands of projects spanning
              DeFi, NFTs, Web3 and more. A transaction on-chain costs only a
              fraction of a cent. This is the ecosystem in which you want to
              build your audience.
            </p>

            <dl className="mt-10 space-y-10">
              {monetizeFeatures.map((item) => (
                <div key={item.id} className="relative">
                  <dt>
                    <div
                      className="absolute flex items-center justify-center h-12 w-12 
                    rounded-md bg-gradient-to-br from-cyan-400 to-indigo-800 text-white">
                      <item.icon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <p className="ml-16 text-lg leading-6 font-medium text-primary">
                      {item.name}
                    </p>
                  </dt>
                  <dd className="mt-2 ml-16 text-base text-secondary">
                    {item.description}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="mt-10 -mx-4 relative lg:mt-0" aria-hidden="true">
            <svg
              className="absolute left-1/2 transform -translate-x-1/2 translate-y-16 lg:hidden"
              width={784}
              height={404}
              fill="none"
              viewBox="0 0 784 404">
              <defs>
                <pattern
                  id="ca9667ae-9f92-4be7-abcb-9e3d727f2941"
                  x={0}
                  y={0}
                  width={20}
                  height={20}
                  patternUnits="userSpaceOnUse">
                  <rect
                    x={0}
                    y={0}
                    width={4}
                    height={4}
                    className="text-neutral-300 dark:text-neutral-700"
                    fill="currentColor"
                  />
                </pattern>
              </defs>
              <rect
                width={784}
                height={404}
                fill="url(#ca9667ae-9f92-4be7-abcb-9e3d727f2941)"
              />
            </svg>
            <img
              className="relative mx-auto rounded-xl shadow-2xl"
              width={490}
              src={feature1}
              alt=""
            />
          </div>
        </div>

        <svg
          className="hidden lg:block absolute right-full transform translate-x-1/2 translate-y-12"
          width={404}
          height={784}
          fill="none"
          viewBox="0 0 404 784"
          aria-hidden="true">
          <defs>
            <pattern
              id="64e643ad-2176-4f86-b3d7-f2c5da3b6a6d"
              x={0}
              y={0}
              width={20}
              height={20}
              patternUnits="userSpaceOnUse">
              <rect
                x={0}
                y={0}
                width={4}
                height={4}
                className="text-neutral-300 dark:text-neutral-700"
                fill="currentColor"
              />
            </pattern>
          </defs>
          <rect
            width={404}
            height={784}
            fill="url(#64e643ad-2176-4f86-b3d7-f2c5da3b6a6d)"
          />
        </svg>

        <div className="relative mt-12 sm:mt-16 lg:mt-24">
          <div className="lg:grid lg:grid-flow-row-dense lg:grid-cols-2 lg:gap-8 lg:items-center">
            <div className="lg:col-start-2">
              <h3 className="text-2xl font-extrabold text-primary tracking-tight sm:text-3xl">
                Create members-only content.
              </h3>
              <p className="mt-3 text-lg text-secondary">
                Create classic or smart posts, use our tools and features to
                monetize all your creations and generate more value for your
                sponsors.
              </p>

              <dl className="mt-10 space-y-10">
                {communicationFeatures.map((item) => (
                  <div key={item.id} className="relative">
                    <dt>
                      <div
                        className="absolute flex items-center justify-center h-12 w-12 
                      rounded-md bg-gradient-to-br from-cyan-400 to-indigo-800 text-white">
                        <item.icon className="h-6 w-6" aria-hidden="true" />
                      </div>
                      <p className="ml-16 text-lg leading-6 font-medium text-primary">
                        {item.name}
                      </p>
                    </dt>
                    <dd className="mt-2 ml-16 text-base text-secondary">
                      {item.description}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="mt-10 -mx-4 relative lg:mt-0 lg:col-start-1">
              <svg
                className="absolute left-1/2 transform -translate-x-1/2 translate-y-16 lg:hidden"
                width={784}
                height={404}
                fill="none"
                viewBox="0 0 784 404"
                aria-hidden="true">
                <defs>
                  <pattern
                    id="e80155a9-dfde-425a-b5ea-1f6fadd20131"
                    x={0}
                    y={0}
                    width={20}
                    height={20}
                    patternUnits="userSpaceOnUse">
                    <rect
                      x={0}
                      y={0}
                      width={4}
                      height={4}
                      className="text-neutral-300 dark:text-neutral-700"
                      fill="currentColor"
                    />
                  </pattern>
                </defs>
                <rect
                  width={784}
                  height={404}
                  fill="url(#e80155a9-dfde-425a-b5ea-1f6fadd20131)"
                />
              </svg>
              <img
                className="relative mx-auto rounded-xl bg-neutral-800 p-3 shadow-2xl"
                width={490}
                src={feature2}
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
