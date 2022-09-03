//importing required libraries
import React, { useState, useEffect } from "react";
import twitterLogo from "./assets/twitter-logo.svg";
import * as fcl from "@onflow/fcl";
import * as types from "@onflow/types";

import { mintNFT } from "./cadence/transactions/mintNFT_tx";
import { getTotalSupply } from "./cadence/scripts/getTotalSupply_script";
import { getMetadata } from "./cadence/scripts/getMetadata_script";
import { getIDs } from "./cadence/scripts/getID_script";

import './App.css';

const TWITTER_HANDLE = "0xNazgul";
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

fcl.config({
  "flow.network": "testnet",
  "app.detail.title": "Cats", 
  "accessNode.api": "https://rest-testnet.onflow.org",
  "app.detail.icon": "https://placekitten.com/g/200/200",
  "discovery.wallet": "https://fcl-discovery.onflow.org/testnet/authn",
});

function App() {
  const [ user, setUser ] = useState();
  const [ images, setImages ] = useState([])
  // Can use this for LILICO
  //const [network, setNetwork] = useState("");

  const logIn= () => {
    fcl.authenticate();
  };

  const logOut = () => {
    setImages([]);
    fcl.unauthenticate();
  }

  const RenderGif = () => {
    const gifUrl = user?.addr
        ? "https://media.giphy.com/media/VbnUQpnihPSIgIXuZv/giphy-downsized.gif"
        : "https://i.giphy.com/media/Y2ZUWLrTy63j9T6qrK/giphy.webp";
    return <img className="gif-image" src={gifUrl} height="300px" alt="Funny gif"/>;
  };

  const RenderLogin = () => {
    return (
      <div> 
        <button className="cta-button button-glow" onClick={() => logIn()}>
          Log In
        </button>
      </div>
    );
  };

  const RenderLogout = () => {
    if (user && user.addr) {
      return (
        <div className="logout-container">
          <button className="cta-button logout-btn" onClick={() => logOut()}>
            {" "}
            {user.addr.substring(0, 6)}...{user.addr.substring(user.addr.length - 4)}
          </button>
        </div>
      );
    }
    return undefined;
  }

  const RenderMintButton = () => {
    return (
    <div>
      <div>
        <button className="cta-button button-glow" onClick={() => mint()}>
          Mint
        </button>
      </div>
      {images.length > 0 ?
        <>
          <h2>Your NFTs</h2>
            <div className="image-container">
              {images}
            </div>
        </>
      : ""}
    </div>
    );
  } 

  const mint = async() => {
    let _totalSupply;
    try {
      _totalSupply = await fcl.query({
        cadence: `${getTotalSupply}`
      })
    } catch(err) {console.log(err)}

    const _id = parseInt(_totalSupply) + 1;

    try {
      const transactionId = await fcl.mutate({
        cadence: `${mintNFT}`,
        args: (arg, t) => [
          arg(user.addr, types.Address),
          arg("Cats #"+_id.toString(), types.String),
          arg("Cats on chain", types.String),
          arg("https://bafkreidebne2vb6wzp2eolj65exmfbo3u3exod5y2viuqh3y5ysbpvx644.ipfs.nftstorage.link/"+_id+".png", types.String),
        ],
        proposer: fcl.currentUser,
        payer: fcl.currentUser,
        limit: 99
      })
      console.log("Minting", transactionId);
      const transaction = await fcl.tx(transactionId).onceSealed();
      console.log("Testnet link:", `https://testnet.flowscan.org/transaction/${transactionId}`);
      console.log(transaction);
      alert("NFT minted")
    } catch (error) {
      console.log(error);
      alert("Error in minting try again")
    }
  }

  const fetchNFTs = async () => {
    setImages([]);
    let IDs = [];

    try {
      IDs = await fcl.query({
        cadence: `${getIDs}`,
        args: (arg, t) => [
          arg(user.addr, types.Address),
        ],
      })
    } catch(err) {
      console.log("No NFTS owned")
    }

    let _imageSrc = []
    try {
      for(let i=0; i<IDs.length; i++) {
        const result = await fcl.query({
          cadence: `${getMetadata}`,
          args: (arg, t) => [
            arg(user.addr, types.Address),
            arg(IDs[i].toString(), types.UInt64),
          ],
        })
        if (result["thumbnail"].startsWith("ipfs://")) {
          _imageSrc.push(result["thumbnail"].substring(7))
          _imageSrc[i] = "https://nftstorage.link/ipfs/"+_imageSrc[i]
        }
        else {
          _imageSrc.push(result["thumbnail"])
        }
      }
    } catch(err) {
      console.log(err)
    }

    if(images.length < _imageSrc.length) {
      setImages((Array.from({length: _imageSrc.length}, (_, i) => i).map((number, index)=> 
        <img style={{margin:"10px", height: "150px"}} src={_imageSrc[index]} key={number} alt={"NFT #"+number}
        />
      )))
    }
  }

  useEffect(() => {
    fcl.currentUser().subscribe(setUser);
  }, [])

  useEffect(() => {
    if (user && user.addr) {
      fetchNFTs();
    }
  }, [user]);

  // Can use this for LILICO
  /*useEffect(() => {
    window.addEventListener("message", d => {
      if(d.data.type==='LILICO:NETWORK') setNetwork(d.data.network)
    })
  }, [])
  */

  return (
    <div className="App">
      <RenderLogout />
      <div className="container">
        <div className="header-container">
          <div className="logo-container">
            <img src="./logo.png" className="flow-logo" alt="flow logo"/>
            <p className="header">Awesome NFTs on Flow</p>
          </div>
          <RenderGif/>
          <p className="sub-text">The easiest NFT mint experience ever!</p>
        </div>

        {user && user.addr ? <RenderMintButton /> : <RenderLogin />}

        <div className="footer-container">
            <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
            <a className="footer-text" href={TWITTER_LINK} target="_blank" rel="noreferrer">{`built by @${TWITTER_HANDLE}`}</a>
        </div>
      </div>
    </div>
  );
}

export default App;