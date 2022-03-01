import {
  Connection,
  clusterApiUrl,
  PublicKey,
  Transaction,
  sendAndConfirmTransaction,
  sendAndConfirmRawTransaction,
  Signer,
} from '@solana/web3.js';

// import { wa } from '@solana/wallet-adapter-react';

// import { MintLayout } from '@solana/spl-token';
import { programs, actions, Wallet } from '@metaplex/js';
// import { prepareTokenAccountAndMintTxs } from '@metaplex/js/lib/actions';
import BN from 'bn.js';
// import { transactions } from '@metaplex/js';
// import { Transaction } from '@metaplex-foundation/mpl-core';

// import {sendTrans}

/* eslint-disable import/no-relative-packages */
import * as splTT from '../../../../node_modules/@solana/spl-token';
// import * as splTT from '@solana/spl-token/';

/* import {
  Token,
  createTransferInstruction,
  TOKEN_PROGRAM_ID,
} from '@solana/spl-token'; */

import { MetadataJson } from './MetadataTypes';

export interface SelfMetadata {
  masterEditionMint: PublicKey;
  customerWallet: Wallet;
}

export default async function MintPrint(customerWallet: Wallet): Promise<void> {
  const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
  const myPublicKey = new PublicKey(
    'Hpp7d9K4Yd4w36rxAUvAjn6vu9Qf42XShbC2sBkEGdZv'
  );

  const meditMint = new PublicKey(
    'GfaEn2d2yeUnqktCGTraXhppTy4N8biD3XShXqiSgiCp'
  );

  const res = await actions.mintEditionFromMaster({
    connection,
    wallet: customerWallet,
    masterEditionMint: meditMint,
    updateAuthority: customerWallet.publicKey,
  });

  console.log(res);
}

export async function SendNFT(
  customerWallet: Wallet,
  sendTrans: any
): Promise<void> {
  const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
  const myPublicKey = new PublicKey(
    'Hpp7d9K4Yd4w36rxAUvAjn6vu9Qf42XShbC2sBkEGdZv'
  );

  /* const meditMint = new PublicKey(
    'GfaEn2d2yeUnqktCGTraXhppTy4N8biD3XShXqiSgiCp'
  ); */

  const SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID = new PublicKey(
    'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL'
  );

  const meditMint = new PublicKey(
    '4bcENgC9ixQHTbfAdveu1UgHKTnsBizMG1UNrieFHw32'
  );

  /* const array = await PublicKey.findProgramAddress(
    [
      myPublicKey.toBuffer(),
      splTT.TOKEN_PROGRAM_ID.toBuffer(),
      meditMint.toBuffer(),
    ],
    SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID
  );
  const associatedAddress = array[0];
  console.log(associatedAddress.toString());  */

  /* const associatedDestinationTokenAddr = await splTT.getAssociatedTokenAddress(
    mintToken.associatedProgramId,
    mintToken.programId,
    mintPublicKey,
    destPublicKey
  ); */

  // console.log(splToken.TOKEN_PROGRAM_ID);
  /* const txs = splTT.createTransferInstruction(
    associatedAddress,
    myPublicKey,
    customerWallet.publicKey,
    1000000,
    [],
    splTT.TOKEN_PROGRAM_ID
  ); */

  /* const txx = new Transaction().add(txs);
  await sendTrans(txx, connection); */

  // const txId = await actions.sendTransaction({ connection, customerWallet, txs });

  /* const txId = await actions.sendToken({
    connection,
    wallet: customerWallet,
    source: associatedAddress,
    destination: myPublicKey,
    mint: meditMint,
    amount: 1,
  }); */

  // console.log(txx);
  // customerWallet,meditMint,myPublicKey,1 })
  // actions.sendToken()
  /* const transaction = splToken.Token.createTransferInstruction(
    splToken.TOKEN_PROGRAM_ID,
    meditMint,
    myPublicKey,
    customerWallet.publicKey,
    [],
    1000000 
  ); */

  /* const transaction = new Transaction().add(
    splToken.Token.createTransferInstruction(
      splToken.TOKEN_PROGRAM_ID,
      meditMint,
      myPublicKey,
      customerWallet.publicKey,
      [],
      1000000 // This is transferring 1 token, not 1000000 tokens
    )
  ); */
}
