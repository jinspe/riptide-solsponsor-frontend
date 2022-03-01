import React, { useState } from 'react';

import NFTFileInput from 'components/Creators/EditPosts/EditNFTPosts/NFTFileInput';
import {
  UploadMetadata,
  Iattribute,
} from 'services/Firebase/WriteData/NFTPostUtil';

import WalletButton from 'components/SolanaWallet/WalletButton';
import { useWallet } from '@solana/wallet-adapter-react';
import { Wallet } from '@metaplex/js';

import NFTFrom from 'components/Creators/EditPosts/EditNFTPosts/NFTForm';

import {
  MetadataJson,
  MetadataJsonAttribute,
  MetadataJsonCollection,
  MetadataJsonProperties,
  MetadataJsonFile,
  MetadataJsonCreator,
} from 'services/Solana/Metaplex/MetadataTypes';

import CreateMasterEdition from 'services/Solana/Metaplex/CreateMasterEdition';
import MintPrint, { SendNFT } from 'services/Solana/Metaplex/MintPrint';

type IeditNFTPostPage = {
  postId: string | undefined;
};
export default function EditNFTPostPage({
  postId,
}: IeditNFTPostPage): JSX.Element {
  const myCustomerWallet = useWallet();

  async function createNFT() {
    const creator: MetadataJsonCreator[] = [
      {
        address: 'FRvXcz7BLbc8KMyuZ9F5kgMCwuF4DJzCQSsGHc6WBLzJ',
        verified: true,
        share: 95,
      },
      {
        address: 'Hpp7d9K4Yd4w36rxAUvAjn6vu9Qf42XShbC2sBkEGdZv',
        verified: false,
        share: 5,
      },
    ];
    const files: MetadataJsonFile[] = [
      {
        uri: 'https://ipfs.io/ipfs/QmcSdKMcJmkbY4J7EkNTUDbEPa6Tj2QM7tDZFATghXAU9k',
        type: 'image/png',
      },
    ];
    const collection: MetadataJsonCollection = {
      name: 'string',
      family: 'string',
    };
    const properties: MetadataJsonProperties = {
      files, // MetadataJsonFile[];
      category: 'image', // MetaDataJsonCategory;
      creators: creator, // MetadataJsonCreator[];
    };

    const attributes: MetadataJsonAttribute[] = [
      {
        trait_type: 'hair',
        value: 'blue',
      },
      {
        trait_type: 'background',
        value: 'green',
      },
    ];
    const meta: MetadataJson = {
      name: 'string',
      symbol: 'string',
      description: 'string',
      seller_fee_basis_points: 690,
      image: 'string',
      animation_url: 'string',
      external_url: 'string',
      attributes,
      collection,
      properties,
    };

    if (
      myCustomerWallet.publicKey &&
      myCustomerWallet.signTransaction &&
      myCustomerWallet.signAllTransactions
    ) {
      const customerMetaWallet: Wallet = {
        publicKey: myCustomerWallet.publicKey,
        signTransaction: myCustomerWallet.signTransaction,
        signAllTransactions: myCustomerWallet.signAllTransactions,
      };
      const uri =
        'https://firebasestorage.googleapis.com/v0/b/mefren-dev.appspot.com/o/nft%2Fjson%2FtokenMetada.json?alt=media&token=48bdb770-9ada-47d0-b3fe-cdcc6bb460bb';

      await CreateMasterEdition(meta, uri, customerMetaWallet);
    }
  }

  async function createPrint() {
    console.log('createPrint');

    if (
      myCustomerWallet.publicKey &&
      myCustomerWallet.signTransaction &&
      myCustomerWallet.signAllTransactions
    ) {
      const customerMetaWallet: Wallet = {
        publicKey: myCustomerWallet.publicKey,
        signTransaction: myCustomerWallet.signTransaction,
        signAllTransactions: myCustomerWallet.signAllTransactions,
      };
      await MintPrint(customerMetaWallet);
    }
  }

  async function sendPrint() {
    console.log('createPrint');

    if (
      myCustomerWallet.publicKey &&
      myCustomerWallet.signTransaction &&
      myCustomerWallet.signAllTransactions
    ) {
      const customerMetaWallet: Wallet = {
        publicKey: myCustomerWallet.publicKey,
        signTransaction: myCustomerWallet.signTransaction,
        signAllTransactions: myCustomerWallet.signAllTransactions,
      };
      await SendNFT(customerMetaWallet, myCustomerWallet.sendTransaction);
    }
  }

  return (
    <div className="pageFrame overflow-hidden pb-32">
      <p>{postId}</p>
      <NFTFrom />
      <div>
        <WalletButton />
        <div>
          Mint NFT
          <button type="button" className="button-action" onClick={createNFT}>
            Create master Edition
          </button>
          <button type="button" className="button-action" onClick={createPrint}>
            Create a print
          </button>
          <button type="button" className="button-action" onClick={sendPrint}>
            send a print
          </button>
        </div>
      </div>
    </div>
  );
}
