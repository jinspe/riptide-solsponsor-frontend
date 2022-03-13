import React from 'react';
import QRCode from 'react-qr-code';
import bgnft from 'style/Assets/bg-nft.png';

type TmembershipCard = {
  title: string;
  image: string;
  userName: string;
  displayName: string;
  expiration: string;
  creatorKey: string;
  minterKey: string;
  idx: string;
};
export default function MemberCard({
  title,
  image,
  userName,
  displayName,
  expiration,
  creatorKey,
  minterKey,
  idx,
}: TmembershipCard): JSX.Element {
  return (
    <div className={`w-fit h-fit `}>
      <div id={idx} className="h-96 w-64 object-cover relative  ">
        <img
          src={bgnft}
          alt="cunt"
          className="rounded-lg h-96  absolute top-0 
                bg-gradient-to-br from-pink-500 via-purple-500 to-pink-500 p-1
               "
        />

        <img
          src={image}
          style={{ height: '61%' }}
          className="  rounded-lg
                absolute top-10
                w-11/12
                bg-gradient-to-br from-purple-400 via-purple-700 to-purple-400 p-px
                left-1/2
                shadow-2xl
                object-cover
               transform -translate-x-1/2
               "
          alt="popo"
        />
        <div
          style={{ height: '10%' }}
          className="  
             font-bold text-center  
             text-sm w-full
             text-purple-50
             absolute top-0
             px-2
             pt-2
             ">
          <p
            style={{ height: '100%' }}
            className="  
            text-center
            mx-auto
            leading-loose
                  m-auto
                  text-clip overflow-hidden
                  drop-shadow-2xl
                  break-words
             ">
            {title}
          </p>
        </div>
        <div
          style={{ bottom: '6.3rem' }}
          className="  
             font-semibold   
             text-45xs 
             leading-tight
             absolute 
             right-3
             
             ">
          <p className="italic underline text-neutral-300">solsponsor.com</p>
        </div>

        <div
          className="  
             font-semibold text-left
             text-2xs w-full
             text-neutral-300
             absolute top-3/4
             left-1/2
             pt-1
             px-3
               transform -translate-x-1/2 
               text-clip
               drop-shadow-2xl
             ">
          <p className=" truncate pr-14">By: {displayName}</p>
          <p className=" truncate pr-14"> c/{userName}</p>
          <p className="mt-2.5 ">Expires: {expiration}</p>
          <p className="italic break-words text-45xs mt-2.5 text-left">
            Creator: {creatorKey}
          </p>
          <p className="italic break-words text-45xs text-left">
            Minter: {minterKey}
          </p>
        </div>
        <div
          className="absolute bottom-10
             right-2.5 shadow-2xl  
             bg-gradient-to-br from-pink-500 via-purple-500 to-pink-500 p-px">
          <QRCode value={`https://solsponsor/c/${userName}.com`} size={50} />
        </div>
      </div>
    </div>
  );
}
