import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material';
import Routes from './Routes';
import { AlertMessageProvider } from './contexts/AlertMessageContext';
import { LoadingProvider } from './contexts/LoadingContext';
import { WalletProvider } from './contexts/WalletContext';
import { Web3ReactProvider } from "@web3-react/core";
import getLibrary from './utils/getLibrary';

const theme = createTheme({});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <LoadingProvider>
        <AlertMessageProvider>
          <Web3ReactProvider getLibrary={getLibrary}>
            <WalletProvider>
              <Router>
                <Routes />
              </Router>
            </WalletProvider>
          </Web3ReactProvider>
        </AlertMessageProvider>
      </LoadingProvider>
    </ThemeProvider>
  );
}

export default App;
