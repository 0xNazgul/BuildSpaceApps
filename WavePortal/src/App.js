import React, { useEffect, useState } from "react";
import moment from 'moment'
import { ethers } from "ethers";
import './styles/App.css';
import abi from './utils/WavePortal.json';
import house from './assets/house-door.svg';

const App = () => {
  const [currentAccount, setCurrentAccount] = useState("");
  const [allWaves, setAllWaves] = useState([]);
  const contractAddress = "YOUR_CONTRACT_ADDRESS";
  const contractABI = abi.abi;
  const [address, setAddress] = React.useState("");
  const [message, setMessage] = React.useState("");

  const checkIfWalletIsConnected = async () => {
    try {
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
        setCurrentAccount(account);
        getAllWaves();
      } else {
        console.log("No authorized account found")
      }
    } catch (error) {
      console.log(error);
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
    } catch (error) {
      console.log(error)
    }
  }

  const wave = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);

        let count = await wavePortalContract.getTotalWaves();
        console.log("Retrieved total wave count...", count.toNumber());

        const waveTxn = await wavePortalContract.wave(message, address);
        console.log("Mining...", waveTxn.hash);
        await waveTxn.wait();
        console.log("Mined -- ", waveTxn.hash);

        count = await wavePortalContract.getTotalWaves();
        console.log("Retrieved total wave count...", count.toNumber());
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error)
    }
  }

  const getAllWaves = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const wavePortalContract = new ethers.Contract(contractAddress, contractABI, signer);

        const waves = await wavePortalContract.getAllWaves();

        let wavesCleaned = [];
        waves.forEach(wave => {     
          wavesCleaned.push({
            to: wave.to,
            address: wave.waver,
            timestamp: new Date(wave.timestamp * 1000),
            message: wave.message
          });
        });

        setAllWaves(wavesCleaned);
      } else {
        console.log("Ethereum object doesn't exist!")
      }
    } catch (error) {
      console.log(error);
    }
  }
  
  useEffect(() => {
    checkIfWalletIsConnected();
    // eslint-disable-next-line
  }, [])

  return (
    <div className="mainContainer">
      <div className="header">
        <a href="/">Home</a>
      </div>
      <div className="sideNav">
        <a href="/">
        <img className="house" src={house} alt="house" />
        Home
        </a>
      </div>
      <div className="ConnectContainer">
        {!currentAccount && (
          <button className="cta-button connect-wallet-button" onClick={connectWallet}>
            Connect Wallet
          </button>
        )} 
      </div>
      <div className="dataContainer">
        <textarea className="message" type="text" placeholder="Send a wave!" maxLength ="280" wrap="hard" value={message} onChange={(event) => setMessage(event.target.value)}> </textarea>
        <textarea className="address" type="text" placeholder="Who to send it to 0x...." maxLength="42" value={address} onChange={(event) => setAddress(event.target.value)}></textarea>
        <button className="cta-button connect-wallet-button" onClick={wave}>
          Wave
        </button>
      </div>
      <div className="WavesRec">
        {allWaves.map((wave, index) => {
          return (
            <div className="WaversMain">
              <div className="Wavers" key={index} style={{borderTopStyle: "solid", borderBottomStyle: "solid", borderColor: "rgba(128, 128, 128, 0.404)", borderWidth: "1px", paddingTop: "10px", paddingBottom:"10px", paddingLeft:"30px", paddingRight:"30px"}}>
                <div>
                  <b>To:</b> {wave.to.substring(0,5)}...{wave.to.substring(38)} <b>From:</b> {wave.address.substring(0,5)}...{wave.address.substring(38)} <b>Sent:</b> {(moment(wave.timestamp).fromNow(true))} ago</div>
                <div>{wave.message}</div>
              </div>
            </div>)
        })}
      </div>
    </div>
  );

}

export default App