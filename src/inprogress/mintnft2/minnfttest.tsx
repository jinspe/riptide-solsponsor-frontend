import React from 'react';
// import { mintNFT } from '@metaplex/js/lib/actions';
import { Wallet } from '@metaplex/js';
import { useWallet } from '@solana/wallet-adapter-react';
import mintNftTool from './nftTansac';
import { metadataTest } from './MintDataTemp';

const buttonClass =
  'inline-flex items-center px-2.5 py-1.5' +
  'border border-transparent text-xs font-medium rounded ' +
  'text-indigo-700 bg-indigo-100 hover:bg-indigo-200 ' +
  'focus:outline-none focus:ring-2 focus:ring-offset-2 ' +
  'focus:ring-indigo-500';

export default function MintButton(): JSX.Element {
  const myCustomerWallet = useWallet();
  async function transacc() {
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
      console.log('mint Nft');
      const metadata = metadataTest;
      const uri =
        'https://firebasestorage.googleapis.com/v0/b/mefren-dev.appspot.com/o/nft%2Fjson%2FtokenMetada.json?alt=media&token=5ae1a6d6-2a80-489d-ac6e-3ca8045417e7';
      await mintNftTool(metadata, uri, customerMetaWallet);
    }
  }
  return (
    <div>
      <button type="button" className={buttonClass} onClick={transacc}>
        mintNftTool
      </button>
    </div>
  );
}
