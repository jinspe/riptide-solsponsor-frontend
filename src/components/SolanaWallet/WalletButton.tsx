import React from 'react';
import { WalletMultiButton as ReactUIWalletMultiButton } from '@solana/wallet-adapter-react-ui';
import 'style/wallet.css';

export default function WalletButton(): JSX.Element {
  return <ReactUIWalletMultiButton />;
}
