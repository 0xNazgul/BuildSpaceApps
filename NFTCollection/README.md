# **NFT Collection**
This is a project to create your own nft collection. There is a few different contracts to do it and play around with.

## **Getting Started**

1. To start off your going to need a an [Infura key](https://infura.io/) or an [Alchemy key](https://www.alchemy.com/)
   * Sign up and set up a project
   * Then you can paste the key and your account private key in the ```.env``` file (DON'T SHARE OR UPLOAD THESE ANYWHERE!!!!!) 

2. Next you want ```cd``` into the parent folder location and use:
```sh
npm i
```

3. You can change the aspects of your NFTs in the smart contracts

4. Deploy the smart contract to the Rinkeby testnet:
```sh
npx hardhat run scripts/deploy.js --network rinkeby
```

5. That command will give you the addresses where the contract was deployed. Update `App.js` with those values:

```javascript
const contractAddress = "YOUR_CONTRACT_ADDRESS";
```

6. Make sure to then go to opensea and change this link to your collection link:

```javascript
const handleClick = () => {
    window.open("https://testnets.opensea.io/collection/your-word-8a5deugsxf");
  };
```

7. Then run the development server:

```bash
npm start
```

8. Lastly open ```http:localhost:3000```

9. Changes
If you make any changes make sure to copy paste the abi from ```./artifacts``` into ```./src/utils``` 

