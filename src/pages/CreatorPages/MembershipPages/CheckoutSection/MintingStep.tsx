import React, { useState, useEffect } from 'react';
import * as htmlToImage from 'html-to-image';
import { useRecoilState } from 'recoil';
import { CheckIcon } from '@heroicons/react/solid';

import MemberCard from 'components/Creators/Membership/MemberCard';
import Spinner from 'components/Common/Util/Spinner';
import ClassNamesLogic from 'components/Common/Util/ClassNamesLogic';

import { getMembershipsTransaction } from 'services/Firebase/GetData/UserUtils';

import { MetadataJson } from 'services/Solana/Metaplex/MetadataTypes';

import { useWallet } from '@solana/wallet-adapter-react';

import { Wallet } from '@metaplex/js';

import { refreshMembershipAtom } from 'services/Utils/Recoil/appState';

import CreateMasterEdition from 'services/Solana/Metaplex/CreateMasterEdition';

import {
  SaveNFTImage,
  SaveNFTJson,
} from 'services/Firebase/WriteData/UserSettings/Membership';

import CreateMetadata from 'services/Solana/Metaplex/CreateMetadata';

import { defaultTierImage } from 'components/Common/Util/DefaultValues';
import { Icreator, TtransactionSate } from 'types/types';
import { toast } from 'react-toastify';

type TmintingStep = {
  creatorInfos: Icreator | undefined;
  expiration: string;
  userPublicKey: string | undefined;
  transactionState: TtransactionSate;
  setTransactionState: React.Dispatch<React.SetStateAction<TtransactionSate>>;
};

