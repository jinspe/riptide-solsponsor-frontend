import React, { ReactNode } from 'react';
import { RecoilRoot } from 'recoil';

import WalletContextProvider from 'components/SolanaWallet/WalletContextProvider';

export default function Layout({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  return (
    <WalletContextProvider>
      <RecoilRoot>{children}</RecoilRoot>
    </WalletContextProvider>
  );
}
