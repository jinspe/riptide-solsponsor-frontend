import {
  Connection,
  clusterApiUrl,
  PublicKey,
  sendAndConfirmTransaction,
  sendAndConfirmRawTransaction,
  Signer,
} from '@solana/web3.js';
// import { MintLayout } from '@solana/spl-token';
import { programs, actions, Wallet } from '@metaplex/js';
// import { prepareTokenAccountAndMintTxs } from '@metaplex/js/lib/actions';
import BN from 'bn.js';
// import { transactions } from '@metaplex/js';
import { Transaction } from '@metaplex-foundation/mpl-core';

import { MetadataJson } from './MetadataTypes';

export interface SelfMetadata {
  metadata: MetadataJson;
  uri: string;
  customerWallet: Wallet;
}

export default async function CreateMasterEdition(
  metadata: MetadataJson,
  uri: string,
  customerWallet: Wallet
): Promise<void> {
  /*
      createMintTx,
          createMetadataTx,
          createAssociatedTokenAccountTx,
          mintToTx,
          masterEditionTx,
          TXtransaction,
          updateMetadataTx,
          */
  /*  const myPublicKey = new PublicKey(
    'Hpp7d9K4Yd4w36rxAUvAjn6vu9Qf42XShbC2sBkEGdZv'
  );
  const mySecretKey = new Uint8Array([
    140, 218, 232, 206, 232, 234, 244, 7, 170, 44, 112, 238, 27, 226, 233, 36,
    242, 175, 230, 26, 6, 77, 166, 237, 216, 121, 108, 32, 5, 107, 88, 35, 249,
    250, 143, 160, 3, 143, 92, 227, 54, 212, 7, 232, 96, 75, 79, 9, 127, 57,
    197, 246, 179, 192, 137, 168, 169, 5, 203, 94, 145, 41, 23, 13,
  ]); */
  const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
  const myPublicKey = new PublicKey(
    'Hpp7d9K4Yd4w36rxAUvAjn6vu9Qf42XShbC2sBkEGdZv'
  );

  // createMintTx
  const { mint, createMintTx, createAssociatedTokenAccountTx, mintToTx } =
    await actions.prepareTokenAccountAndMintTxs(
      connection,
      customerWallet.publicKey
    );

  const metadataPDA = await programs.metadata.Metadata.getPDA(mint.publicKey);
  const editionPDA = await programs.metadata.MasterEdition.getPDA(
    mint.publicKey
  );
  const {
    name,
    symbol,
    seller_fee_basis_points,
    properties: { creators },
  } = metadata;

  // For the signature
  const creatorsData = creators.reduce<programs.metadata.Creator[]>(
    (memo, { address, share }) => {
      const verified = address === customerWallet.publicKey.toString();

      const creator = new programs.metadata.Creator({
        address,
        share,
        verified,
      });
      const nmemo = [...memo, creator];
      return nmemo;
    },
    []
  );

  const metadataData = new programs.metadata.MetadataDataData({
    name,
    symbol,
    uri,
    sellerFeeBasisPoints: seller_fee_basis_points,
    creators: creatorsData,
  });

  const createMetadataTx = new programs.metadata.CreateMetadata(
    {
      feePayer: customerWallet.publicKey,
    },
    {
      metadata: metadataPDA,
      metadataData,
      updateAuthority: customerWallet.publicKey, // destKey,
      mint: mint.publicKey,
      mintAuthority: customerWallet.publicKey,
    }
  );

  const masterEditionTx = new programs.metadata.CreateMasterEdition(
    { feePayer: customerWallet.publicKey },
    {
      edition: editionPDA,
      metadata: metadataPDA,
      updateAuthority: customerWallet.publicKey, // destKey,
      mint: mint.publicKey,
      mintAuthority: customerWallet.publicKey,
      maxSupply: undefined,
    }
  );

  const updateMetadataTx = new programs.metadata.UpdateMetadata(
    { feePayer: customerWallet.publicKey },
    {
      metadata: metadataPDA,
      updateAuthority: customerWallet.publicKey, // destKey,
      newUpdateAuthority: myPublicKey,
      primarySaleHappened: true,
    }
  );

  console.log(
    connection,
    [mint],
    createMintTx,
    createMetadataTx,
    createAssociatedTokenAccountTx,
    mintToTx,
    masterEditionTx
  );

  const txId = await actions.sendTransaction({
    connection,
    signers: [mint],
    txs: [
      createMintTx,
      createMetadataTx,
      createAssociatedTokenAccountTx,
      mintToTx,
      masterEditionTx,
      updateMetadataTx,
    ],
    wallet: customerWallet,
  });

  console.log(txId);
  console.log(mint.publicKey.toString());

  /* const signers = [mint];
  const txs = [
    createMintTx,
    createMetadataTx,
    createAssociatedTokenAccountTx,
    mintToTx,
    masterEditionTx,
  ]; */

  // work
  /* const txId = await actions.sendTransaction({
      connection,
      signers: [mint],
      txs: [
        createMintTx,
        createMetadataTx,
        createAssociatedTokenAccountTx,
        mintToTx,
        masterEditionTx,
      ],
      wallet: customerWallet,
    }); */

  // doesn t work
  /* const tx = Transaction.fromCombined(txs, { feePayer: myPublicKey });
    tx.recentBlockhash = (await connection.getRecentBlockhash()).blockhash;
    if (signers.length) {
      tx.partialSign(...signers);
    }
    const mySigners = [{ publicKey: myPublicKey, secretKey: mySecretKey }];
    await tx.sign(...mySigners);
    console.log('signed bb');
  
    const res = await sendAndConfirmRawTransaction(connection, tx.serialize()); */
  // const res = await connection.sendRawTransaction(tx.serialize());
  // console.log(res);
  // tx = await customerWallet.signTransaction(tx);

  // works
  /* let tx = Transaction.fromCombined(txs, { feePayer: myPublicKey });
    tx.recentBlockhash = (await connection.getRecentBlockhash()).blockhash;
  
    if (signers.length) {
      tx.partialSign(...signers);
    }
    tx = await customerWallet.signTransaction(tx);
  
    const res = await connection.sendRawTransaction(tx.serialize()); */

  // doesn t work
  /*   const allTx = new Transaction().add(createMintTx);
  allTx.add(createMetadataTx);
  allTx.add(createAssociatedTokenAccountTx);
  allTx.add(mintToTx);
  allTx.add(masterEditionTx);

  const mySigners = [
    { publicKey: myPublicKey, secretKey: mySecretKey },
    signers,
  ];
  const mmsign = { publicKey: myPublicKey, secretKey: mySecretKey };
  const nSigner = [mmsign, mint];
  allTx.recentBlockhash = (await connection.getRecentBlockhash()).blockhash;
  // allTx.partialSign(...nSigner);
  console.log('partial');
  const res = await sendAndConfirmTransaction(connection, allTx, nSigner);
 */
  /* 
    const tx = Transaction.fromCombined(txs, { feePayer: myPublicKey });
    tx.recentBlockhash = (await connection.getRecentBlockhash()).blockhash;
  
    if (signers.length) {
      tx.partialSign(...signers);
    }
    const mySigners = [{ publicKey: myPublicKey, secretKey: mySecretKey }];
    const res = await sendAndConfirmTransaction(connection, tx, mySigners);
    const tx = Transaction.fromCombined(txs, { feePayer: myPublicKey });
    tx.recentBlockhash = (await connection.getRecentBlockhash()).blockhash;
  
    if (signers.length) {
      tx.partialSign(...signers);
    }
  
    // mySecretKey
    // myPublicKey
    const mySigners = [{ publicKey: myPublicKey, secretKey: mySecretKey }];
    await sendAndConfirmTransaction(connection, tx, mySigners); */

  // tx = await wallet.signTransaction(tx);
  // sendAndConfirmRawTransaction
  // return connection.sendRawTransaction(tx.serialize(), options);

  /* const mint = Keypair.generate();
    const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
    const mintRent = await connection.getMinimumBalanceForRentExemption(
      MintLayout.span
    );
  
    const createMintTx = new actions.transac
    CreateMint(
      { feePayer: owner },
      {
        newAccountPubkey: mint.publicKey,
        lamports: mintRent,
      }
    );
  
    const recipient = await Token.getAssociatedTokenAddress(
      ASSOCIATED_TOKEN_PROGRAM_ID,
      TOKEN_PROGRAM_ID,
      mint.publicKey,
      owner
    );
  
    const createAssociatedTokenAccountTx =
      new programs.CreateAssociatedTokenAccount(
        { feePayer: owner },
        {
          associatedTokenAddress: recipient,
          splTokenMintAddress: mint.publicKey,
        }
      );
  
    const mintToTx = new programs.MintTo(
      { feePayer: owner },
      {
        mint: mint.publicKey,
        dest: recipient,
        amount: 1,
      }
    ); */
  /* const { mint, createMintTx, createAssociatedTokenAccountTx, mintToTx } =
      await prepareTokenAccountAndMintTx(connection, customerWallet.publicKey); */
}