export default function MintingStep({
  creatorInfos,
  expiration,
  userPublicKey,
  transactionState,
  setTransactionState,
}: TmintingStep): JSX.Element {
  const NFTid = 'membuy';
  const wallet = useWallet();

  const [refreshMembership, setRefreshMembership] = useRecoilState(
    refreshMembershipAtom
  );

  const [metadataJson, setMetadataJson] = useState<MetadataJson | undefined>();
  const [metadataUri, setMetadatUri] = useState<string>('');
  const [nftImageUrl, setNftImageUrl] = useState<string>('');
  const [mintTransaction, setMintTransaction] = useState<string>('');

  async function captureMemberCard(): Promise<string> {
    const node = document.getElementById(NFTid);
    if (node) {
      const dataUrl = await htmlToImage.toPng(node, {
        canvasWidth: 960,
        canvasHeight: 1440,
      });

      return dataUrl;
    }
    throw new Error('Failed to generate Image');
  }

  async function generateFiles() {
    if (
      creatorInfos?.uId !== undefined &&
      creatorInfos?.displayName !== undefined &&
      creatorInfos?.tierTitle !== undefined &&
      userPublicKey !== undefined
    ) {
      try {
        const dataUrl = await captureMemberCard();
        const dataFetch = await fetch(dataUrl);
        const dataBlob = await dataFetch.blob();
        const imageUrl = await SaveNFTImage(dataBlob, creatorInfos.uId);
        setNftImageUrl(imageUrl);

        const transactionList = await getMembershipsTransaction(
          creatorInfos.uId
        );

        const jsonMade = CreateMetadata(
          userPublicKey,
          creatorInfos.uId,
          creatorInfos.displayName,
          creatorInfos.tierTitle,
          imageUrl,
          transactionList
        );
        setMetadataJson(jsonMade);
        const stringyJson = JSON.stringify(jsonMade);
        const jsonBlob = new Blob([stringyJson], { type: 'application/json' });
        const metadataUrl = await SaveNFTJson(jsonBlob, creatorInfos.uId);
        setMetadatUri(metadataUrl);
        setRefreshMembership(!refreshMembership);
      } catch (error: any) {
        toast.error(error?.message);
      }
    }
    setTransactionState('mint');
  }

  async function onMintNft() {
    setTransactionState('minting');
    if (
      metadataJson !== undefined &&
      metadataUri !== '' &&
      nftImageUrl !== ''
    ) {
      if (
        wallet.publicKey &&
        wallet.signTransaction &&
        wallet.signAllTransactions &&
        creatorInfos?.uId !== undefined
      ) {
        const customerMetaWallet: Wallet = {
          publicKey: wallet.publicKey,
          signTransaction: wallet.signTransaction,
          signAllTransactions: wallet.signAllTransactions,
        };
        try {
          const mintSignature = await CreateMasterEdition(
            metadataJson,
            metadataUri,
            creatorInfos.uId,
            customerMetaWallet
          );
          setMintTransaction(mintSignature);
          setTransactionState('finish');
          toast.success(
            `Minting successful https://explorer.solana.com/tx/${mintSignature}?cluster=devnet`
          );
        } catch (error: any) {
          toast.error(error?.message);
          setTransactionState('mint');
        }
      }
    }
  }

  useEffect(() => {
    if (transactionState === 'file') {
      generateFiles();
    }
  }, [transactionState]);

  return (
    <div>
      {transactionState === 'file' && (
        <div className="flex text-primary mx-auto ">
          <div
            className="text-base flex items-center gap-x-2 mt-0.5 
    font-semibold mx-auto ">
            <Spinner classExtend="h-6 " />
            generating your metadatas
          </div>
        </div>
      )}
      {(transactionState === 'finish' ||
        transactionState === 'mint' ||
        transactionState === 'minting') && (
        <div className="flex mt-2 text-primary mx-auto ">
          <div
            className="text-base flex items-center gap-x-2 mt-0.5 
   font-semibold mx-auto ">
            <CheckIcon className="h-6 " />
            Membership updated
          </div>
        </div>
      )}
      <div
        className={ClassNamesLogic(
          transactionState === 'mint' || transactionState === 'minting'
            ? 'opacity-100'
            : 'opacity-50',
          ''
        )}>
        <p className="mt-4 text-lg text-center font-medium text-primary leading-tight">
          3. Mint membership <br /> card as a NFT (optional)
        </p>
        <p className="mt-2 text-base text-secondary text-center">
          Mint a new NFT, if you already have one <br />
          the Metadata have been updated.
        </p>
        <div className="flex justify-center mt-3">
          <button
            type="button"
            className="button-action w-32 "
            disabled={transactionState !== 'mint'}
            onClick={() => onMintNft()}>
            <div className="mx-auto">
              {transactionState === 'minting' ? (
                <Spinner classExtend="h-6 mx-1 -mt-0.5  " />
              ) : (
                <p>Mint</p>
              )}
            </div>
          </button>
        </div>
        {transactionState === 'minting' && (
          <div className="flex text-primary mx-auto ">
            <div
              className="text-base flex items-center gap-x-2 mt-0.5 
    font-semibold mx-auto ">
              <Spinner classExtend="h-6 " />
              Sending transaction ...
            </div>
          </div>
        )}
      </div>
      {transactionState === 'finish' && (
        <div>
          <div className=" flex mt-2 text-primary mx-auto ">
            <div
              className="text-base flex items-center gap-x-2 mt-0.5 
   font-semibold mx-auto ">
              <CheckIcon className="h-6 " />
              NFT Minted
            </div>
          </div>
          <div className="max-w-md mx-auto text-center leading-none">
            <a
              href={`https://explorer.solana.com/tx/${mintTransaction}?cluster=devnet`}
              className="text-xs leading-none font-medium 
              mx-auto text-link italic break-words underline ">
              {`https://explorer.solana.com/tx/${mintTransaction}?cluster=devnet`}
            </a>
          </div>
        </div>
      )}
      {/* Member Card */}
      <div className=" mt-6 ">
        <p className=" text-lg font-medium text-primary text-center">
          Membership card preview
        </p>
        <div className="flex">
          <div
            className="transform scale-100 origin-top-left mt-2
                       mx-auto
                       rounded-lg
                    shadow-2xl">
            <MemberCard
              title={creatorInfos?.tierTitle ?? 'Buckle up!'}
              image={creatorInfos?.tierImage ?? defaultTierImage}
              userName={creatorInfos?.userName ?? ''}
              displayName={creatorInfos?.displayName ?? ''}
              expiration={expiration}
              creatorKey={creatorInfos?.uId ?? ''}
              minterKey={userPublicKey ?? ''}
              idx={NFTid}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
