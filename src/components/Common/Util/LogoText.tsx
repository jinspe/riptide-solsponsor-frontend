import React from 'react';

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
        <p className=" -mt-2.5 ">S</p>
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
          <p className=" -mt-2.5 ">S</p>
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
