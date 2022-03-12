import React from 'react';
import { Link } from 'react-router-dom';

export default function NoMembershipFeed(): JSX.Element {
  return (
    <div className="my-14 p-2.5">
      <div
        className="text-lg font-bold text-center
  text-black
  dark:text-neutral-100">
        You currently sponsor no creators
      </div>
      <div className=" overflow-hidden">
        <p
          className=" mt-3 w-min mx-auto text-2xl font-extrabold 
          text-transparent bg-clip-text
             bg-gradient-to-br from-cyan-400 to-cyan-700 truncate
             text-center">
          Explore !
        </p>
      </div>
      <div className="mx-auto mt-2 text-center">
        <Link
          to="/search?c="
          className="  text-lg font-medium 
                text-cyan-600 hover:text-cyan-500 text-center mx-auto">
          Discover new creators <span aria-hidden="true"> &rarr;</span>
        </Link>
      </div>
      {/* <div className="flex justify-center">
        <button
          type="button"
          className="text-base font-medium 
  text-center mx-auto mt-2
          text-cyan-600 hover:text-cyan-500">
          Get a membership<span aria-hidden="true"> &rarr;</span>
        </button>
      </div> */}
    </div>
  );
}
