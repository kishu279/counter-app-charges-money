"use client";

import { useEffect, useState, useCallback } from "react";

import { useWallet } from "@solana/wallet-adapter-react";
import { useSolanaProvider } from "@/hooks/solana-provider";
import { getCounterPda, programId } from "@/lib/utils";
import { Program } from "@coral-xyz/anchor";
import { Button } from "./ui/button";
import { SlidingNumber } from "./ui/shadcn-io/sliding-number";

import { SolanaProgram } from "@/utils/solana_program";
import idl from "@/utils/solana_program.json";
import { SystemProgram, Transaction } from "@solana/web3.js";
import { createMemoInstruction } from "@solana/spl-memo";

export default function CounterComponent() {
  const [number, setNumber] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { publicKey, connected } = useWallet();
  const provider = useSolanaProvider();

  // Fetch counter value on initial render
  const fetchCounter = useCallback(async () => {
    if (!provider || !publicKey) {
      setIsInitialized(false);
      setNumber(0);
      return;
    }

    /* eslint-disable @typescript-eslint/no-explicit-any */
    const program = new Program<SolanaProgram>(idl as any, provider);

    try {
      const counterPda = getCounterPda(publicKey);

      // Try to fetch the counter account
      const counterAccount = await program.account.counter.fetch(counterPda);

      if (counterAccount) {
        setNumber(counterAccount.count as number);
        setIsInitialized(true);
        console.log("Counter fetched:", counterAccount.count);
      }
    } catch (error) {
      // Counter account doesn't exist yet
      console.log("Counter not initialized yet", error);
      setIsInitialized(false);
      setNumber(0);
    }
  }, [provider, publicKey]);

  // Fetch counter on mount and when wallet/provider changes
  useEffect(() => {
    fetchCounter();
  }, [fetchCounter]);

  const onInitialize = async () => {
    if (!provider || !publicKey) {
      alert("Please connect your wallet first!");
      return;
    }

    const program = new Program<SolanaProgram>(idl as any, provider);
    const counterPda = getCounterPda(publicKey);

    try {
      setIsLoading(true);

      console.log("Initializing counter");
      const sig = await program.methods
        .initializeCounter()
        .accounts({
          signer: publicKey,
          // @ts-expect-error: 'new_counter' is valid per our Anchor IDL
          new_counter: counterPda,
          systemProgram: SystemProgram.programId,
        })
        .rpc();
      console.log("Counter initialized with signature:", sig);

      // Fetch the updated counter
      await fetchCounter();
    } catch (error) {
      console.error("Error initializing counter:", error);
      alert("Failed to initialize counter. Check console for details.");
    } finally {
      setIsLoading(false);
    }
  };

  const onUpdateCounter = async () => {
    if (!provider || !publicKey) {
      alert("Please connect your wallet first!");
      return;
    }

    const program = new Program<SolanaProgram>(idl as any, provider);
    const counterPda = getCounterPda(publicKey);

    try {
      setIsLoading(true);
      const newCount = number + 1;

      console.log("Updating counter to:", newCount);
      const updateTx = await program.methods
        .updateCounter(newCount)
        .accounts({
          signer: publicKey,
          // @ts-expect-error: counter is valid per our Anchor IDL
          counter: counterPda,
          systemProgram: SystemProgram.programId,
        })
        .instruction();

      const memoTx = createMemoInstruction(
        `CounterUpdated:${programId.toString()}`
      );

      const tx = new Transaction().add(updateTx).add(memoTx);
      // @ts-expect-error: provider is valid per our useSolanaProvider hook
      const sig = await provider.sendAndConfirm(tx);

      console.log("Counter updated with signature:", sig);

      // Fetch the updated counter
      await fetchCounter();
    } catch (error) {
      console.error("Error updating counter:", error);
      alert("Failed to update counter. Check console for details.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <header className="flex flex-col items-center gap-2">
        <h1 className="text-4xl font-bold">Counter</h1>
        <p className="text-sm text-gray-600">
          {isInitialized
            ? "Each click will charge you 0.00001 SOL"
            : "Initialize the counter to get started"}
        </p>
      </header>

      <div className="flex flex-col items-center gap-4">
        <div className="p-4 rounded-xl bg-neutral-100 dark:bg-neutral-800">
          <SlidingNumber number={number} className="text-4xl font-bold" />
        </div>

        {!isInitialized ? (
          <Button
            onClick={onInitialize}
            disabled={!connected || isLoading}
            size="lg"
            className="min-w-[200px]"
          >
            {isLoading ? "Initializing..." : "Initialize Counter"}
          </Button>
        ) : (
          <Button
            onClick={onUpdateCounter}
            disabled={!connected || isLoading}
            size="lg"
            className="min-w-[200px]"
          >
            {isLoading ? "Updating..." : "Update Counter"}
          </Button>
        )}

        {!connected && (
          <p className="text-sm text-red-500">
            Please connect your wallet to continue
          </p>
        )}
      </div>
    </div>
  );
}
