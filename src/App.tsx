import React from 'react';
import { BrowserRouter, Routes, Navigate, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import AuthManager from 'components/Authentication/AuthManager';
import HomePage from 'pages/HomePages/HomePage';

import WalletContextProvider from 'components/SolanaWallet/WalletContextProvider';
import WalletButton from 'components/SolanaWallet/WalletButton';

import 'react-toastify/dist/ReactToastify.css';

function App(): JSX.Element {
  return (
    <WalletContextProvider>
      <BrowserRouter>
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <AuthManager>
          <WalletButton />
          <Routes>
            <Route path="/Home" element={<HomePage />} />
            {/* This route will redirect if Auth */}
            <Route path="/" element={<Navigate to="/Home" />} />
          </Routes>
        </AuthManager>
      </BrowserRouter>
    </WalletContextProvider>
  );
}

export default App;
