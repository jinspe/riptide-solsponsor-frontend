import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { SearchIcon } from '@heroicons/react/solid';

export default function NavSearchBar(): JSX.Element {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (search !== '') {
      navigate(`/search?c=${search}`);
      setSearch('');
    }
  }

  return (
    <div className="max-w-md w-full  ">
      <form className="flex relative " onSubmit={(e) => handleSubmit(e)}>
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
          autoComplete="off"
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          type="submit"
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
      </form>
    </div>
  );
}
