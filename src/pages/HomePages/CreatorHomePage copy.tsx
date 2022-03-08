import React, { createRef, useState } from 'react';
import * as htmlToImage from 'html-to-image';

import { useRecoilState } from 'recoil';
import QRCode from 'react-qr-code';

import bgnft from 'style/Assets/bg-nft.png';

import { LogoSmall } from 'components/Common/Util/LogoText';

import MemberCard from 'components/Creators/Membership/MemberCard';

import {
  creatorBioAtom,
  creatorDisplayNameAtom,
  creatorProfileImageAtom,
  creatorCoverImageAtom,
} from 'services/Utils/Recoil/creatorInfo';

export default function CreatorHomePage(): JSX.Element {
  const [pipo, setPipo] = useState<undefined | HTMLImageElement>(undefined);
  const [urrr, setUrr] = useState('');
  const [creatorProfileImageRecoil, setCreatorProfileImageRecoil] =
    useRecoilState(creatorProfileImageAtom);

  const onCapture = () => {
    const node = document.getElementById('popo');
    if (node) {
      htmlToImage
        .toPng(node, {
          canvasWidth: 640,
          canvasHeight: 960,
        })
        .then((dataUrl) => {
          const img = new Image();
          img.src = dataUrl;
          setUrr(dataUrl);
          /* // document.body.appendChild(img);
        setPipo(img); */
        });
    }
  };

  return (
    <div className="pageFrame">
      <div>
        <div className=" flex border border-green-200 h-96">
          <div
            className=" mx-auto
          ">
            <div id="popo" className="h-96 w-64  object-cover relative  ">
              <img
                src={bgnft}
                alt="cunt"
                className="rounded-lg h-96  absolute top-0 
                bg-gradient-to-br from-pink-500 via-purple-500 to-pink-500 p-0.5
               "
              />
              {/* <div
                className="rounded-lg h-96 w-full absolute top-0 
                bg-gradient-to-br from-indigo-300 to-purple-900 p-0.5
               ">
                <div
                  className="rounded-lg h-full w-full
                bg-gradient-to-br from-blue-300 to-blue-900 
               "
                />
              </div> */}
              <img
                src={creatorProfileImageRecoil}
                className="  rounded-lg
                absolute top-2
                w-60
                h-60
                left-1/2
                shadow-2xl
                object-cover
               transform -translate-x-1/2
               "
                alt="popo"
              />
              <div
                className="  
             font-bold text-center  
             text-sm w-full
             text-purple-50
             leading-tight
             absolute top-60
             px-2
             pt-5
             
             ">
                <p
                  className="  
                  mx-auto
                  text-clip overflow-hidden
                  drop-shadow-2xl
             ">
                  Theredaredman ydvar iationsdof Theredaredman ydvar iationsdof
                </p>
                {/* <p
                  className=" mt-2 truncate font-semibold  text-left text-neutral-300
                text-2xs">
                  By: FRvXcz7BLbc8KMyuZ9F5kgMCwuF4DJzCQSsGHc6WBLzJ{' '}
                </p> */}
              </div>

              <div
                className="  
             font-semibold text-left
             text-2xs w-full
             text-neutral-300
             
             absolute top-72
             left-1/2
             pt-6
             px-2
               transform -translate-x-1/2 
               text-clip
               drop-shadow-2xl
             ">
                <p className=" truncate pr-14">
                  By: FRvXcz7BLbc8KMyuZ9F5kgMCwuF4DJzCQSsGHc6WBLzJ{' '}
                </p>
                <p className="mt-2 ">Expires: 02/02/2022</p>
                <p className="italic break-words text-45xs mt-2 text-left">
                  FRvXcz7BLbc8KMyuZ9F5kgMCwuF4DJzCQSsGHc6WBLzJ{' '}
                </p>
                <p className="italic break-words text-45xs text-left">
                  Minter: FRvXcz7BLbc8KMyuZ9F5kgMCwuF4DJzCQSsGHc6WBLzJ{' '}
                </p>
              </div>
              <div
                className="absolute bottom-5
             right-2 shadow-2xl  
             bg-gradient-to-br from-pink-500 via-purple-500 to-pink-500 p-px">
                <QRCode
                  value="https://tailwindcss.com/docs/gradient-color-stops"
                  size={50}
                />
              </div>
            </div>
            {/* <div className="relative border border-red-500 bg-white">
            <img
              src={creatorProfileImageRecoil}
              className=" absolute top-0 border bg-white h-14"
              alt="popo"
            />
            <p
              className=" border absolute  top-1/2 left-1/2
               transform -translate-x-1/2 translate-y-1/2
             font-bold">
              Title
            </p>
          </div> */}
          </div>
        </div>
      </div>
      <h1
        className=" 
      font-extrabold text-transparent bg-clip-text bg-gradient-to-r 
      from-pink-100 to-red-600">
        Hello, world!
      </h1>
      <button
        type="button"
        className="button-action mt-32"
        onClick={() => onCapture()}>
        saaa
      </button>
      <div className="">
        <img src={urrr} className=" mx-auto " alt="urr" />
      </div>
      <p> Card with stats</p>
      <p> Card with actions</p>
      <p> their profile page</p>

      <div className="mt-10 mb-10  ">
        <div className="transform scale-150 mx-auto  flex items-center">
          <LogoSmall />
        </div>
      </div>
    </div>
  );
}
