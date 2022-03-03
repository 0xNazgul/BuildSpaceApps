# **NFT Game**
This is a project to create your own nft characters and bosses. You can then take your characters into battle for the Metaverse!

## **Getting Started**

1. To start off your going to need a an [Infura key](https://infura.io/) or an [Alchemy key](https://www.alchemy.com/)
   * Sign up and set up a project
   * Then you can paste the key and your account private key in the ```.env``` file (DON'T SHARE OR UPLOAD THESE ANYWHERE!!!!!) 

2. Next you want ```cd``` into the parent folder location and use:
```sh
npm i
```

3. Go into ```scripts/deploy.js``` and change what your characters are, along with there aspects. Also change the boss you'd wish them to fight and his aspects.
   
4. Deploy the smart contract to the Rinkeby testnet:
```sh
npx hardhat run scripts/deploy.js --network rinkeby
```

5. That command will give you the addresses where the contract was deployed. Update `constants.js` with those values:

```javascript
const CONTRACT_ADDRESS = 'YOUR_CONTRACT_ADDRESS';
```

6. Then run the development server:

```bash
npm start
```

7. Lastly open ```http:localhost:3000```

8. Changes
If you make any changes make sure to copy paste the abi from ```./artifacts``` into ```./src/utils``` 

