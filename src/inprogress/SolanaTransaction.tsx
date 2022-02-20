import React from 'react';
import {
  clusterApiUrl,
  Connection,
  SystemProgram,
  Transaction,
  PublicKey,
  sendAndConfirmTransaction,
} from '@solana/web3.js';
import { mintNFT } from '@metaplex/js/lib/actions';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { toast } from 'react-toastify';

import { checkTransacFunction } from 'services/Firebase/CloudFunctions';

const buttonClass =
  'inline-flex items-center px-2.5 py-1.5' +
  'border border-transparent text-xs font-medium rounded ' +
  'text-indigo-700 bg-indigo-100 hover:bg-indigo-200 ' +
  'focus:outline-none focus:ring-2 focus:ring-offset-2 ' +
  'focus:ring-indigo-500';

export function MintNft(): JSX.Element {
  const { connection } = useConnection();

  async function transacc() {
    console.log('mint Nft');
  }
  return (
    <div>
      <button type="button" className={buttonClass} onClick={transacc}>
        CheckInTheBack
      </button>
    </div>
  );
}

export function SolanaTransaction(): JSX.Element {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();

  async function transacc() {
    console.log('transac');
    if (!publicKey) return;
    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: publicKey,
        toPubkey: new PublicKey('FRvXcz7BLbc8KMyuZ9F5kgMCwuF4DJzCQSsGHc6WBLzJ'),
        lamports: 10000,
      })
    );
    // Hni3vbpzJhggAhKte5AuaiRFNBhCX1VGzymroTt3rcDP
    transaction.add(
      SystemProgram.transfer({
        fromPubkey: publicKey,
        toPubkey: new PublicKey('Hni3vbpzJhggAhKte5AuaiRFNBhCX1VGzymroTt3rcDP'),
        lamports: 20000,
      })
    );

    const signature = await sendTransaction(transaction, connection);
    console.log(signature);

    await connection.confirmTransaction(signature, 'processed');
    console.log('confirmTransaction', signature);
    console.log(`https://explorer.solana.com/tx/${signature}?cluster=devnet`);
    // toast.success(`https://explorer.solana.com/tx/${signature}?cluster=devnet`);
    toast.success(
      <div>
        <a
          href={`https://explorer.solana.com/tx/${signature}?cluster=devnet`}
          rel="noreferrer"
          target="_blank"
          className="text-indigo-500 underline ">
          This is a link
        </a>
      </div>
    );
  }
  return (
    <div>
      <button type="button" className={buttonClass} onClick={transacc}>
        transaction
      </button>
    </div>
  );
}

export function VerifyTransaction(): JSX.Element {
  const { connection } = useConnection();

  async function transacc() {
    console.log('look transac');
    const values = await connection.getParsedTransaction(
      '3N39MrUEhDDEJBQtDkMhHha5eYVgNbvBhp759Xs4tzzqtwYVgADmqDPUYhC9uXa6GzTReZCZogAFThjGmN7bVQFS'
    );
    console.log(values);
  }
  return (
    <div>
      <button type="button" className={buttonClass} onClick={transacc}>
        look transac
      </button>
    </div>
  );
}

export function CheckInTheBack(): JSX.Element {
  const { connection } = useConnection();

  async function transacc() {
    console.log('CheckInTheBack');
    const values = await checkTransacFunction(
      '3N39MrUEhDDEJBQtDkMhHha5eYVgNbvBhp759Xs4tzzqtwYVgADmqDPUYhC9uXa6GzTReZCZogAFThjGmN7bVQFS'
    );
    console.log(values);
  }
  return (
    <div>
      <button type="button" className={buttonClass} onClick={transacc}>
        CheckInTheBack
      </button>
    </div>
  );
}
// MscH27UVmjfgku53m7xHLpbarXfGHXKerCxFxEyFe9ndwE7tAKP9JNazjnNo4Usr6ftPxPfg8TKoeAnw2hM8cxH
