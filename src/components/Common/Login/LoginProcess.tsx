import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { LogoSmall } from 'components/Common/Util/LogoText';

import WalletButton from 'components/SolanaWallet/WalletButton';
import Spinner from 'components/Common/Util/Spinner';

import { loginStepAtom } from 'services/Utils/Recoil/appState';

type IloginMessage = {
  message: string;
};
export default function LoginProcess({ message }: IloginMessage): JSX.Element {
  const loginStep = useRecoilValue(loginStepAtom);
  const [logMessage, setLogMessage] = useState('');

  useEffect(() => {
    switch (loginStep) {
      // 'receiving' | 'sign' | 'verify'
      case 'receiving':
        setLogMessage('Waiting for the message to sign');
        break;
      case 'sign':
        setLogMessage('Please sign the message');
        break;
      case 'verify':
        setLogMessage('Verifying the signature');
        break;
      default:
        setLogMessage('');
    }
  }, [loginStep]);

  return (
    <div className="min-h-full pt-4 pb-12 flex flex-col ">
      <main
        className="  flex-grow flex flex-col 
      justify-center 
       w-full mx-auto ">
        <div className="flex-shrink-0 flex justify-center">
          <div className=" transform scale-150 ">
            <LogoSmall />
          </div>
        </div>
        <h1
          className="mt-4 text-xl text-center font-extrabold 
              text-neutral-900 dark:text-neutral-100
             leading-tight">
          Sign in to your account <br /> or create a new one.
        </h1>
        <p
          className="mt-1 text-base 
        font-semibold text-center text-neutral-500 max-w-md mx-auto">
          {message}
        </p>
        <div
          className="bg-neutral-200 dark:bg-neutral-800 rounded-lg w-64 
         mx-auto p-2 mt-2">
          <div className=" mx-auto">
            <div
              className="text-center font-bold text-black 
            dark:text-neutral-100 text-lg">
              Login with your wallet.
            </div>
            <div className="mx-auto w-36 pl-3 mt-2  ">
              <WalletButton />
            </div>
            <div
              className="mt-2 text-xs font-semibold text-center 
            text-neutral-500">
              We will ask you to sign an unique message with your wallet to
              verify that you own it.
            </div>
          </div>
          {logMessage !== '' && (
            <div
              className="mt-2 flex  text-black 
            dark:text-neutral-100 mx-auto ">
              <p
                className="text-sm text-left mt-0.5 
              font-semibold mx-auto flex">
                <Spinner classExtend="h-6 mx-1 -mt-0.5  " />
                {logMessage}
              </p>
            </div>
          )}
        </div>

        <div>
          <p
            className="text-black mt-2 
          dark:text-neutral-200 text-center font-semibold">
            Comming Soon!
          </p>

          <div
            className="bg-neutral-200 dark:bg-neutral-800 rounded-lg w-64 
         mx-auto p-2 mt-1 opacity-30">
            <div className=" mx-auto">
              <div
                className="text-center font-bold text-black 
            dark:text-neutral-100 text-lg">
                Login with a QR code.
              </div>
              <div className="mx-auto  w-36 mt-2  ">
                <button
                  type="button"
                  className="button-action w-36 text-center"
                  disabled>
                  <p className="text-center pl-2">Scan QR code</p>
                </button>
              </div>
              <div
                className="mt-2 text-xs font-semibold text-center 
            text-neutral-500">
                Scan a QR code from an authenticate session (mobile)
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
