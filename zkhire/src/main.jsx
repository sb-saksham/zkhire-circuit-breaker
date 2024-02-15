import React from 'react'
import ReactDOM from 'react-dom/client'
import { NextUIProvider } from '@nextui-org/react';
// WAGMI Libraries
import { WagmiConfig } from "wagmi"
import { createConfig, configureChains } from "wagmi";
import { sepolia, scrollSepolia } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { ToastContainer } from "react-toastify";
import "@rainbow-me/rainbowkit/styles.css";

import App from './App'
import './index.css'
// import Web3AuthConnectorInstance from "./Web3AuthConnectorInstance";

// Configure chains & providers with the Public provider.
const { chains, publicClient, webSocketPublicClient } = configureChains([
  sepolia, 
  scrollSepolia],
  [alchemyProvider({ apiKey: import.meta.env.VITE_APP_ALCHEMY_API_KEY }),
    publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "ZkHire",
  projectId: import.meta.env.VITE_APP_WALLET_C_PROJECT_ID,
  chains
});

// Set up client
const config = createConfig({
  autoConnect: true,
  connectors: connectors,
  publicClient,
  webSocketPublicClient,
});

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <WagmiConfig config={config}>
        <RainbowKitProvider chains={chains}>
          <NextUIProvider>
            <App />
            {/* <ToastContainer
              position="top-center"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark"/>       */}
          </NextUIProvider>
        </RainbowKitProvider>
      </WagmiConfig>
    </React.StrictMode>,
);
