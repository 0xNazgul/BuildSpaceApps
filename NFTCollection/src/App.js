import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import './styles/App.css';
import twitterLogo from './assets/twitter-logo.svg';
import example from './assets/01example.svg';
import exampleTwo from './assets/02example.svg';
import MyEpicNFT from './utils/MyEpicNFT.json';

const TWITTER_HANDLE = '0xNazgul';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

const CONTRACT_ADDRESS = "YOUR_CONTRACT_ADDRESS";

const App = () => {

  const [currentAccount, setCurrentAccount] = useState("");
  const [total, setTotal] = useState(0);
  
  const checkIfWalletIsConnected = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      console.log("Make sure you have metamask!");
      return;
    } else {
      console.log("We have the ethereum object", ethereum);
    }

    const accounts = await ethereum.request({ method: 'eth_accounts' });

    if (accounts.length !== 0) {
      const account = accounts[0];
      console.log("Found an authorized account:", account);
			setCurrentAccount(account)

      networkEventListener()
    } else {
      console.log("No authorized account found")
    }    
  }

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      const accounts = await ethereum.request({ method: "eth_requestAccounts" });

      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
      
      networkEventListener()
    } catch (error) {
      console.log(error)
    }
  }

  const mintingEventListener = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const connectedContract = new ethers.Contract(CONTRACT_ADDRESS, MyEpicNFT.abi, signer);

        connectedContract.on("NewEpicNFTMinted", (from, tokenId) => {
          console.log(from, tokenId.toNumber())
          alert(`Hey there! We've minted your NFT and sent it to your wallet. It may be blank right now. It can take a max of 10 min to show up on OpenSea. Here's the link: https://testnets.opensea.io/assets/${CONTRACT_ADDRESS}/${tokenId.toNumber()}`)
        });

        console.log("Setup event listener!")

      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error)
    }
  }

  const networkEventListener = async () => {
    try {

      const { ethereum } = window;

      let chainId = await ethereum.request({ method: 'eth_chainId' });
      console.log("Connected to chain " + chainId);

      // String, hex code of the chainId of the Rinkebey test network
      const rinkebyChainId = "0x4"; 
      if (chainId !== rinkebyChainId) {
	      alert("You are not connected to the Rinkeby Test Network!");
      } else {
        console.log("You are on the right network")
      } 
    } catch (error) {
        console.log(error)
    }
  }  

  const askContractToMintNft = async () => {
    try {
      const { ethereum } = window;
      networkEventListener()

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const connectedContract = new ethers.Contract(CONTRACT_ADDRESS, MyEpicNFT.abi, signer);

        console.log("Going to pop wallet now to pay gas...")
        let nftTxn = await connectedContract.makeNFT();

        console.log("Mining...please wait.")
        await nftTxn.wait();
        console.log(nftTxn);
        console.log(`Mined, see transaction: https://rinkeby.etherscan.io/tx/${nftTxn.hash}`);
        mintingEventListener();
        nftsMintedSoFarEventListener();

      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error)
    }
  }

  const nftsMintedSoFarEventListener = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const connectedContract = new ethers.Contract(CONTRACT_ADDRESS, MyEpicNFT.abi, signer);

        let total = await connectedContract.getTotalNFTsMintedSoFar();
  
        console.log(`Total NFTs minted ${total.toNumber()}`);
        setTotal(total.toNumber());
        
      } else {
        console.log("Ethereum object doesn't exist!");  
      }    
    } catch (error) {
      console.log(error)
    }
  }    

  useEffect(() => {
    checkIfWalletIsConnected();
    nftsMintedSoFarEventListener();
    // eslint-disable-next-line 
  }, [])

  const renderNotConnectedContainer = () => (
    <button onClick={connectWallet} className="cta-button connect-wallet-button">
      Connect to Wallet
    </button>
  );

  const renderMintUI = () => (
    <button onClick={() => {askContractToMintNft(); nftsMintedSoFarEventListener(); }} className="cta-button mint-button">
      Mint NFT
    </button>
  ); 

  const handleClick = () => {
    window.open("https://testnets.opensea.io/collection/your-word-8a5deugsxf");
  };  

  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header gradient-text">Your Word NFT Project</p>
          <p className="sub-text">
            Mint a beautifully unique NFT that is random every time.
          </p>
          {currentAccount === "" ? renderNotConnectedContainer() : renderMintUI()}
          <p className="mint-count gradient-text">
            Hurry Before They Are All Gone! 
            <br></br>
            Total Minted: 
            <br></br>
            {total}/50
          </p>           
          <p className="sub-text">
            Check out some that can be minted!
          </p>       
        </div>
        <div className="Examples">
          <img className="ExampleImg " src={example} alt="example" />
          <img className="ExampleImg " src={exampleTwo} alt="exampleTwo" />
        </div>
        <div className="">
          <button className="cta-button opensea-button" onClick={handleClick} >
            See collection
          </button>         
        </div>  
        <div className="footer-container">        
          <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
          <a
            className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >{`built by @${TWITTER_HANDLE}`}</a>
        </div>
      </div>
    </div>
  );
};

export default App;