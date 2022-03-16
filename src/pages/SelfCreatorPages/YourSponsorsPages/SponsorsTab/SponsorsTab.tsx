import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useRecoilState } from 'recoil';
import { UserCircleIcon, MailIcon } from '@heroicons/react/outline';

import { getMembers } from 'services/Firebase/GetData/MembersUtil';
import { creatorMembersAtom } from 'services/Utils/Recoil/creatorInfo';

import Spinner from 'components/Common/Util/Spinner';

import { Iuser } from 'types/types';

import NoSponsorsSection from './NoSponsorsSection';

export default function SponsorsTab(): JSX.Element {
  const [memberLoading, setMemberLoading] = useState(true);

  const [memberListRecoil, setMemberListRecoil] =
    useRecoilState(creatorMembersAtom);
  const [memberListSubset, setMemberListSubset] = useState<Iuser[]>([]);
  const [memberSearch, setMemberSearch] = useState('');

  async function createMemberList() {
    setMemberLoading(true);
    if (memberListRecoil.length === 0) {
      try {
        const fetchedMemberList = await getMembers();
        setMemberListRecoil(fetchedMemberList);
        setMemberListSubset(fetchedMemberList);
      } catch (error: any) {
        toast.error(error?.message);
      }
    } else {
      setMemberListSubset(memberListRecoil);
      setMemberSearch('');
    }
    setMemberLoading(false);
  }

  useEffect(() => {
    createMemberList();
  }, []);

  function memberListSearchResults(value: string) {
    setMemberSearch(value);
    setMemberListSubset(
      memberListRecoil.filter(
        (member) =>
          (member.displayName?.toLowerCase().indexOf(value.toLowerCase()) !==
            -1 ??
            false) ||
          (member.uId?.toLowerCase().indexOf(value.toLowerCase()) !== -1 ??
            false)
      )
    );
  }
  return (
    <div>
      {memberLoading && (
        <div
          className="flex justify-center my-20
         spinner-color">
          <Spinner classExtend="h-14" />
        </div>
      )}
      {!memberLoading && memberListRecoil.length === 0 && <NoSponsorsSection />}
      {!memberLoading && memberListRecoil.length > 0 && (
        <div className="my-5 max-w-3xl mx-auto">
          <div className="max-w-md mx-auto mt-2 px-4">
            <p
              className="mt-4 text-sm text-secondary text-left
           pl-2">
              Search sponsors by name or publickey
            </p>
            <div className="flex mt-1 mb-8 ">
              <input
                id="search"
                name="search"
                className="block w-full px-4 py-1  
                    rounded-lg  
                    placeholder-neutral-500
                    dark:placeholder-neutral-400
                    bg-neutral-100
                    dark:bg-neutral-950
                    text-input-field
                    "
                placeholder="Search"
                type="search"
                value={memberSearch}
                onChange={(e) => memberListSearchResults(e.target.value)}
              />
            </div>
          </div>
          {memberListSubset.map((el) => (
            <div key={el.uId}>
              <div className="px-4 mt-0.5">
                <div className="border-b border-neutral-500" />
              </div>
              <div className="flex justify-between items-center">
                <div className=" p-3 flex items-center gap-2 truncate">
                  {el.profileImage === '' || el.profileImage === undefined ? (
                    <UserCircleIcon className=" h-20 w-20 mx-auto" />
                  ) : (
                    <img
                      className="h-16 w-16 mx-auto rounded-full"
                      src={el.profileImage}
                      alt=""
                    />
                  )}
                  <div
                    className="block py-1 px-3 
            w-full truncate -mb-1">
                    <p
                      className="text-primary 
          text-base font-bold truncate ">
                      {el.displayName}
                    </p>
                    <p
                      className=" mt-0.5 truncate
                      text-neutral-500
                      text-xs font-medium">
                      {el.uId}
                    </p>
                  </div>
                </div>
                <div>
                  <div className=" transform scale-75">
                    <p
                      className="font-semibold 
                    text-neutral-800 text-left px-1
                    dark:text-neutral-300 flex">
                      Coming soon!
                    </p>
                    <div className="opacity-50">
                      <button
                        type="button"
                        className="inline-flex justify-center 
                        px-4 py-2 
                    border border-neutral-300 dark:border-neutral-800
                    shadow-sm text-sm font-medium rounded-md 
                    text-neutral-700 dark:text-neutral-300
                    bg-white 
                    hover:bg-neutral-100 
                    dark:bg-neutral-700 
                    dark:hover:bg-neutral-600 
                    focus:outline-none 
                    focus:ring-2 focus:ring-offset-2 
                    focus:ring-cyan-600">
                        <MailIcon
                          className="-ml-1 mr-2 h-5 w-5 text-neutral-500"
                          aria-hidden="true"
                        />
                        <span>Message</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
