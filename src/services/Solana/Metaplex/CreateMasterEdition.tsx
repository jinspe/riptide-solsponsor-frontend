import { Connection, clusterApiUrl } from '@solana/web3.js';
import { programs, actions, Wallet } from '@metaplex/js';
import BN from 'bn.js';

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
): Promise<string> {
  const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');

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
      maxSupply: new BN(0),
    }
  );

  const updateMetadataTx = new programs.metadata.UpdateMetadata(
    { feePayer: customerWallet.publicKey },
    {
      metadata: metadataPDA,
      updateAuthority: customerWallet.publicKey, // destKey,
      newUpdateAuthority: customerWallet.publicKey,
      primarySaleHappened: true,
    }
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

  return txId;
}
