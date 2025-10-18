"use client";

import { Adapter, WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { clusterApiUrl } from "@solana/web3.js";
import React from "react";

const Web3Provider = ({ children }: { children: React.ReactNode }) => {
  const network = WalletAdapterNetwork.Devnet;

  const endpoint = React.useMemo(() => clusterApiUrl(network), [network]);
  const wallets: Adapter[] = [];

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        {children}
      </WalletProvider>
    </ConnectionProvider>
  );
};

export default Web3Provider;
