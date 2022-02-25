import React, { useState, useRef } from 'react';

import { toast } from 'react-toastify';
import { UploadIcon, PencilIcon } from '@heroicons/react/outline';

import IsImageBelowMaxSize from 'services/Utils/Functions/FileVerification';
import Compressor from 'compressorjs';

import Spinner from 'components/Common/Util/Spinner';

type INFTFileInput = {
  inputFile: string;
  setInputFile: React.Dispatch<React.SetStateAction<string>>;
};

export default function NFTFileInput({
  inputFile,
  setInputFile,
}: INFTFileInput): JSX.Element {
  const inputButton = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);

  async function changeFile(
    event: React.ChangeEvent<HTMLInputElement>
  ): Promise<void> {
    try {
      setLoading(true);
      if (event.target.files && event.target.files[0]) {
        const file = event.target.files[0];
        IsImageBelowMaxSize(file, 10);
        // setInputFile(URL.createObjectURL(file));
        await new Promise((resolve, reject) => {
          /* eslint-disable no-new */
          new Compressor(file, {
            convertTypes: ['image/png'],
            quality: 0.8,
            success: (compressedResult) => {
              resolve(setInputFile(URL.createObjectURL(compressedResult)));
            },
            error: (e) => {
              reject(e);
            },
          });
        });
        setLoading(false);
      } else {
        throw new Error('Your file was not found!');
      }
    } catch (error: any) {
      toast.error(error?.message);
      setLoading(false);
    }
  }

  return (
    <div>
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
      <div className=" ">
        <button
          type="button"
          className="button-action"
          onClick={() => {
            if (inputButton.current) inputButton.current.click();
          }}
          disabled={loading}>
          {inputFile !== '' ? 'Change file' : 'Upload a file'}
          {loading ? (
            <Spinner classExtend="ml-3 -mr-1 h-5 w-5" />
          ) : (
            <>
              {/* Icon Switch */}
              {inputFile !== '' ? (
                <PencilIcon className="ml-3 -mr-1 h-5 w-5" aria-hidden="true" />
              ) : (
                <UploadIcon className="ml-3 -mr-1 h-5 w-5" aria-hidden="true" />
              )}
            </>
          )}
        </button>
      </div>
    </div>
  );
}
