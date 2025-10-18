import CounterComponent from "@/components/Counter";
import { WalletButton } from "@/components/wallet-button";
import Image from "next/image";

export default function Home() {
  return (
    <div className="h-screen w-full">
      <div className="h-screen w-full flex flex-col justify-center items-center space-y-4">
        <WalletButton />

        <CounterComponent />
      </div>
    </div>
  );
}
