import { ethers } from "ethers";
import sdk from "./01-initialize-sdk.js";

// This is the address of our ERC-20 contract printed out in the step before.
// Insert Token address here from script 5
const tokenModule = sdk.getTokenModule(
  "0xC0d7220A9D0261BBf2864f5fC42083e2DFD218aE",
);

(async () => {
  try {
    // What's the max supply you want to set? 1,000,000 is a nice number!
    const amount = 1_000_000;
    // We use the util function from "ethers" to convert the amount
    // to have 18 decimals (which is the standard for ERC20 tokens).
    const amountWith18Decimals = ethers.utils.parseUnits(amount.toString(), 18);
    // Interact with your deployed ERC-20 contract and mint the tokens!
    await tokenModule.mint(amountWith18Decimals);
    const totalSupply = await tokenModule.totalSupply();
    
    // Print out how many of our token's are out there now!
    console.log(
      "✅ There now is",
      ethers.utils.formatUnits(totalSupply, 18),
      "$NAZGUL in circulation",
    );
  } catch (error) {
    console.error("Failed to print money", error);
  }
})();