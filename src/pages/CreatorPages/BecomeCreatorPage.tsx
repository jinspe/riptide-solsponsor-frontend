import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useRecoilValue, useRecoilState } from 'recoil';

import IsImageBelowMaxSize, {
  usernameIsValid,
} from 'services/Utils/Functions/FileVerification';

import { checkUserNameExist } from 'services/Firebase/GetData/CreatorUtils';

import { PencilIcon, UserCircleIcon } from '@heroicons/react/outline';
import { toast } from 'react-toastify';
import Compressor from 'compressorjs';
import Spinner from 'components/Common/Util/Spinner';

import { CreateUserNameCloud } from 'services/Firebase/CloudFunctions/CreatorFunctions';

import { setUserAsCreator } from 'services/Firebase/WriteData/UserSettings/UpdateProfile';

import {
  SaveProfileImage,
  SaveCoverImage,
  SaveCreatorInfos,
} from 'services/Firebase/WriteData/CreatorSettings/UpdateCreatorProfile';

import {
  userIsCreatorAtom,
  userProfileImageAtom,
  userPublicKeyAtom,
  userDisplayNameAtom,
} from 'services/Utils/Recoil/userInfo';

import {
  creatorBioAtom,
  creatorDisplayNameAtom,
  creatorProfileImageAtom,
  creatorCoverImageAtom,
} from 'services/Utils/Recoil/creatorInfo';

import 'style/Components/creator.css';

const USERNAMEMAXLENGTH = 40;
const USERNAMEMINLENGTH = 3;
const BIOMAXLENGTH = 300;
const MAXDISPLAYNAMELENGTH = 45;
const MINDISPLAYNAMELENGTH = 1;

/* eslint-disable jsx-a11y/label-has-associated-control */

