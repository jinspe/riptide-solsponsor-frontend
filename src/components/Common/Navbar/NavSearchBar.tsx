import React from 'react';
import { SearchIcon } from '@heroicons/react/solid';

export default function NavSearchBar(): JSX.Element {
  return (
    <div className="max-w-md w-full  ">
      <div className="flex relative ">
        <input
          id="search"
          name="search"
          className="block w-full pl-3 pr-10 py-1.5  
                    rounded-lg  
                    placeholder-neutral-500
                    dark:placeholder-neutral-400
                    bg-neutral-100
                    dark:bg-neutral-950
                    text-input-field
                    "
          placeholder="Search"
          type="search"
        />
        <button
          onClick={() => console.log('doThat')}
          type="button"
          className="absolute right-0 px-1 
            h-full
            bg-neutral-200
            dark:bg-neutral-800
            border 
            border-neutral-400
            dark:border-neutral-600
            rounded-lg rounded-l-none
            flex items-center ">
          <SearchIcon
            className="h-5 w-5 
            text-neutral-500 
            hover:text-neutral-800
            dark:text-neutral-400 
            dark:hover:text-neutral-200"
          />
        </button>
      </div>
    </div>
  );
}
