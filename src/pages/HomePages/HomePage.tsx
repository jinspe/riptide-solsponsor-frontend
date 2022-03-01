import React from 'react';
import WalletButton from 'components/SolanaWallet/WalletButton';

import InProgressApp from 'inprogress/InProgressApp';

export default function HomePage(): JSX.Element {
  return (
    <div className="pageFrame ">
      <WalletButton />
      <div className="w-min flex ">
        <p
          className=" text-3xl font-extrabold 
      text-transparent bg-clip-text bg-gradient-to-br 
      from-cyan-400 to-indigo-800 m-auto  ">
          S
        </p>
        <span
          className="inline-block text-xl font-extrabold 
        mt-auto align-text-bottom  text-transparent bg-clip-text bg-gradient-to-br 
        from-cyan-400 to-indigo-800">
          olsponsor
        </span>
      </div>
      <div className="w-min">
        <p
          className=" text-4xl font-extrabold 
      text-transparent bg-clip-text bg-gradient-to-br 
      from-cyan-500 to-blue-700">
          S
        </p>
      </div>

      <div
        className="bg-gradient-to-br 
      from-cyan-400 to-indigo-800
      flex text-center 
      py-0.5
      
      rounded-lg shadow-md w-9 h-9 p-0.5 ">
        <div
          className=" pt-0.5 text-4xl font-extrabold 
      text-transparent bg-clip-text bg-gradient-to-br
      from-indigo-400 to-cyan-100 w-7 h-7">
          <p className="-mt-2">S</p>
        </div>
      </div>

      <div
        className="bg-gradient-to-br 
      from-cyan-400 to-indigo-800
      flex 
      py-0.5
      rounded-lg shadow-2xl w-8">
        <div
          className=" text-3xl font-extrabold w-8 h-7 
      text-transparent bg-clip-text bg-gradient-to-br text-center 
      from-indigo-400 to-cyan-200 ">
          <p className=" -mt-1.5 ">S</p>
        </div>
      </div>

      <p className="text-red-500 dark:text-blue-500">Homepage</p>
      <p className="mtext-t0">Text test for colors title</p>
      <p className="mtext-t1">Text test for colors high</p>
      <p className="mtext-t2">Text test for colors medium</p>
      <p className="mtext-t3">Text test for colors low</p>

      <InProgressApp />
    </div>
  );
}
