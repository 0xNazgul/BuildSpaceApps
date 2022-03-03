import sdk from "./01-initialize-sdk.js";

// In order to deploy the new contract we need our old friend the app module again.
// Insert app address here from script 3
const app = sdk.getAppModule("0xf1aca3548987De4aa0fbbE6434201F6eE6aABea1");

(async () => {
  try {
    // Deploy a standard ERC-20 contract.
    const tokenModule = await app.deployTokenModule({
      // What's your token's name? Ex. "Ethereum"
      name: "NazgulDAO Governance Token",
      // What's your token's symbol? Ex. "ETH"
      symbol: "NAZGUL",
    });
    console.log(
      "✅ Successfully deployed token module, address:",
      tokenModule.address,
    );
  } catch (error) {
    console.error("failed to deploy token module", error);
  }
})();