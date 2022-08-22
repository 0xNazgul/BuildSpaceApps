# buildspace Store on Solana Pay Project

### **Welcome 👋**

To get started with this project, clone this repo and follow these commands:

1. Run `npm install` at the root of your directory
2. Add your public address to the `.envEX` file and change the name to `.env`
3. Run `npm run dev` to start the project
4. Feel free to manually remove my example product and add your own via the `CreateProduct.js`

### What is the `.vscode` Folder?
If you use VSCode to build your app, we included a list of suggested extensions that will help you build this project! Once you open this project in VSCode, you will see a popup asking if you want to download the recommended extensions :).

### Moving to mainnet
1. The "USDC" token address in `createTransaction.js`. The mainnet USDC SPL token address is `EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v` 
2. The `network` enum on `WalletAdapterNetwork` on `_app.js` and `createTransaction.js` from `Devnet` to `Mainnet`