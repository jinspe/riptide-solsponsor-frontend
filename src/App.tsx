import React from 'react';
import { BrowserRouter, Routes, Navigate, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import ContextProvider from './components/SolanaWallet/ContextProvider';
import ConnectionButton from './components/SolanaWallet/ConnectionButton';

function App(): JSX.Element {
  return (
    <ContextProvider>
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
        <ConnectionButton />
      </BrowserRouter>
    </ContextProvider>
  );
}

export default App;
