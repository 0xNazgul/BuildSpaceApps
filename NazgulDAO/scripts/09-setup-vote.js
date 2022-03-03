import { ethers } from "ethers";
import sdk from "./01-initialize-sdk.js";

// This is our governance contract.
// Insert vote address here from script 8
const voteModule = sdk.getVoteModule(
  "0x3EFaD2d20229774669F8098e29266c88914d3ab8",
);

// This is our ERC-20 contract.
// Insert Token address here from script 5
const tokenModule = sdk.getTokenModule(
  "0xC0d7220A9D0261BBf2864f5fC42083e2DFD218aE",
);

(async () => {
  try {
    // Give our treasury the power to mint additional token if needed.
    await tokenModule.grantRole("minter", voteModule.address);

    console.log(
      "Successfully gave vote module permissions to act on token module"
    );
  } catch (error) {
    console.error(
      "failed to grant vote module permissions on token module",
      error
    );
    process.exit(1);
  }

  try {
    // Grab our wallet's token balance, remember -- we hold basically the entire supply right now!
    const ownedTokenBalance = await tokenModule.balanceOf(
      process.env.WALLET_ADDRESS
    );

    // Grab 90% of the supply that we hold.
    const ownedAmount = ethers.BigNumber.from(ownedTokenBalance.value);
    const percent90 = ownedAmount.div(100).mul(90);

    // Transfer 90% of the supply to our voting contract.
    await tokenModule.transfer(
      voteModule.address,
      percent90
    );

    console.log("✅ Successfully transferred tokens to vote module");
  } catch (err) {
    console.error("failed to transfer tokens to vote module", err);
  }
})();