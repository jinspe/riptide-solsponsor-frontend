import React, { useState, useEffect } from 'react';
import { CheckIcon } from '@heroicons/react/solid';
import { useRecoilValue, useRecoilState } from 'recoil';
import {
  SystemProgram,
  Transaction,
  PublicKey,
  LAMPORTS_PER_SOL,
} from '@solana/web3.js';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { toast } from 'react-toastify';

import { FirebaseAuth } from 'services/Firebase/FirebaseConfig';
import { VerifyTransaction } from 'services/Firebase/CloudFunctions/VerifyTransaction';
import {
  userPublicKeyAtom,
  userMembershipsAtom,
} from 'services/Utils/Recoil/userInfo';

import {
  TimestampToExpiration,
  DAYTIMESTAMP,
} from 'services/Utils/Functions/TimeFunctions';

import WalletButton from 'components/SolanaWallet/WalletButton';
import Spinner from 'components/Common/Util/Spinner';
import ClassNamesLogic from 'components/Common/Util/ClassNamesLogic';

import { Icreator, Imembership, TtransactionSate } from 'types/types';

import MintingStep from './MintingStep';

type TcheckoutWallet = {
  price: number;
  creatorInfos: Icreator | undefined;
  membershipTime: number;
};

export default function CheckoutSection({
  price,
  creatorInfos,
  membershipTime,
}: TcheckoutWallet): JSX.Element {
  const { connected, publicKey, sendTransaction } = useWallet();
  const { connection } = useConnection();

  // connect | checkout| checking | mint | minting
  const [transactionState, setTransactionState] =
    useState<TtransactionSate>('connect');

  const [paymentState, setPaymentState] = useState<string | undefined>();
  const [transacSignature, setTransacSignature] = useState<
    string | undefined
  >();
  const [updatingProfile, setUpdatingProfile] = useState(false);

  const userPublicKey = useRecoilValue(userPublicKeyAtom);

  const creatingMessage = 'Creating transaction ...';
  const waitingToSign = 'Sending transaction ...';

  const [membershipsRecoil, setMembershipRecoil] =
    useRecoilState(userMembershipsAtom);

  const [currentMembership, setCurrentMembership] = useState<
    Imembership | undefined
  >();

  const [expiration, setExpiration] = useState(
    TimestampToExpiration(currentMembership?.expiration)
  );

  function updateExpiration() {
    let newTime = DAYTIMESTAMP * membershipTime;
    if (currentMembership?.expiration !== undefined) {
      newTime += parseFloat(currentMembership?.expiration);
    } else {
      newTime += new Date().getTime();
    }
    setExpiration(TimestampToExpiration(newTime));
    return price;
  }

  useEffect(() => {
    setCurrentMembership(
      membershipsRecoil.find((element) => element.cId === creatorInfos?.uId)
    );
  }, [creatorInfos]);

  useEffect(() => {
    if (transactionState === 'checkout' || transactionState === 'connect') {
      updateExpiration();
    }
  }, [membershipTime, currentMembership, transactionState]);

  useEffect(() => {
    if (connected) {
      setTransactionState('checkout');
    } else {
      setTransactionState('connect');
    }
  }, [connected]);

  async function updateProfilePermission(signature: string) {
    try {
      await VerifyTransaction(signature);
      // refresh user locally
      await FirebaseAuth.currentUser?.getIdToken(true);
      const userTokens = await FirebaseAuth.currentUser?.getIdTokenResult();
      const claims = userTokens?.claims;
      const memberships: Imembership[] = [];
      if (claims !== undefined) {
        Object.keys(claims).forEach((key) => {
          if (key.length === 44) {
            memberships.push({
              cId: key,
              expiration: String(claims[key]),
            });
          }
        });
      }
      setMembershipRecoil(memberships);
      setCurrentMembership(
        memberships.find((element) => element.cId === creatorInfos?.uId)
      );

      toast.success('Your membership has been updated!');
    } catch (error: any) {
      toast.error(error?.message);
    }
  }

  async function handleCheckout() {
    const priceAtcheckout = price;
    setPaymentState(creatingMessage);
    setTransactionState('checking');
    if (publicKey && creatorInfos?.uId !== undefined) {
      try {
        // Creating Transaction
        const transaction = new Transaction().add(
          SystemProgram.transfer({
            fromPubkey: publicKey,
            toPubkey: new PublicKey(creatorInfos.uId),
            lamports: priceAtcheckout * LAMPORTS_PER_SOL,
          })
        );
        // Sending  Transaction
        setPaymentState(waitingToSign);
        const signature = await sendTransaction(transaction, connection);
        await connection.confirmTransaction(signature, 'processed');
        // Setting success transaction
        setTransacSignature(signature);
        toast.success(
          `Transaction successful https://explorer.solana.com/tx/${signature}?cluster=devnet`
        );
        // Verifying transaction updating profile
        setPaymentState(undefined);
        setUpdatingProfile(true);
        await updateProfilePermission(signature);
        setTransactionState('file');
        setUpdatingProfile(false);
      } catch (error: any) {
        toast.error(error?.message);
        setPaymentState(undefined);
        setUpdatingProfile(false);
        setTransactionState('checkout');
      }
    }
  }

  return (
    <div className="mt-5 mb-5 space-y-5">
      <p className=" text-2xl text-center font-bold text-primary">
        Checkout with your wallet
      </p>
      {/* Step 1 Connect Wallet */}
      <div
        className={ClassNamesLogic(
          transactionState === 'connect' ? 'opacity-100' : 'opacity-50',
          ''
        )}>
        <p className="mt-3 text-lg text-center font-medium text-primary">
          1. Connect your wallet
        </p>
        <div className="flex justify-center mt-3">
          <div className=" mx-auto">
            <WalletButton />
          </div>
        </div>
      </div>

      {/* Step 2 Checkout */}
      <div
        className={ClassNamesLogic(
          transactionState === 'checkout' || transactionState === 'checking'
            ? 'opacity-100'
            : 'opacity-50',
          ''
        )}>
        <p className="mt-4 text-lg text-center font-medium text-primary">
          2. Checkout
        </p>

        <div className="flex justify-center mt-3">
          <button
            type="button"
            className="button-action w-32 "
            onClick={() => handleCheckout()}
            disabled={transactionState !== 'checkout'}>
            <div className="mx-auto">
              {transactionState === 'checking' ? (
                <Spinner classExtend="h-6 mx-1 -mt-0.5  " />
              ) : (
                <p>Checkout</p>
              )}
            </div>
          </button>
        </div>
      </div>
      <div>
        {/* Displaying Payment state */}
        {paymentState !== undefined && (
          <div className=" flex text-primary mx-auto ">
            <div
              className="text-base flex items-center gap-x-2 mt-0.5 
    font-semibold mx-auto ">
              <Spinner classExtend="h-6 " />
              {paymentState}
            </div>
          </div>
        )}
        {/* Displaying signature */}
        {transacSignature !== undefined &&
          (transactionState === 'mint' ||
            transactionState === 'minting' ||
            transactionState === 'file' ||
            transactionState === 'finish') && (
            <div className=" text-center text-primary mx-auto ">
              <div
                className=" justify-center text-center text-primary
            text-base flex items-center gap-x-2 mt-0.5 
            font-semibold mx-auto">
                <CheckIcon className="h-6 " />
                Transaction Successful
              </div>
              <div className="max-w-md mx-auto leading-none">
                <a
                  href={`https://explorer.solana.com/tx/${transacSignature}?cluster=devnet`}
                  className="text-xs leading-none font-medium 
              mx-auto text-link italic break-words underline ">
                  {`https://explorer.solana.com/tx/${transacSignature}?cluster=devnet`}
                </a>
              </div>
            </div>
          )}

        {/* Cloud function statue */}
        {updatingProfile && (
          <div className="flex mt-4 text-primary mx-auto ">
            <div
              className="text-base flex items-center gap-x-2 mt-0.5 
   font-semibold mx-auto ">
              <Spinner classExtend="h-6 " />
              Updating your profile
            </div>
          </div>
        )}
      </div>
      {/* Step 3 Mint receipt */}
      <MintingStep
        creatorInfos={creatorInfos}
        expiration={expiration}
        userPublicKey={userPublicKey}
        transactionState={transactionState}
        setTransactionState={setTransactionState}
      />
      {/* Create a new transaction */}
      {(transactionState === 'mint' || transactionState === 'finish') && (
        <div>
          <div className="flex justify-center pt-5">
            <button
              type="button"
              className="button-action "
              onClick={() => setTransactionState('checkout')}>
              <div className="mx-auto">Create a new transaction</div>
            </button>
          </div>
          <p className="mt-2 text-base text-secondary text-center">
            Reset the checkout process and <br /> add time to your membership.
          </p>
        </div>
      )}
    </div>
  );
}
