import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { RecoilRoot } from 'recoil';

import AuthManager from 'components/Authentication/AuthManager';
import WalletContextProvider from 'components/SolanaWallet/WalletContextProvider';
import useDarkMode from 'components/Common/Util/useDarkMode';

import AppSwitcher from 'components/AppContainers/AppSwitcher';

import 'react-toastify/dist/ReactToastify.css';
import 'style/Components/Toastify/toastify.css';

import 'style/global.css';

function App(): JSX.Element {
  useDarkMode();
  return (
    <WalletContextProvider>
      <RecoilRoot>
        <BrowserRouter>
          <ToastContainer
            position="bottom-right"
            autoClose={3000}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          <AuthManager>
            <AppSwitcher />
          </AuthManager>
        </BrowserRouter>
      </RecoilRoot>
    </WalletContextProvider>
  );
}
export default App;
