"use client";

import { Adapter } from "@solana/wallet-adapter-base";
import { useWallet } from "@solana/wallet-adapter-react";
import React, { useEffect } from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Wallet, LogOut, ChevronDown } from "lucide-react";

export function WalletButton() {
  const { connected, publicKey, wallet, wallets, select, disconnect } =
    useWallet();

  const connectWallet = React.useCallback(
    (adapter: Adapter) => () => select(adapter.name),
    [select]
  );

  const disconnectWallet = React.useCallback(() => {
    disconnect();
  }, [disconnect]);

  const shortenAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {connected && publicKey && wallet ? (
          <Button
            variant="outline"
            className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-accent transition-colors"
          >
            <Image
              src={wallet.adapter.icon}
              width={20}
              height={20}
              alt={wallet.adapter.name}
              className="rounded-full"
            />
            <span className="font-medium">
              {shortenAddress(publicKey.toString())}
            </span>
            <ChevronDown className="h-4 w-4 opacity-50" />
          </Button>
        ) : (
          <Button className="flex items-center gap-2 px-4 py-2 rounded-lg">
            <Wallet className="h-4 w-4" />
            <span>Connect Wallet</span>
          </Button>
        )}
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56">
        {connected && publicKey && wallet ? (
          <>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">
                  {wallet.adapter.name}
                </p>
                <p className="text-xs leading-none text-muted-foreground">
                  {shortenAddress(publicKey.toString())}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={disconnectWallet}
              className="text-red-600 focus:text-red-600 cursor-pointer"
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Disconnect</span>
            </DropdownMenuItem>
          </>
        ) : (
          <>
            <DropdownMenuLabel>Select Wallet</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {wallets.length > 0 ? (
              wallets.map((item, idx) => (
                <DropdownMenuItem
                  key={idx}
                  onClick={connectWallet(item.adapter)}
                  className="cursor-pointer"
                sh>
                  <Image
                    src={item.adapter.icon}
                    width={20}
                    height={20}
                    alt={item.adapter.name}
                    className="mr-2 rounded-full"
                  />
                  <span>{item.adapter.name}</span>
                </DropdownMenuItem>
              ))
            ) : (
              <div className="px-2 py-6 text-center text-sm text-muted-foreground">
                No wallets detected
              </div>
            )}
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
