import React from 'react';
import { BrowserRouter, Routes, Navigate, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import HomePage from 'pages/HomePages/HomePage';
import LandingPage from 'pages/HomePages/LandingPage';

import WalletContextProvider from 'components/SolanaWallet/WalletContextProvider';
import WalletButton from 'components/SolanaWallet/WalletButton';

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
        <WalletButton />
        <Routes>
          <Route path="/Home" element={<HomePage />} />
          {/* This route will redirect if Auth */}
          <Route path="/" element={<Navigate to="/Home" />} />
        </Routes>
      </BrowserRouter>
    </WalletContextProvider>
  );
}

export default App;
