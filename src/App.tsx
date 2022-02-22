import React from 'react';
import { BrowserRouter, Routes, Navigate, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { RecoilRoot } from 'recoil';

import AuthManager from 'components/Authentication/AuthManager';
import WalletContextProvider from 'components/SolanaWallet/WalletContextProvider';
import Navbar from 'components/Common/Navbar/Navbar';

import HomePage from 'pages/HomePages/HomePage';

import 'react-toastify/dist/ReactToastify.css';

function App(): JSX.Element {
  return (
    <WalletContextProvider>
      <RecoilRoot>
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
            <header className="sticky top-0 z-50">
              <Navbar />
            </header>
            <main>
              <Routes>
                <Route path="/Home" element={<HomePage />} />
                {/* This route will redirect if Auth */}
                <Route path="/" element={<Navigate to="/Home" />} />
              </Routes>
            </main>
          </AuthManager>
        </BrowserRouter>
      </RecoilRoot>
    </WalletContextProvider>
  );
}

export default App;
