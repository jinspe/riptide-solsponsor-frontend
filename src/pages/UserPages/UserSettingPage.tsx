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
      <div className="page-container-l1">
        <div>
          <button
            type="button"
            className=" ml-2 text-base font-medium 
                text-link text-center "
            onClick={() => navigate(-1)}>
            <span aria-hidden="true"> &larr;</span> Go back
          </button>
        </div>

        <div className="page-title -mt-4 ">Edit your profile</div>
        <div className="surface-l2-container max-w-3xl mx-auto space-y-6">
          {/* Title */}
          <div className="px-3 sm:px-12 mt-2">
            <h3 className="text-lg font-medium leading-6 text-primary">
              Profile
            </h3>
            <p className="mt-1 text-sm text-secondary">
              This information will be displayed publicly so be careful what you
              share.
            </p>
          </div>
          {/* Display Name */}
          <div className="px-1 sm:px-6 mt-4 ">
            <div
              className="md:flex items-baseline 
          py-2 px-1 sm:px-5 rounded-lg ">
              <p
                className=" w-36 text-left pl-1
          py-1 text-base font-medium 
          text-primary
          ">
                Display Name
              </p>
              <div className="mt-1 w-full  sm:pl-3">
                <input
                  type="text"
                  name="username"
                  id="displayname"
                  autoComplete="off"
                  className="w-full sm:w-5/6 items-start px-3 py-1
                text-input-field rounded-md"
                  maxLength={MAXDISPLAYNAMELENGTH}
                  minLength={MINDISPLAYNAMELENGTH}
                  value={tempDisplayName}
                  onChange={(e) => setTempDisplayName(e.target.value)}
                />
              </div>
            </div>
          </div>
          {/* Profile Image */}
          <div className="px-1 sm:px-6 mt-2">
            <div
              className="md:flex items-center 
             py-2 px-1 sm:px-5 rounded-lg ">
              <div
                className="flex  w-56 items-baseline justify-items-start 
              gap-1">
                <p
                  className=" text-left pl-1
          py-1 text-base font-medium text-primary">
                  Profile Image
                </p>
                <p className="text-xs font-medium text-secondary">(500x500)</p>
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
