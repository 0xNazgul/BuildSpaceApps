const main = async () => {
    const nftContractFactory = await hre.ethers.getContractFactory('MyEpicNFT');
    const nftContract = await nftContractFactory.deploy();
    await nftContract.deployed();
    console.log("Contract deployed to:", nftContract.address);

    // To see if it goes over 50
    for (let i = 0; i < 50; i++) {
    let txn = await nftContract.makeNFT()
    await txn.wait()
    }

    // To see if one owner can have more then 2
    /*txn = await nftContract.makeNFT()
    await txn.wait()
    
    txn = await nftContract.makeNFT()
    await txn.wait()
    
    txn = await nftContract.makeNFT()
    await txn.wait()*/
  
  };
  
  const runMain = async () => {
    try {
      await main();
      process.exit(0);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  };
  
  runMain();