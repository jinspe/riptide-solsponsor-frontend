import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SearchIcon } from '@heroicons/react/solid';

export default function SearchPage(): JSX.Element {
  const [searchParams, setSearchParams] = useSearchParams({});

  const [search, setSearch] = useState(searchParams.get('c') ?? '');

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSearchParams({ c: search });
  }

  useEffect(() => {
    setSearch(searchParams.get('c') ?? '');
  }, [searchParams]);

  return (
    <div className="pageFrame">
      {/* SearchBar */}
      <div className="max-w-xl mt-2 mx-auto">
        <form
          className="flex items-center gap-2 "
          onSubmit={(e) => handleSubmit(e)}>
          <div className="relative w-full">
            <div
              className="absolute inset-y-0 left-0 pl-3 flex
             items-center pointer-events-none">
              <SearchIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </div>
            <input
              id="search"
              name="search"
              className="block w-full pl-10 pr-3 py-1.5  
                    rounded-lg  
                    placeholder-neutral-500
                    dark:placeholder-neutral-400
                    bg-neutral-100
                    dark:bg-neutral-950
                    text-input-field
                    text-lg
                    h-11
                    "
              placeholder="Search"
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="  px-1 
            button-action
            h-11
            text-lg
             ">
            Search
          </button>
        </form>
      </div>
      <div className="max-w-xl mt-2 mx-auto">SearchPage</div>
      <p>{searchParams.get('c')}</p>
    </div>
  );
}
