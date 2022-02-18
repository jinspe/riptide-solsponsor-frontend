import React, { ReactNode, useEffect } from 'react';

import { useWallet } from '@solana/wallet-adapter-react';

export default function AuthManager({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  const { connected } = useWallet();

  async function trySigninWithWallet() {
    if (connected) {
      console.log('signin with wallet');
    }
  }

  useEffect(() => {
    trySigninWithWallet();
  }, [connected]);

  return <div>{children}</div>;
}