export default function BecomeCreatorPage(): JSX.Element {
  const navigate = useNavigate();
  const [userIsCreator, setUserIsCreator] = useRecoilState(userIsCreatorAtom);
  const userProfileImage = useRecoilValue(userProfileImageAtom);
  const publicKey = useRecoilValue(userPublicKeyAtom);
  const userDisplayName = useRecoilValue(userDisplayNameAtom);

  const [, setCreatorBioRecoil] = useRecoilState(creatorBioAtom);
  const [, setCreatorDisplayNameRecoil] = useRecoilState(
    creatorDisplayNameAtom
  );
  const [, setCreatorProfileImageRecoil] = useRecoilState(
    creatorProfileImageAtom
  );
  const [, setCreatorCoverImageRecoil] = useRecoilState(creatorCoverImageAtom);

  const [userName, setUserName] = useState(publicKey);
  const [displayName, setDisplayName] = useState(userDisplayName);
  const [bio, setBio] = useState('');
  const [profileImage, setProfile] = useState(userProfileImage);
  const [coverImage, setCoverImage] = useState(
    'https://firebasestorage.googleapis.com/v0/b/mefren-dev.appspot.com/o/defaults%2Fcreator_default_image.png?alt=media&token=30205a41-01ba-4beb-a759-36b193f20723'
  );

  const inputProfileImButton = useRef<HTMLInputElement>(null);
  const inputCoverImButton = useRef<HTMLInputElement>(null);

  const [profileImageLoading, setProfileImageLoading] = useState(false);
  const [coverImageLoading, setCoverImageLoading] = useState(false);

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

  async function SaveProfileIm(file: File | Blob) {
    try {
      const imageUrl = await SaveProfileImage(file);
      setProfile(imageUrl);
      toast.success('Creator Profile Image Updated');
    } catch {
      toast.error('Failed to process your image');
    }
  }
  async function SaveCoverIm(file: File | Blob) {
    try {
      const imageUrl = await SaveCoverImage(file);
      setCoverImage(imageUrl);
      toast.success('Creator Cover Image Updated');
    } catch {
      toast.error('Failed to process your image');
    }
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
            maxWidth: 500,
            success: (compressedResult) => {
              resolve(SaveProfileIm(compressedResult));
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
            maxWidth: 1500,
            quality: 0.8,
            success: (compressedResult) => {
              resolve(SaveCoverIm(compressedResult));
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

  async function handleSubmit() {
    setLoadingSaving(true);
    const userNameBeingChecked = userName;
    if (!(await checkUserNameValid(userNameBeingChecked))) {
      toast.error(<div> Username Error: {availabilityMessage}</div>);
      setLoadingSaving(false);
      return;
    }
    if (bio.length > BIOMAXLENGTH || bio === undefined) {
      toast.error(
        `About Error: about needs to be smaller than ${BIOMAXLENGTH} characters`
      );
      setLoadingSaving(false);
      return;
    }
    if (
      displayName === undefined ||
      displayName.length > MAXDISPLAYNAMELENGTH ||
      displayName.length < MINDISPLAYNAMELENGTH
    ) {
      toast.error(
        'Display name Error:  Display name needs to be between' +
          ` ${MINDISPLAYNAMELENGTH} and ${MAXDISPLAYNAMELENGTH} characters`
      );
      setLoadingSaving(false);
      return;
    }
    try {
      if (userNameBeingChecked !== undefined) {
        await CreateUserNameCloud(userNameBeingChecked);
        await SaveCreatorInfos(displayName, bio);
        await setUserAsCreator();
        // set recoils
        // set the user as creator
        setCreatorBioRecoil(bio);
        setCreatorDisplayNameRecoil(displayName);
        setCreatorProfileImageRecoil(profileImage);
        setCreatorCoverImageRecoil(coverImage);
        setLoadingSaving(false);
        toast.success('Welcome you are now a creator!');
        setUserIsCreator(true);
      }
    } catch (error: any) {
      toast.error(error?.message);
    }
  }

  useEffect(() => {
    if (userIsCreator) {
      navigate('/');
    }
  }, [userIsCreator]);

  return (
    <div className="pageFrame">
      <div
        className="text-xl font-bold text-center
        text-black
        dark:text-neutral-100">
        Become a Creator
      </div>
      <div className="mt-2 space-y-6 pb-10">
        <div
          className="bc-section-bg max-w-4xl mx-auto 
        shadow px-4 py-5 rounded-lg sm:p-6">
          <div className="mx-auto max-w-3xl">
            {/* Title */}
            <div className="">
              <h3 className="text-lg font-medium leading-6 bc-text-color">
                Create a profile
              </h3>
              <p className="mt-1 text-sm text-neutral-500">
                This your creator profile different from your user profile.
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

                {/* Display Name */}
                <div>
                  <label
                    htmlFor="userName"
                    className="block text-sm font-medium bc-text-color">
                    Creator display name
                  </label>
                  <div className="mt-1">
                    <input
                      id="displayname"
                      name="displayname"
                      type="text"
                      className="shadow-sm 
                  text-input-field
                  bc-field-input
                   block w-full text-sm border 
                    rounded-md"
                      maxLength={MAXDISPLAYNAMELENGTH}
                      minLength={MINDISPLAYNAMELENGTH}
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                    />
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
                    Brief description for your profile (max {BIOMAXLENGTH}{' '}
                    characters).
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
                        className="h-14 w-14 rounded-full 
                        border border-neutral-400
                        dark:border-neutral-600"
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
                      className="button-action h-9"
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
                object-cover rounded-lg lg:h-48
                border border-neutral-400
                        dark:border-neutral-600"
                    src={coverImage}
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
                  <div className="flex justify-end pr-2 -mt-11 ">
                    <button
                      type="button"
                      className="button-action h-9"
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

          <div
            className="flex mt-11 mx-auto max-w-3xl 
          justify-end gap-6">
            <button
              type="button"
              className="button-cancel w-20 h-9 justify-start"
              onClick={() => navigate(-1)}
              disabled={loadingSaving}>
              <p className="mx-auto">Cancel</p>
            </button>
            <button
              type="submit"
              className="button-action h-9 w-42  "
              onClick={() => handleSubmit()}
              disabled={loadingSaving}>
              <p className="mx-auto">Become a Creator</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
