import React from 'react';
import {
  CheckInTheBack,
  VerifyTransaction,
  SolanaTransaction,
} from './SolanaTransaction';

import MintButton from './mintnft2/minnfttest';
import CKeditorC from './postMaker/CKeditorC';
import CKeditsource from './postMaker/CkeditSource';

export default function InProgressApp(): JSX.Element {
  return (
    <div className="max-w-5xl mx-auto">
      <p>test buttons</p>
      {/* <SolanaTransaction />
      <VerifyTransaction />
      <CheckInTheBack />
      <MintButton /> 
      <CKeditorC /> */}
      <CKeditsource />
    </div>
  );
}
