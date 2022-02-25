import React, { useState } from 'react';

import NFTFileInput from 'components/Creators/EditPosts/EditNFTPosts/NFTFileInput';
import {
  UploadMetadata,
  Iattribute,
} from 'services/Firebase/WriteData/NFTPostUtil';

export default function NFTForm(): JSX.Element {
  const [typeFile, setTypeFile] = useState('image');
  const [inputFile, setInputFile] = useState('');
  const [title, setTitle] = useState('');
  const [symbol, setSymbol] = useState('');

  const [description, setDescription] = useState('');

  function SaveMetadata() {
    const attrib: Iattribute = {
      trait_type: title,
      value: symbol,
    };
    UploadMetadata(title, description, [attrib], inputFile);
    console.log('saveMetadata');
  }
  return (
    <div>
      <p>Create NFt</p>
      <div>
        <NFTFileInput inputFile={inputFile} setInputFile={setInputFile} />
      </div>
      <div>
        <img src={inputFile} className="h-auto w-auto" alt="fileInput" />
      </div>

      <div className=" block text-center">Description</div>
      <div className="mt-1 flex">
        <textarea
          id="about"
          name="about"
          rows={3}
          className="w-2/3 mx-auto rounded-lg p-2"
          autoComplete="off"
          maxLength={140}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="mt-2 block text-center">Title</div>
      <div className="w-full">
        <input
          type="text"
          name="link"
          id="link"
          autoComplete="off"
          className=" rounded-lg block mx-auto p-1 w-4/6 "
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="mt-2 block text-center">Symbol</div>
      <div className="w-full">
        <input
          type="text"
          name="link"
          id="link"
          autoComplete="off"
          className=" rounded-lg block mx-auto p-1 w-4/6 "
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
        />
      </div>

      <div className="mt-2 block text-center">Attribute Type</div>
      <div className="w-full">
        <input
          type="text"
          name="link"
          id="link"
          autoComplete="off"
          className=" rounded-lg block mx-auto p-1 w-4/6 "
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
        />
      </div>
      <div className="mt-2 block text-center">Attribute Value</div>
      <div className="w-full">
        <input
          type="text"
          name="link"
          id="link"
          autoComplete="off"
          className=" rounded-lg block mx-auto p-1 w-4/6 "
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
        />
      </div>

      <div>
        <button
          type="button"
          className="button-action mt-3"
          onClick={SaveMetadata}>
          Save the NFT Metadata
        </button>
      </div>
    </div>
  );
}
