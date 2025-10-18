# Solana Counter Program

A full-stack Solana decentralized application (dApp) built with Anchor framework that implements a simple counter program with initialization and update functionality.

## 📋 Project Overview

This project demonstrates a complete Solana program development workflow including:

- **Smart Contract**: Anchor-based Solana program written in Rust
- **Tests**: Comprehensive test suite using Anchor's testing framework
- **Client Application**: Next.js web application with Solana wallet integration

## 🏗️ Architecture

### Program Structure

The counter program implements two main instructions:

1. **Initialize Counter**: Creates a new counter account with initial value 0
2. **Update Counter**: Updates the counter value to a new specified value

The program uses Program Derived Addresses (PDAs) for account management, ensuring each user has their own counter account.

### Key Features

- ✅ PDA-based account management
- ✅ Custom event emission
- ✅ Secure account initialization with seeds
- ✅ User-specific counter instances
- ✅ Event logging for transparency

## 🛠️ Tech Stack

### Smart Contract

- **Anchor Framework** v0.32.1
- **Rust** (Solana program development)
- **Solana Web3.js**

### Frontend

- **Next.js** 15.5.5
- **React** 19.1.0
- **TypeScript** 5.x
- **Solana Wallet Adapter**
- **TailwindCSS** 4.x
- **Radix UI Components**

### Testing

- **Mocha** & **Chai**
- **TypeScript**
- **Anchor Test Framework**

## 📁 Project Structure

```
solana-program/
├── programs/
│   └── solana-program/
│       └── src/
│           └── lib.rs              # Main program logic
├── tests/
│   └── solana-program.ts           # Test suite
├── app/
│   └── counter/                    # Next.js frontend application
│       ├── src/
│       │   ├── components/
│       │   │   ├── Counter.tsx     # Main counter component
│       │   │   ├── wallet-button.tsx
│       │   │   └── wallet-provider.tsx
│       │   ├── hooks/
│       │   │   └── solana-provider.ts
│       │   ├── utils/
│       │   │   └── solana_program.ts  # IDL types
│       │   └── app/
│       │       ├── layout.tsx
│       │       └── page.tsx
│       └── package.json
├── target/
│   ├── idl/
│   │   └── solana_program.json     # Generated IDL
│   └── types/
│       └── solana_program.ts       # TypeScript types
├── Anchor.toml                     # Anchor configuration
├── Cargo.toml                      # Rust workspace config
└── package.json                    # Root dependencies
```

## 🚀 Getting Started

### Prerequisites

