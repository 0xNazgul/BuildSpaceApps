# **Ens Domain**
This is a ens domain creator built on the polygon network.

## **Getting Started**
1. To start off your going to need a an [Infura key](https://infura.io/) or an [Alchemy key](https://www.alchemy.com/)
   * Sign up and set up a project
   * Then you can paste the key and your account private key in the ```.env``` file (DON'T SHARE OR UPLOAD THESE ANYWHERE!!!!!) 

2. First you want ```cd``` into the parent folder location and use:
```sh
npm i
```

3. Deploy the smart contract to the testnet:

```sh
npx hardhat run scripts/deploy.js --network mumbai
```

4. That command will give you the addresses where the contract was deployed. Update `App.js` with those values:

```javascript
const contractAddress = "YOUR_CONTRACT_ADDRESS";
```

5. Then run the development server:

```sh
npm start
```

6. Lastly open ```http:localhost:3000```

7. Changes
If you make any changes make sure to copy/paste the abi from ```./artifacts``` into ```./src/utils``` 

