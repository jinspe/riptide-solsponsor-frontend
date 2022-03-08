import React, { useState } from 'react';

import { useRecoilValue, useRecoilState } from 'recoil';

import { usernameIsValid } from 'services/Utils/Functions/FileVerification';

import { checkUserNameExist } from 'services/Firebase/GetData/CreatorUtils';

import { toast } from 'react-toastify';
import Spinner from 'components/Common/Util/Spinner';

import { UpdateUserName } from 'services/Firebase/CloudFunctions/CreatorFunctions';

import { userPublicKeyAtom } from 'services/Utils/Recoil/userInfo';

import { creatorUserNameAtom } from 'services/Utils/Recoil/creatorInfo';

import 'style/Components/creator.css';

const USERNAMEMAXLENGTH = 40;
const USERNAMEMINLENGTH = 3;

/* eslint-disable jsx-a11y/label-has-associated-control */

export default function UserNameSetting(): JSX.Element {
  const publicKey = useRecoilValue(userPublicKeyAtom);

  const [creatorUserNameRecoil, setCreatorUserNameRecoil] =
    useRecoilState(creatorUserNameAtom);

  const [userName, setUserName] = useState(creatorUserNameRecoil);

  const [loadingCheckUserName, setLoadingCheckUserName] = useState(false);
  const [loadingSaving, setLoadingSaving] = useState(false);

  const wrongLengthMessage = (
    <p className="text-red-500">
      {`Username needs to be between ${USERNAMEMINLENGTH} 
      and ${USERNAMEMAXLENGTH} characters or be your publickey`}
    </p>
  );
  const takenMessage = (userNameBeingChecked: string) => (
    <p className="text-red-500">
      {`Username ${userNameBeingChecked} is taken`}
    </p>
  );
  const charactersNotAllowed = (
    <p className="text-red-500">Only letters, numbers, - and _ are allowed</p>
  );
  const availableMessage = (userNameBeingChecked: string) => (
    <p className="text-neutral-500">
      {`Username ${userNameBeingChecked} is available`}
    </p>
  );
  const unexpectedErrorMessage = (
    <p className="text-red-500">Unexpected error. Please try again later</p>
  );
  const [availabilityMessage, setAvailabilityMessage] = useState(
    userName !== undefined ? availableMessage(userName) : <p> </p>
  );

  async function checkUserNameValid(userNameBeingChecked: string | undefined) {
    setLoadingCheckUserName(true);
    let isUserNameValid = true;
    if (userNameBeingChecked !== creatorUserNameRecoil) {
      if (
        userNameBeingChecked === undefined ||
        userNameBeingChecked?.length < USERNAMEMINLENGTH ||
        (userNameBeingChecked?.length > USERNAMEMAXLENGTH &&
          userNameBeingChecked !== publicKey)
      ) {
        setAvailabilityMessage(wrongLengthMessage);
        isUserNameValid = false;
      } else if (!usernameIsValid(userNameBeingChecked)) {
        setAvailabilityMessage(charactersNotAllowed);
        isUserNameValid = false;
      } else {
        try {
          isUserNameValid = !(await checkUserNameExist(userNameBeingChecked));
          setAvailabilityMessage(
            isUserNameValid
              ? availableMessage(userNameBeingChecked)
              : takenMessage(userNameBeingChecked)
          );
        } catch (error: any) {
          setAvailabilityMessage(unexpectedErrorMessage);
          isUserNameValid = false;
        }
      }
    }
    setLoadingCheckUserName(false);
    return isUserNameValid;
  }

  async function handleSubmit() {
    setLoadingSaving(true);
    const userNameBeingChecked = userName;
    if (!(await checkUserNameValid(userNameBeingChecked))) {
      toast.error(<div> Username Error: {availabilityMessage}</div>);
      setLoadingSaving(false);
      return;
    }

    try {
      if (userNameBeingChecked !== undefined) {
        if (userNameBeingChecked !== creatorUserNameRecoil) {
          await UpdateUserName(userNameBeingChecked);
          setCreatorUserNameRecoil(userNameBeingChecked);
        }
        setLoadingSaving(false);
        toast.success('Your username has been updated');
      }
    } catch (error: any) {
      setLoadingSaving(false);

      toast.error(error?.message);
    }
  }

  return (
    <div className="">
      <div className="space-y-6 ">
        <div
          className="bg-neutral-100 dark:bg-neutral-800 
          max-w-4xl mx-auto 
          shadow-sm
         border border-transparant dark:border-neutral-600 
        px-4 py-5 rounded-lg sm:p-6">
          <div className="mx-auto max-w-3xl">
            {/* Title */}
            <div className="">
              <h3 className="text-lg font-medium leading-6 bc-text-color">
                Update your username
              </h3>
              <p className="mt-1 text-sm text-neutral-500">
                Your previous url will not redirect to your new one. You can
                lose traffic, please only change it if you really need to.
              </p>
            </div>
            <div className="mt-5 ">
              <form
                className="space-y-6"
                onSubmit={(e) => {
                  e.preventDefault();
                }}>
                {/* Creator username */}
                <div className="grid grid-cols-3 gap-6">
                  <div className="col-span-3 max-w-lg">
                    <label
                      htmlFor="company-website"
                      className="block text-sm font-medium bc-text-color">
                      Creator username
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <span
                        className="inline-flex items-center 
                  px-3 rounded-l-md border border-r-0 
                  border-neutral-400 
                  dark:border-neutral-600
                  bg-neutral-50 dark:bg-neutral-800
                  dark:text-neutral-400 
                  text-neutral-600 text-sm">
                        /c/
                      </span>
                      <input
                        type="text"
                        name="company-website"
                        id="company-website"
                        className="
                    text-input-field
                    rounded-none rounded-r-md
                    block w-full 
                    bc-field-input text-sm"
                        maxLength={44}
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                      />
                    </div>
                    <button
                      type="button"
                      className=" flex mt-1 px-1 text-base font-medium 
                text-cyan-600 hover:text-cyan-500 text-center\
                items-center
                 "
                      onClick={() => checkUserNameValid(userName)}
                      disabled={loadingCheckUserName}>
                      Check if available{' '}
                      {loadingCheckUserName && (
                        <Spinner classExtend=" ml-2 h-3 w-3" />
                      )}
                    </button>
                    <div className="px-1 text-sm ">{availabilityMessage}</div>
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* Action buttons */}
          <div
            className="flex mt-11 mx-auto max-w-3xl 
          justify-end gap-6">
            <button
              type="button"
              className="button-cancel w-20 h-9 justify-start"
              onClick={() => {
                setUserName(creatorUserNameRecoil);
              }}
              disabled={loadingSaving}>
              <p className="mx-auto">Cancel</p>
            </button>
            <button
              type="submit"
              className="button-action h-9 w-20  "
              onClick={() => handleSubmit()}
              disabled={loadingSaving}>
              {loadingSaving ? (
                <Spinner classExtend=" h-5 mx-auto" />
              ) : (
                <p className="mx-auto">Save</p>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
