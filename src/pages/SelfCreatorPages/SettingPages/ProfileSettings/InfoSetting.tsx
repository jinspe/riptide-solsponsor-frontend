import React, { useState, useRef } from 'react';
import { useRecoilState } from 'recoil';
import DOMPurify from 'dompurify';
import { PencilIcon, UserCircleIcon } from '@heroicons/react/outline';
import { toast } from 'react-toastify';
import Compressor from 'compressorjs';

import BasicEditor from 'services/Utils/CKeditor/Editor/BasicEditor';
import IsImageBelowMaxSize from 'services/Utils/Functions/FileVerification';
import {
  SaveProfileImage,
  SaveCoverImage,
  SaveCreatorInfos,
} from 'services/Firebase/WriteData/CreatorSettings/UpdateCreatorProfile';
import { creatorInfosAtom } from 'services/Utils/Recoil/creatorInfo';

import {
  defaultCoverImage,
  defaultCreatorImage,
} from 'components/Common/Util/DefaultValues';
import Spinner from 'components/Common/Util/Spinner';

import 'style/Components/creator.css';

const BIOMAXLENGTH = 2000;
const MAXDISPLAYNAMELENGTH = 45;
const MINDISPLAYNAMELENGTH = 1;
const MAXTAGSLENGTH = 100;
const MINTAGSLENGTH = 0;

