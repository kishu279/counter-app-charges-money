import { AnchorProvider, Provider } from "@coral-xyz/anchor";
import {
  useAnchorWallet,
  useConnection,
  useWallet,
} from "@solana/wallet-adapter-react";
import { useEffect, useState } from "react";

export function useSolanaProvider(): Provider | undefined {
  const [provider, setProvider] = useState<Provider>();

  const { connection } = useConnection();
  const { connected } = useWallet();
  const wallet = useAnchorWallet();

  useEffect(() => {
    if (connected == true && connection && wallet) {
      setProvider(
        new AnchorProvider(connection, wallet, {
          commitment: "confirmed",
        })
      );
    }
  }, [connected, connection, wallet]);

  return provider;
}
