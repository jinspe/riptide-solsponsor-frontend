import React from 'react';
import {
  CheckInTheBack,
  VerifyTransaction,
  SolanaTransaction,
} from './SolanaTransaction';
import MintButton from './mintnft2/minnfttest';

export default function InProgressApp(): JSX.Element {
  return (
    <div>
      <p>test buttons</p>
      <SolanaTransaction />
      <VerifyTransaction />
      <CheckInTheBack />
      <MintButton />
    </div>
  );
}
