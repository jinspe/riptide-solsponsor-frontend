import React, { useState, useRef } from 'react';

import 'style/Components/creator.css';
import IsImageBelowMaxSize, {
  usernameIsValid,
} from 'services/Utils/Functions/FileVerification';

import { checkUserNameExist } from 'services/Firebase/GetData/CreatorUtils';

import { PencilIcon, UserCircleIcon } from '@heroicons/react/outline';
import { toast } from 'react-toastify';
import Compressor from 'compressorjs';
import Spinner from 'components/Common/Util/Spinner';

const USERNAMEMAXLENGTH = 40;
const USERNAMEMINLENGTH = 3;
const BIOMAXLENGTH = 160;

/* eslint-disable jsx-a11y/label-has-associated-control */
type TprofileSection = {
  publicKey: string | undefined;
  displayName: string | undefined;
  profileImage: string | undefined;
};

export default function ProfileSection({
  publicKey,
  displayName,
  profileImage,
}: TprofileSection): JSX.Element {
  const [userName, setUserName] = useState(publicKey);
  const [bio, setBio] = useState('');

  const inputProfileImButton = useRef<HTMLInputElement>(null);
  const inputCoverImButton = useRef<HTMLInputElement>(null);

  const [profileImageLoading, setProfileImageLoading] = useState(false);
  const [coverImageLoading, setCoverImageLoading] = useState(false);

  const [loadingCheckUserName, setLoadingCheckUserName] = useState(false);

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
    // eslint-disable-next-line no-console
    setLoadingCheckUserName(true);
    let isUserNameValid = true;
    if (userNameBeingChecked !== publicKey) {
      // userName changed
      if (
        userNameBeingChecked === undefined ||
        userNameBeingChecked?.length < USERNAMEMINLENGTH ||
        (userNameBeingChecked?.length > USERNAMEMAXLENGTH &&
          userNameBeingChecked !== publicKey)
      ) {
        setAvailabilityMessage(wrongLengthMessage);
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

  async function changeProfileImFile(
    event: React.ChangeEvent<HTMLInputElement>
  ): Promise<void> {
    try {
      setProfileImageLoading(true);
      if (event.target.files && event.target.files[0]) {
        const file = event.target.files[0];
        IsImageBelowMaxSize(file, 10);
        await new Promise((resolve, reject) => {
          /* eslint-disable no-new */
          new Compressor(file, {
            convertTypes: ['image/png'],
            quality: 0.8,
            success: (compressedResult) => {
              console.log('saved');
              // resolve(SaveImage(compressedResult));
            },
            error: (e) => {
              reject(e);
            },
          });
        });
        setProfileImageLoading(false);
      } else {
        throw new Error('Your file was not found!');
      }
    } catch (error: any) {
      toast.error(error?.message);
      setProfileImageLoading(false);
    }
  }

  async function changeCoverImFile(
    event: React.ChangeEvent<HTMLInputElement>
  ): Promise<void> {
    try {
      setCoverImageLoading(true);

      if (event.target.files && event.target.files[0]) {
        const file = event.target.files[0];
        IsImageBelowMaxSize(file, 10);
        await new Promise((resolve, reject) => {
          /* eslint-disable no-new */
          new Compressor(file, {
            convertTypes: ['image/png'],
            quality: 0.8,
            success: (compressedResult) => {
              console.log('saved');
              // resolve(SaveImage(compressedResult));
            },
            error: (e) => {
              reject(e);
            },
          });
        });
        setCoverImageLoading(false);
      } else {
        throw new Error('Your file was not found!');
      }
    } catch (error: any) {
      toast.error(error?.message);
      setCoverImageLoading(false);
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log('hhh');
  }

  return (
    <div className="bc-section-bg shadow px-4 py-5 rounded-lg sm:p-6">
      <div className="md:grid md:grid-cols-3 md:gap-6">
        {/* Title */}
        <div className="md:col-span-1">
          <h3 className="text-lg font-medium leading-6 bc-text-color">
            Create a profile
          </h3>
          <p className="mt-1 text-sm text-neutral-500">
            This your creator profile different from your user profile.
          </p>
        </div>

        <div className="mt-5 md:mt-0 md:col-span-2">
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
                  Verify if available{' '}
                  {loadingCheckUserName && (
                    <Spinner classExtend=" ml-2 h-3 w-3" />
                  )}
                </button>
                <div className="px-1 text-sm ">{availabilityMessage}</div>
              </div>
            </div>

            {/* About */}
            <div>
              <label
                htmlFor="about"
                className="block text-sm font-medium bc-text-color">
                About
              </label>
              <div className="mt-1">
                <textarea
                  id="about"
                  name="about"
                  rows={3}
                  className="shadow-sm 
                  text-input-field
                  bc-field-input
                   block w-full text-sm border 
                    rounded-md"
                  maxLength={BIOMAXLENGTH}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                />
              </div>
              <p className="mt-2 text-sm text-neutral-500">
                Brief description for your profile.
              </p>
            </div>

            {/*  Photo */}
            <div>
              <label className="block text-sm font-medium bc-text-color">
                Photo
              </label>
              <div className="mt-1 flex items-center space-x-5">
                {profileImage === '' || profileImage === undefined ? (
                  <UserCircleIcon className=" h-14 w-14 " />
                ) : (
                  <img
                    className="h-14 w-14 rounded-full"
                    src={profileImage}
                    alt=""
                  />
                )}
                <input
                  ref={inputProfileImButton}
                  accept="image/*"
                  type="file"
                  id="file"
                  style={{ display: 'none' }}
                  onChange={(e) => changeProfileImFile(e)}
                  onClick={(e) => {
                    const element = e.target as HTMLInputElement;
                    element.value = '';
                  }}
                />
                <button
                  type="button"
                  className="button-action"
                  onClick={() => {
                    if (inputProfileImButton.current)
                      inputProfileImButton.current.click();
                  }}
                  disabled={profileImageLoading}>
                  {profileImageLoading ? (
                    <>
                      Processing
                      <Spinner classExtend="ml-3 -mr-1 h-5 w-5" />
                    </>
                  ) : (
                    <>
                      Change
                      <PencilIcon
                        className="h-5 w-5 ml-3 -mr-1"
                        aria-hidden="true"
                      />
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Cover photo */}
            <div>
              <label className="block text-sm font-medium bc-text-color">
                Cover photo
              </label>
              <img
                className="h-32 mt-1 w-full mx-auto 
                object-cover rounded-lg lg:h-48"
                src="https://firebasestorage.googleapis.com/v0/b/qwestive-beta-prod.appspot.com/o/defaultImages%2FcoverImage%2FcoverPic.png?alt=media&token=4d20be09-f179-4414-94cd-be08ed6324d4"
                alt=""
              />
              <input
                ref={inputCoverImButton}
                accept="image/*"
                type="file"
                id="file"
                style={{ display: 'none' }}
                onChange={(e) => changeCoverImFile(e)}
                onClick={(e) => {
                  const element = e.target as HTMLInputElement;
                  element.value = '';
                }}
              />
              <div className="flex justify-end pr-2 -mt-12 ">
                <button
                  type="button"
                  className="button-action"
                  onClick={() => {
                    if (inputCoverImButton.current)
                      inputCoverImButton.current.click();
                  }}
                  disabled={coverImageLoading}>
                  {coverImageLoading ? (
                    <>
                      Processing
                      <Spinner classExtend="ml-3 -mr-1 h-5 w-5" />
                    </>
                  ) : (
                    <>
                      Change
                      <PencilIcon
                        className="h-5 w-5 ml-3 -mr-1"
                        aria-hidden="true"
                      />
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
