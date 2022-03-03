const main = async () => {
    const gameContractFactory = await hre.ethers.getContractFactory('MyEpicGame');
    const gameContract = await gameContractFactory.deploy(
      // This is where you can change the aspects of your characters and the boss
      ["Monk", "Soy", "Pepe"],       // Names
      ["https://i.ytimg.com/vi/QjyHnZnXWKw/maxresdefault.jpg", // Images
      "https://www.dictionary.com/e/wp-content/uploads/2018/05/soyboy-2.png", 
      "https://ichef.bbci.co.uk/news/976/cpsprodpb/16620/production/_91408619_55df76d5-2245-41c1-8031-07a4da3f313f.jpg"],
      [100, 5, 1000],       // HP 
      [100, 5, 5000],      // dmg
      "Arthas Menethil",    // Boss name
      "https://i.ytimg.com/vi/BCr7y4SLhck/maxresdefault.jpg", // Image
      10000, // Health
      50, // dmg
    );
    await gameContract.deployed();
    console.log("Contract deployed to:", gameContract.address);
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