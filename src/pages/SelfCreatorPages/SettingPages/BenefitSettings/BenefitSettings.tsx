import React, { useState, useRef } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import IsImageBelowMaxSize from 'services/Utils/Functions/FileVerification';

import { PencilIcon, PlusIcon } from '@heroicons/react/outline';
import { toast } from 'react-toastify';
import Compressor from 'compressorjs';
import Spinner from 'components/Common/Util/Spinner';

import { defaultTierImage } from 'components/Common/Util/DefaultValues';

import BasicEditor from 'services/Utils/CKeditor/Editor/BasicEditor';
import DOMPurify from 'dompurify';

import { creatorInfosAtom } from 'services/Utils/Recoil/creatorInfo';

import { userPublicKeyAtom } from 'services/Utils/Recoil/userInfo';

import MemberCard from 'components/Creators/Membership/MemberCard';

import {
  SaveTierImage,
  UpdateTier,
} from 'services/Firebase/WriteData/CreatorSettings/UpdateCreatorProfile';

import 'style/Components/creator.css';

const MAXTIERTITLELENGTH = 30;
const MINTIERTITLELENGTH = 1;

const MAXDESCRIPTIONLENGTH = 3000;

const SAMPLEPUBK = 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';

export default function BenefitSettings(): JSX.Element {
  const [creatorInfosRecoil, setCreatorInfosRecoil] =
    useRecoilState(creatorInfosAtom);

  const userPublicKey = useRecoilValue(userPublicKeyAtom);

  const [tierImage, setTierImage] = useState(
    creatorInfosRecoil.tierImage ?? defaultTierImage
  );
  const [tierPrice, setTierPrice] = useState(
    creatorInfosRecoil.tierPrice ?? 0.2
  );
  const [tierTitle, setTierTitle] = useState(
    creatorInfosRecoil.tierTitle ?? 'Buckle up!'
  );
  const [tierDescription, setTierDescription] = useState(
    creatorInfosRecoil.tierDescription ?? ''
  );

  const inputTierImButton = useRef<HTMLInputElement>(null);

  const [tierImageLoading, setTierImageLoading] = useState(false);

  const [loadingSaving, setLoadingSaving] = useState(false);

  async function SaveTierIm(file: File | Blob) {
    try {
      const imageUrl = await SaveTierImage(file);
      setTierImage(imageUrl);
      setCreatorInfosRecoil((prevState) => ({
        ...prevState,
        tierImage: imageUrl,
      }));
      toast.success('Tier Image Updated');
    } catch {
      toast.error('Failed to process your image');
    }
  }
  async function changeTierImFile(
    event: React.ChangeEvent<HTMLInputElement>
  ): Promise<void> {
    try {
      setTierImageLoading(true);
      if (event.target.files && event.target.files[0]) {
        const file = event.target.files[0];
        IsImageBelowMaxSize(file, 10);
        await new Promise((resolve, reject) => {
          /* eslint-disable no-new */
          new Compressor(file, {
            convertTypes: ['image/png'],
            quality: 0.8,
            maxWidth: 800,
            maxHeight: 800,
            success: (compressedResult) => {
              resolve(SaveTierIm(compressedResult));
            },
            error: (e) => {
              reject(e);
            },
          });
        });
        setTierImageLoading(false);
      } else {
        throw new Error('Your file was not found!');
      }
    } catch (error: any) {
      toast.error(error?.message);
      setTierImageLoading(false);
    }
  }

  async function handleSubmit() {
    setLoadingSaving(true);
    if (
      tierDescription === undefined ||
      tierDescription.length > MAXDESCRIPTIONLENGTH
    ) {
      toast.error(
        `About Error: about needs to be smaller than ${MAXDESCRIPTIONLENGTH} characters`
      );
      setLoadingSaving(false);
      return;
    }
    if (
      tierTitle === undefined ||
      tierTitle.length > MAXTIERTITLELENGTH ||
      tierTitle.length < MINTIERTITLELENGTH
    ) {
      toast.error(
        'Title Error: Title needs to be between' +
          ` ${MINTIERTITLELENGTH} and ${MAXTIERTITLELENGTH} characters`
      );
      setLoadingSaving(false);
      return;
    }
    try {
      await UpdateTier(
        tierPrice,
        tierTitle,
        DOMPurify.sanitize(tierDescription)
      );
      setCreatorInfosRecoil((prevState) => ({
        ...prevState,
        tierPrice,
        tierTitle,
        tierDescription: DOMPurify.sanitize(tierDescription),
      }));

      setLoadingSaving(false);
      toast.success('Your tier has been updated!');
    } catch (error: any) {
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
                Update your tier
              </h3>
              <p className="mt-1 text-sm text-neutral-500">
                Create membership tiers for your sponsors.
              </p>
            </div>
            <div className="mt-5 ">
              <form
                className="space-y-6"
                onSubmit={(e) => {
                  e.preventDefault();
                }}
                autoComplete="off">
                {/* Tier Title */}
                <div>
                  <label
                    htmlFor="title"
                    className=" text-sm font-medium bc-text-color 
                    flex items-baseline">
                    Tier title{' '}
                    <p className="text-neutral-500 text-xs pl-2">
                      {' '}
                      (max {MAXTIERTITLELENGTH} characters)
                    </p>
                  </label>
                  <div className="mt-1">
                    <input
                      id="tierTitle"
                      name="tierTitle"
                      type="text"
                      className="text-base shadow-sm 
                  text-input-field
                  bc-field-input
                   block w-full  border 
                    rounded-md"
                      maxLength={MAXTIERTITLELENGTH}
                      minLength={MINTIERTITLELENGTH}
                      value={tierTitle}
                      onChange={(e) => setTierTitle(e.target.value)}
                    />
                  </div>
                </div>

                {/* Tier Price */}
                <div>
                  <p className="block text-sm font-medium bc-text-color">
                    Tier price per 30 days
                  </p>
                  <div className="mt-1 flex items-center">
                    <input
                      /* name="price" */
                      type="number"
                      className="shadow-sm 
                  text-input-field
                  bc-field-input
                   block max-w-xs text-lg border 
                    rounded-md"
                      value={tierPrice as number}
                      min={0}
                      max={100}
                      step={0.01}
                      onChange={(e) => {
                        setTierPrice(e.target.valueAsNumber);
                      }}
                    />
                    <div
                      className="ml-2 text-neutral-900
                dark:text-neutral-100 font-semibold ">
                      {' '}
                      SOL
                    </div>
                  </div>
                </div>

                {/* About */}
                <div>
                  <p className="block text-sm font-medium bc-text-color">
                    Sponsors benefits description
                  </p>
                  <div className="mt-1">
                    <BasicEditor
                      maxLength={MAXDESCRIPTIONLENGTH}
                      text={tierDescription}
                      setText={setTierDescription}
                    />
                  </div>
                  <p className="mt-2 text-sm text-neutral-500">
                    Explain what your supporter will get by supporting you.
                  </p>
                </div>

                {/* Tier image */}
                <div>
                  <p className=" text-sm font-medium bc-text-color">
                    Tier image
                  </p>
                  <div
                    className="mt-1 sm:flex  items-end
                  sm:space-x-5 ">
                    <img
                      className="  
                      
                 rounded-lg h-64 w-64
                border border-neutral-400
                        dark:border-neutral-600"
                      src={tierImage}
                      alt=""
                    />
                    <input
                      ref={inputTierImButton}
                      accept="image/*"
                      type="file"
                      id="file"
                      style={{ display: 'none' }}
                      onChange={(e) => changeTierImFile(e)}
                      onClick={(e) => {
                        const element = e.target as HTMLInputElement;
                        element.value = '';
                      }}
                    />
                    <button
                      type="button"
                      className="button-action h-9 mt-2 sm:mt-0"
                      onClick={() => {
                        if (inputTierImButton.current)
                          inputTierImButton.current.click();
                      }}
                      disabled={tierImageLoading}>
                      {tierImageLoading ? (
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

                {/* Member Card */}
                <div className=" ">
                  <p className=" text-sm font-medium bc-text-color">
                    Membership card preview
                  </p>
                  <div className="transform scale-100 origin-top-left mt-2">
                    <MemberCard
                      title={tierTitle}
                      image={tierImage}
                      userName={creatorInfosRecoil.userName ?? ''}
                      displayName={creatorInfosRecoil.displayName ?? ''}
                      expiration="XX/XX/XXXX"
                      creatorKey={userPublicKey ?? ''}
                      minterKey={SAMPLEPUBK}
                      idx="sample"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* Action buttons */}
          <div
            className="flex mt-10 mx-auto max-w-3xl 
          justify-end gap-6">
            <button
              type="button"
              className="button-cancel w-20 h-9 justify-start"
              onClick={async () => {
                setTierImage(creatorInfosRecoil.tierImage ?? defaultTierImage);
                setTierPrice(creatorInfosRecoil.tierPrice ?? 0.2);
                setTierTitle(creatorInfosRecoil.tierTitle ?? 'Buckle up!');
                setTierDescription(creatorInfosRecoil.tierDescription ?? '');
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

        <div>
          <p
            className="text-center mt-2 text-black
                     dark:text-neutral-100 font-semibold">
            Coming Soon!
          </p>
          <p
            className="text-center mt-2 text-sm text-neutral-500
                      font-semibold">
            You can only have 1 tier for now, more are coming.
          </p>
          <div className=" flex justify-center mx-auto">
            <button
              type="button"
              className="button-action mt-5 mb-5 opacity-25"
              disabled>
              <p className="flex items-center text-xl font-semibold">
                Add a Tier <PlusIcon className="ml-2 h-8" />
              </p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
