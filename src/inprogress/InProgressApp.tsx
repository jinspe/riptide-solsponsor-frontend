import React from 'react';
import { useRecoilState } from 'recoil';
import {
  userPublicKeyAtom,
  userProfileImageAtom,
} from 'services/Recoil/userInfo';
import {
  CheckInTheBack,
  VerifyTransaction,
  SolanaTransaction,
} from './SolanaTransaction';
import SinginsFunc from './util/SinginsFunc';
import MintButton from './mintnft2/minnfttest';
import CKeditorC from './postMaker/CKeditorC';
import CKeditsource from './postMaker/CkeditSource';

const buttonClass =
  'inline-flex items-center px-2.5 py-1.5' +
  'border border-transparent text-xs font-medium rounded ' +
  'text-indigo-700 bg-indigo-100 hover:bg-indigo-200 ' +
  'focus:outline-none focus:ring-2 focus:ring-offset-2 ' +
  'focus:ring-indigo-500';

export default function InProgressApp(): JSX.Element {
  const [userPublicKey, setUserPubKey] = useRecoilState(userPublicKeyAtom);

  return (
    <div className="max-w-5xl mx-auto">
      <p>test buttons</p>
      {/* <SolanaTransaction />
      <VerifyTransaction />
      <CheckInTheBack />
      <MintButton /> 
      <CKeditorC /> 
      <CKeditsource /> */}
      <SinginsFunc />
      <h1 className="mtext-t0">POPO</h1>
      <h1 className="mtext-t0">POPO</h1>
      <h1 className="mtext-t0">POPO</h1>
      <h1 className="mtext-t0">POPO</h1>
      <h1 className="mtext-t0">POPO</h1>
      <h1 className="mtext-t0">POPO</h1>
      <h1 className="mtext-t0">POPO</h1>
      <h1 className="mtext-t0">POPO</h1>
      <h1 className="mtext-t0">POPO</h1>
      <h1 className="mtext-t0">POPO</h1>
      <h1 className="mtext-t0">POPO</h1>
      <h1 className="mtext-t0">POPO</h1>
      <h1 className="mtext-t0">POPO</h1>
      <h1 className="mtext-t0">POPO</h1>
      <h1 className="mtext-t0">POPO</h1>
      <h1 className="mtext-t0">POPO</h1>
      <h1 className="mtext-t0">POPO</h1>
      <h1 className="mtext-t0">POPO</h1>
      <h1 className="mtext-t0">POPO</h1>
      <h1 className="mtext-t0">POPO</h1>
      <h1 className="mtext-t0">POPO</h1>
      <h1 className="mtext-t0">POPO</h1>
      <h1 className="mtext-t0">POPO</h1>
      <h1 className="mtext-t0">POPO</h1>
      <h1 className="mtext-t0">POPO</h1>
      <h1 className="mtext-t0">POPO</h1>
      <h1 className="mtext-t0">POPO</h1>
      <h1 className="mtext-t0">POPO</h1>
      <h1 className="mtext-t0">POPO</h1>
      <h1 className="mtext-t0">POPO</h1>
      <h1 className="mtext-t0">POPO</h1>
      <h1 className="mtext-t0">POPO</h1>
      <h1 className="mtext-t0">POPO</h1>
      <h1 className="mtext-t0">POPO</h1>
      <h1 className="mtext-t0">POPO</h1>
      <h1 className="mtext-t0">POPO</h1>
      <h1 className="mtext-t0">POPO</h1>
      <h1 className="mtext-t0">POPO</h1>
      <h1 className="mtext-t0">POPO</h1>
      <h1 className="mtext-t0">POPO</h1>
      <h1 className="mtext-t0">POPO</h1>
      <h1 className="mtext-t0">POPO</h1>
      <h1 className="mtext-t0">POPO</h1>
      <h1 className="mtext-t0">POPO</h1>
      <h1 className="mtext-t0">POPO</h1>
      <h1 className="mtext-t0">POPO</h1>
      <h1 className="mtext-t0">POPO</h1>
      <h1 className="mtext-t0">POPO</h1>
      <h1 className="mtext-t0">POPO</h1>
      <h1 className="mtext-t0">POPO</h1>
      <h1 className="mtext-t0">POPO</h1>
      <h1 className="mtext-t0">POPO</h1>
      <h1 className="mtext-t0">POPO</h1>
      <h1 className="mtext-t0">POPO</h1>
      <h1 className="mtext-t0">POPO</h1>
      <h1 className="mtext-t0">POPO</h1>
    </div>
  );
}
