import React from 'react';

/* <span className="inline-flex rounded-lg border text-center h-8 w-8">
      <p
        className=" text-4xl font-extrabold 
      text-transparent bg-clip-text bg-gradient-to-br 
      from-cyan-400 to-indigo-800   ">
        S
      </p>
    </span> */
export function LogoSmall(): JSX.Element {
  return (
    <div
      className="bg-gradient-to-br 
      from-cyan-400 to-indigo-800
      flex 
      py-0.5
      rounded-lg shadow-2xl ">
      <div
        className=" text-3xl font-extrabold w-8 h-7 
      text-transparent bg-clip-text bg-gradient-to-br text-center 
      from-indigo-400 to-cyan-200 ">
        <p className=" -mt-1.5 ">S</p>
      </div>
    </div>
  );
}

export function LogoLarge(): JSX.Element {
  return (
    <div className="flex">
      <div
        className="bg-gradient-to-br 
      from-cyan-400 to-indigo-800
      flex 
      py-0.5
      rounded-lg shadow-2xl ">
        <div
          className=" text-3xl font-extrabold w-8 h-7 
      text-transparent bg-clip-text bg-gradient-to-br text-center 
      from-indigo-400 to-cyan-200 ">
          <p className=" -mt-1.5 ">S</p>
        </div>
      </div>
      <p
        className="font-extrabold text-lg ml-2 mt-0.5 
      text-black dark:text-neutral-100">
        Solsponsor
      </p>
    </div>
  );
}

/*
<div className="w-min flex">
      <p
        className=" text-3xl font-extrabold 
      text-transparent bg-clip-text bg-gradient-to-br 
      from-cyan-400 to-indigo-800 m-auto  ">
        S
      </p>
      <span
        className="inline-block text-xl font-extrabold 
        mt-auto align-text-bottom 
        text-transparent bg-clip-text 
        bg-gradient-to-br 
        from-cyan-400 to-indigo-800">
        olsponsor
      </span>
    </div>
*/