export default function InfoSetting(): JSX.Element {
  const [creatorInfosRecoil, setCreatorInfosRecoil] =
    useRecoilState(creatorInfosAtom);

  const [displayName, setDisplayName] = useState(
    creatorInfosRecoil.displayName ?? ''
  );
  const [bio, setBio] = useState(creatorInfosRecoil.bio ?? '');
  const [tags, setTags] = useState(creatorInfosRecoil.tags?.join(',') ?? '');
  const [profileImage, setProfileImage] = useState(
    creatorInfosRecoil.profileImage === undefined ||
      creatorInfosRecoil.profileImage === ''
      ? defaultCreatorImage
      : creatorInfosRecoil.profileImage
  );
  const [coverImage, setCoverImage] = useState(
    creatorInfosRecoil.coverImage ?? defaultCoverImage
  );

  const inputProfileImButton = useRef<HTMLInputElement>(null);
  const inputCoverImButton = useRef<HTMLInputElement>(null);

  const [profileImageLoading, setProfileImageLoading] = useState(false);
  const [coverImageLoading, setCoverImageLoading] = useState(false);
  const [loadingSaving, setLoadingSaving] = useState(false);

  async function SaveProfileIm(file: File | Blob) {
    try {
      const imageUrl = await SaveProfileImage(file);
      setProfileImage(imageUrl);
      setCreatorInfosRecoil((prevState) => ({
        ...prevState,
        profileImage: imageUrl,
      }));
      toast.success('Creator Profile Image Updated');
    } catch {
      toast.error('Failed to process your image');
    }
  }
  async function SaveCoverIm(file: File | Blob) {
    try {
      const imageUrl = await SaveCoverImage(file);
      setCoverImage(imageUrl);
      setCreatorInfosRecoil((prevState) => ({
        ...prevState,
        coverImage: imageUrl,
      }));
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
            maxHeight: 500,
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
            maxHeight: 1000,
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
    try {
      if (bio === undefined || bio.length > BIOMAXLENGTH) {
        throw new Error(
          `About Error: about needs to be smaller than ${BIOMAXLENGTH} characters`
        );
      }
      if (
        tags === undefined ||
        tags.length > MAXTAGSLENGTH ||
        tags.length < MINTAGSLENGTH
      ) {
        throw new Error(
          'Short About Error: Short about needs to be between' +
            ` ${MINTAGSLENGTH} and ${MAXTAGSLENGTH} characters`
        );
      }
      if (
        displayName === undefined ||
        displayName.length > MAXDISPLAYNAMELENGTH ||
        displayName.length < MINDISPLAYNAMELENGTH
      ) {
        throw new Error(
          'Display name Error:  Display name needs to be between' +
            ` ${MINDISPLAYNAMELENGTH} and ${MAXDISPLAYNAMELENGTH} characters`
        );
      }

      await SaveCreatorInfos(
        displayName,
        DOMPurify.sanitize(bio),
        tags.toLowerCase().split(','),
        profileImage,
        coverImage
      );

      setCreatorInfosRecoil((prevState) => ({
        ...prevState,
        bio,
        tags: tags.toLocaleLowerCase().split(','),
        displayName,
        profileImage,
        coverImage,
      }));
      setLoadingSaving(false);
      toast.success('Your creator profile has been updated!');
    } catch (error: any) {
      setLoadingSaving(false);
      toast.error(error?.message);
    }
  }

  return (
    <div className="">
      <div className=" space-y-6 ">
        <div
          className="bg-neutral-100 dark:bg-neutral-800 max-w-4xl mx-auto 
          shadow-sm
         border border-neutral-300 dark:border-neutral-600 
        px-4 py-5 rounded-lg sm:p-6">
          <div className="mx-auto max-w-3xl">
            {/* Title */}
            <div className="">
              <h3 className="text-lg font-medium leading-6 bc-text-color">
                Update your profile
              </h3>
              <p className="mt-1 text-sm text-neutral-500">
                This is your creator profile different from your user profile.
              </p>
            </div>
            <div className="mt-5 ">
              <form
                className="space-y-6"
                onSubmit={(e) => {
                  e.preventDefault();
                }}
                autoComplete="off">
                {/* Display Name */}
                <div>
                  <p className="block text-sm font-medium bc-text-color">
                    Creator display name
                  </p>
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
                {/* Short Bio */}
                <div>
                  <p className="block text-sm font-medium bc-text-color">
                    Creator tags
                  </p>
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
                      maxLength={MAXTAGSLENGTH}
                      minLength={MINTAGSLENGTH}
                      value={tags}
                      onChange={(e) => setTags(e.target.value)}
                      placeholder="example: Music, NFT Artist, Developer, Podcaster"
                    />
                  </div>
                  <p className="mt-2 text-sm text-neutral-500">
                    Help sponsors discover you with a small description of what
                    you do separate the tags by commas ({MAXTAGSLENGTH}{' '}
                    characters)
                  </p>
                </div>

                {/* About */}
                <div>
                  <p className="block text-sm font-medium bc-text-color">
                    About
                  </p>
                  <div className="mt-1">
                    <BasicEditor
                      maxLength={BIOMAXLENGTH}
                      text={bio}
                      setText={setBio}
                    />
                  </div>
                  <p className="mt-2 text-sm text-neutral-500">
                    Brief description for your profile (try to keep it short,
                    less than 300 characters).
                  </p>
                </div>

                {/*  Photo */}
                <div>
                  <div className="items-baseline flex text-sm font-medium bc-text-color">
                    Photo{' '}
                    <p className="text-xs ml-2 text-neutral-500"> (500x500)</p>
                  </div>
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
                  <div className="items-baseline flex text-sm font-medium bc-text-color">
                    Cover photo{' '}
                    <p className="text-xs ml-2 text-neutral-500"> (1500x500)</p>
                  </div>
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

          {/* Action buttons */}
          <div
            className="flex mt-11 mx-auto max-w-3xl 
          justify-end gap-6">
            <button
              type="button"
              className="button-cancel w-20 h-9 justify-start"
              onClick={() => {
                setDisplayName(creatorInfosRecoil.displayName ?? '');
                setBio(creatorInfosRecoil.bio ?? '');
                setTags(creatorInfosRecoil.tags?.join(',') ?? '');
                setProfileImage(
                  creatorInfosRecoil.profileImage ?? defaultCreatorImage
                );
                setCoverImage(
                  creatorInfosRecoil.coverImage ?? defaultCoverImage
                );
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
