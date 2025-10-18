import { PublicKey } from "@solana/web3.js";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import idlFile from "@/utils/solana_program.json";
import { Idl } from "@coral-xyz/anchor";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getCounterPda = (publicKey: PublicKey) => {
  const [counterPda] = PublicKey.findProgramAddressSync(
    [Buffer.from("Counter"), publicKey.toBuffer()],
    programId
  );

  return counterPda;
};

const idl = idlFile as Idl;

export const programId = new PublicKey(idl.address);