- [Rust](https://rustup.rs/) (latest stable)
- [Solana CLI](https://docs.solana.com/cli/install-solana-cli-tools) v1.18+
- [Anchor](https://www.anchor-lang.com/docs/installation) v0.32.1
- [Node.js](https://nodejs.org/) v18+
- [Yarn](https://yarnpkg.com/) package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd solana-program
   ```

2. **Install dependencies**

   ```bash
   # Install root dependencies
   yarn install

   # Install frontend dependencies
   cd app/counter
   yarn install
   cd ../..
   ```

3. **Set up Solana wallet**

   ```bash
   # Generate a new keypair (if you don't have one)
   solana-keygen new

   # Set to devnet
   solana config set --url devnet

   # Airdrop SOL for testing
   solana airdrop 2
   ```

### Building the Program

```bash
# Build the Anchor program
anchor build
```

This will:

- Compile the Rust program
- Generate the IDL (Interface Definition Language)
- Create TypeScript types

### Running Tests

```bash
# Run the test suite
anchor test
```

The tests will:

- Deploy the program locally
- Initialize a counter account
- Update the counter value
- Verify the results

### Test Details

The test suite (`tests/solana-program.ts`) includes:

1. **Initialization Test**: Creates a new counter account with value 0
2. **Update Test**: Updates the counter to value 10 and verifies the change

```typescript
// Initialize counter
await program.methods.initializeCounter().rpc();

// Update counter to 10
await program.methods.updateCounter(10).rpc();
```

## 🌐 Running the Frontend

1. **Navigate to the frontend directory**

   ```bash
   cd app/counter
   ```

2. **Start the development server**

   ```bash
   yarn dev
   ```

3. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Frontend Features

- 🔌 Wallet connection (Phantom, Solflare, etc.)
- 🎨 Modern UI with smooth animations
- 📊 Real-time counter display
- ⚡ Initialize and update counter functionality
- 🔔 Transaction notifications
- 📱 Responsive design

### Using the Application

1. **Connect Wallet**: Click the wallet button to connect your Solana wallet
2. **Initialize Counter**: If first time, click "Initialize Counter" to create your counter
3. **Update Counter**: Click "Update Counter" to increment the value (costs ~0.00001 SOL)

## 🔧 Program Details

### Program ID

```
794WyttcZeD1xWA3aXN4er2DW4JhjS48qigdmGM2cbvL
```

### Instructions

#### Initialize Counter

```rust
pub fn initialize_counter(ctx: Context<InitializeCount>) -> Result<()>
```

- Creates a new counter account using PDA
- Sets initial count to 0
- Emits a `CustomEvent` with initialization message

#### Update Counter

```rust
pub fn update_counter(ctx: Context<UpdateCount>, new_count: u8) -> Result<()>
```

- Updates the counter to a new value
- Requires valid signer
- Emits a `CustomEvent` with update message

### Account Structure

```rust
#[account]
pub struct Counter {
    pub count: u8,
}
```

### PDA Seeds

- Seed: `"Counter"`
- Signer: User's public key

This ensures each user has their own unique counter account.

## 📝 Configuration

### Anchor.toml

- **Cluster**: devnet
- **Wallet**: `~/.config/solana/id.json`
- **Package Manager**: yarn

### Key Files

- `lib.rs`: Main program logic
- `Anchor.toml`: Anchor configuration
- `solana-program.ts`: Test suite
- `Counter.tsx`: Main React component
- `solana_program.json`: Program IDL

## 🧪 Development Workflow

1. **Modify the program** (`programs/solana-program/src/lib.rs`)
2. **Build** with `anchor build`
3. **Test** with `anchor test`
4. **Deploy** with `anchor deploy`
5. **Update frontend** if needed
6. **Run client** with `yarn dev`

## 🚢 Deployment

### Deploy to Devnet

```bash
# Build the program
anchor build

# Deploy to devnet
anchor deploy --provider.cluster devnet
```

### Deploy to Mainnet

```bash
# Switch to mainnet
solana config set --url mainnet-beta

# Deploy
anchor deploy --provider.cluster mainnet
```

⚠️ **Warning**: Ensure you have sufficient SOL for deployment fees!

## 🐛 Troubleshooting

### Common Issues

1. **"Account not initialized"**

   - Make sure to call `initializeCounter` before `updateCounter`

2. **"Insufficient funds"**

   - Airdrop more SOL: `solana airdrop 2`

3. **Build fails**

   - Run `cargo clean` and `anchor build` again

4. **Wallet not connecting**
   - Make sure your wallet is set to devnet
   - Check browser console for errors

## 📚 Learning Resources

- [Anchor Documentation](https://www.anchor-lang.com/)
- [Solana Cookbook](https://solanacookbook.com/)
- [Solana Web3.js Docs](https://solana-labs.github.io/solana-web3.js/)
- [Next.js Documentation](https://nextjs.org/docs)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

ISC License

## 👤 Author

Built with ❤️ using Anchor and Next.js

---

## 📊 Project Stats

- **Program Size**: ~8KB
- **Account Size**: 12 bytes (8 byte discriminator + 4 bytes for u8 + padding)
- **Network**: Solana Devnet
- **Framework**: Anchor v0.32.1

## 🎯 Future Improvements

- [ ] Add decrement functionality
- [ ] Implement counter history tracking
- [ ] Add multiple counter support per user
- [ ] Implement counter reset functionality
- [ ] Add analytics dashboard
- [ ] Deploy to mainnet

---

**Happy Building! 🚀**
