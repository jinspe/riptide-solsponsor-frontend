import React from 'react';
import { BrowserRouter, Routes, Navigate, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import HomePage from 'pages/HomePage';

import ContextProvider from 'components/SolanaWallet/ContextProvider';
import ConnectionButton from 'components/SolanaWallet/ConnectionButton';

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
        <Routes>
          <Route path="/Home" element={<HomePage />} />
          <Route path="/" element={<Navigate to="/Home" />} />
        </Routes>
      </BrowserRouter>
    </ContextProvider>
  );
}

export default App;
