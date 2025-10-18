import { SolanaProgram } from "./../target/types/solana_program";
import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";

describe("solana-program", () => {
  // Configure the client to use the local cluster.

  const provider = anchor.AnchorProvider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.SolanaProgram as Program<SolanaProgram>;

  // get all the pda's to be updated
  const [counterPda] = anchor.web3.PublicKey.findProgramAddressSync(
    [Buffer.from("Counter"), provider.wallet.publicKey.toBuffer()],
    program.programId
  );

  it("Is initialized!", async () => {
    const tx = await program.methods
      .initializeCounter()
      .accounts({
        signer: provider.wallet.publicKey,
        new_counter: counterPda, // <- your derived PDA
        systemProgram: anchor.web3.SystemProgram.programId, // <- camelCase
      })
      .rpc();

    console.log("Your transaction signature", tx);
  });

  it("Can increment the counter", async () => {
    const updatedCounterValue = 10;

    const tx = await program.methods
      .updateCounter(updatedCounterValue)
      .accounts({
        signer: provider.wallet.publicKey,
        counter: counterPda,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .rpc();
    console.log("Your transaction signature", tx);
    const messageAccount = await program.account.counter.fetch(
      counterPda,
      "confirmed"
    );

    console.log("Expect Null:", JSON.stringify(messageAccount, null, 2));
  });
});
