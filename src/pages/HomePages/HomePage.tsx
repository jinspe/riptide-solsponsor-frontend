import React from 'react';
import DarkModeSwitch from 'components/Common/DarkModeSwitch';
import WalletButton from 'components/SolanaWallet/WalletButton';

import InProgressApp from 'inprogress/InProgressApp';

export default function HomePage(): JSX.Element {
  return (
    <div className="pageFrame ">
      <WalletButton />
      <p className="text-red-500 dark:text-blue-500">Homepage</p>
      <p className="mtext-t0">Text test for colors title</p>
      <p className="mtext-t1">Text test for colors high</p>
      <p className="mtext-t2">Text test for colors medium</p>
      <p className="mtext-t3">Text test for colors low</p>
      <DarkModeSwitch />
      <InProgressApp />
    </div>
  );
}
