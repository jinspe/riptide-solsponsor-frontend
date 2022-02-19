import React from 'react';
import {
  CheckInTheBack,
  VerifyTransaction,
  SolanaTransaction,
} from './SolanaTransaction';

export default function InProgressApp(): JSX.Element {
  return (
    <div>
      <p>test buttons</p>
      <SolanaTransaction />
      <VerifyTransaction />
      <CheckInTheBack />
    </div>
  );
}
