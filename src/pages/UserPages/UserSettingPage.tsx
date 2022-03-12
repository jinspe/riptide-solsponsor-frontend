import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import Compressor from 'compressorjs';
import { toast } from 'react-toastify';

import { PencilIcon, UserCircleIcon } from '@heroicons/react/outline';

import {
  userDisplayNameAtom,
  userProfileImageAtom,
} from 'services/Utils/Recoil/userInfo';
import IsImageBelowMaxSize from 'services/Utils/Functions/FileVerification';

import {
  SaveProfileImage,
  SaveDisplayName,
} from 'services/Firebase/WriteData/UserSettings/UpdateProfile';

import Spinner from 'components/Common/Util/Spinner';

const MAXDISPLAYNAMELENGTH = 45;
const MINDISPLAYNAMELENGTH = 1;

export default function UserSettingPage(): JSX.Element {
  const navigate = useNavigate();

  const [displayNameRecoil, setDisplayNameRecoil] =
    useRecoilState(userDisplayNameAtom);
  const [userProfileImageRecoil, setUserProfileImageRecoil] =
    useRecoilState(userProfileImageAtom);

  const [tempDisplayName, setTempDisplayName] = useState(
    displayNameRecoil !== undefined ? displayNameRecoil : ''
  );

  const inputButton = useRef<HTMLInputElement>(null);
  const [imageLoading, setImageLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  async function SaveImage(file: File | Blob) {
    try {
      const imageUrl = await SaveProfileImage(file);
      setUserProfileImageRecoil(imageUrl);
      toast.success('Profile Image Updated');
    } catch {
      toast.error('Failed to process your image');
    }
  }

  async function changeFile(
    event: React.ChangeEvent<HTMLInputElement>
  ): Promise<void> {
    try {
      setImageLoading(true);
      if (event.target.files && event.target.files[0]) {
        const file = event.target.files[0];
        IsImageBelowMaxSize(file, 10);
        await new Promise((resolve, reject) => {
          /* eslint-disable no-new */
          new Compressor(file, {
            convertTypes: ['image/png'],
            maxWidth: 500,
            maxHeight: 500,
            quality: 0.8,
            success: (compressedResult) => {
              resolve(SaveImage(compressedResult));
            },
            error: (e) => {
              reject(e);
            },
          });
        });
        setImageLoading(false);
      } else {
        throw new Error('Your file was not found!');
      }
    } catch (error: any) {
      toast.error(error?.message);
      setImageLoading(false);
    }
  }

  async function saveProfile() {
    setSaving(true);
    if (
      tempDisplayName !== displayNameRecoil &&
      tempDisplayName !== undefined &&
      tempDisplayName.length >= MINDISPLAYNAMELENGTH &&
      tempDisplayName.length <= MAXDISPLAYNAMELENGTH
    ) {
      try {
        await SaveDisplayName(tempDisplayName);
        setDisplayNameRecoil(tempDisplayName);
      } catch {
        toast.error('Failed to update your profile');
      }
    }
    setSaving(false);
    toast.success('Profile updated');
    navigate(-1);
  }

  return (
    <div className="pageFrame">
      <div
        className="bg-neutral-200 dark:bg-neutral-900 
      rounded-lg shadow mx-auto p-3">
        <div>
          <button
            type="button"
            className=" ml-2 text-base font-medium 
                text-cyan-600 hover:text-cyan-500 text-center "
            onClick={() => navigate(-1)}>
            <span aria-hidden="true"> &larr;</span> Go back
          </button>
        </div>

        <div
          className="text-xl -mt-4 font-bold text-center
        text-black
        dark:text-neutral-100">
          Edit your profile
        </div>
        <div
          className="bg-neutral-100 dark:bg-neutral-800 
          border border-neutral-300 dark:border-neutral-600 
      rounded-lg max-w-3xl mx-auto p-3 mt-10 mb-3 space-y-6">
          {/* Title */}
          <div className="px-12 mt-2">
            <h3 className="text-lg font-medium leading-6 bc-text-color">
              Profile
            </h3>
            <p className="mt-1 text-sm text-neutral-500">
              This information will be displayed publicly so be careful what you
              share.
            </p>
          </div>
          <div className="px-6 mt-4 ">
            <div
              className="md:flex items-baseline 
          py-2 px-5 rounded-lg ">
              <p
                className=" w-36 text-left pl-1
          py-1 text-base font-medium 
          text-black
          dark:text-neutral-100
          ">
                Display Name
              </p>
              <div className="mt-1 w-full  pl-3">
                <input
                  type="text"
                  name="username"
                  id="displayname"
                  autoComplete="off"
                  className="w-5/6 items-start px-3 py-1 rounded-lg
                bg-white
                dark:bg-neutral-700
                placeholder-neutral-500
                dark:placeholder-neutral-400
                text-input-field"
                  maxLength={MAXDISPLAYNAMELENGTH}
                  minLength={MINDISPLAYNAMELENGTH}
                  value={tempDisplayName}
                  onChange={(e) => setTempDisplayName(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="px-6 mt-2">
            <div
              className="md:flex items-center 
             py-2 px-5 rounded-lg ">
              <div className="flex  w-56 items-baseline ">
                <p
                  className="flex-1 text-left pl-1
          py-1 text-base font-medium 
          text-black
          dark:text-neutral-100">
                  Profile Image
                </p>
                <p className="text-xs font-medium ml-1 text-neutral-500">
                  {' '}
                  (500x500)
                </p>
              </div>

              <div className="flex w-full items-center ">
                <div className=" w-32 p-2">
                  {userProfileImageRecoil === '' ||
                  userProfileImageRecoil === undefined ? (
                    <UserCircleIcon className=" h-20 w-20 " />
                  ) : (
                    <img
                      className="h-20 w-20 rounded-full"
                      src={userProfileImageRecoil}
                      alt=""
                    />
                  )}
                </div>
                {/* Change button */}
                <div className="-ml-5 ">
                  <input
                    ref={inputButton}
                    accept="image/*"
                    type="file"
                    id="file"
                    style={{ display: 'none' }}
                    onChange={(e) => changeFile(e)}
                    onClick={(e) => {
                      const element = e.target as HTMLInputElement;
                      element.value = '';
                    }}
                  />
                  <button
                    type="button"
                    className="button-action"
                    onClick={() => {
                      if (inputButton.current) inputButton.current.click();
                    }}
                    disabled={imageLoading}>
                    {imageLoading ? (
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
            </div>
          </div>

          <div className="flex justify-end gap-3 pb-2 px-5">
            <button
              type="button"
              className="button-cancel w-20 h-9 justify-start"
              onClick={() => navigate(-1)}
              disabled={saving}>
              <p className="mx-auto">Cancel</p>
            </button>
            <button
              type="button"
              className="button-action h-9 w-20  "
              disabled={saving}
              onClick={() => saveProfile()}>
              {saving ? (
                <Spinner classExtend="mx-auto h-5 w-5" />
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
