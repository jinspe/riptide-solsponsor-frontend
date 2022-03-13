import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { SearchIcon } from '@heroicons/react/solid';
import { queryCreators } from 'services/Firebase/GetData/CreatorUtils';
import { Icreator } from 'types/types';
import { toast } from 'react-toastify';

import Spinner from 'components/Common/Util/Spinner';

export default function SearchPage(): JSX.Element {
  const [searchParams, setSearchParams] = useSearchParams({});

  const [search, setSearch] = useState(searchParams.get('c') ?? '');
  const [creatorList, setCreatorList] = useState<Icreator[]>([]);

  const [searchLoading, setSearchLoading] = useState(true);

  async function searchCreator(searchT: string) {
    try {
      setSearchLoading(true);
      setCreatorList(await queryCreators(searchT));
      setSearchLoading(false);
    } catch (error: any) {
      toast.error(error?.message);
      setSearchLoading(false);
    }
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSearchParams({ c: search });
    searchCreator(search);
  }

  useEffect(() => {
    const param = searchParams.get('c') ?? '';
    setSearch(param);
    searchCreator(param);
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
              autoComplete="off"
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
            className="  px-3 
            button-action
            h-11
            text-lg
             ">
            Search
          </button>
        </form>
      </div>
      <div className="max-w-xl mt-5 mx-auto">
        {searchLoading && (
          <div className="mx-auto flex justify-center my-10">
            <Spinner classExtend="h-12 spinner-color " />
          </div>
        )}
        {!searchLoading &&
          creatorList.length > 0 &&
          creatorList.map((el) => (
            <div
              key={el.uId}
              className="border-b border-neutral-400
          dark:border-neutral-600">
              <Link to={`/c/${el.userName}`}>
                <div
                  className=" my-6 py-6 px-5 flex items-center rounded-lg dark:hover:bg-neutral-700 
      hover:bg-neutral-200">
                  <img
                    className="h-20 w-20 mx-auto rounded-full"
                    src={el.profileImage}
                    alt=""
                  />
                  <div
                    className="block py-1 px-3 
            w-full truncate -mb-1">
                    <p
                      className="text-neutral-900 dark:text-neutral-100 
          text-lg font-bold truncate ">
                      {el.displayName}
                    </p>
                    <p
                      className=" truncate
                    text-neutral-800 dark:text-neutral-200 
                      text-base font-medium">
                      {el.tags?.join(',')}
                    </p>
                    <p
                      className=" truncate
                      text-neutral-500
                      text-base font-medium">
                      c/{el.userName}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        {!searchLoading && creatorList.length === 0 && (
          <div className="mx-auto  text-center my-10">
            <p
              className="text-neutral-900 dark:text-neutral-100 
          text-base font-semibold">
              No result, try something else
            </p>
            <p
              className="text-neutral-500
          text-sm font-semibold mt-2">
              you can try Art, Nft, podcast for example
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
