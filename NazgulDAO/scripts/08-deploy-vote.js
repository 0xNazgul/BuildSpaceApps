import sdk from "./01-initialize-sdk.js";

// Grab the app module address.
// Insert app address here from script 3
const appModule = sdk.getAppModule(
  "0xf1aca3548987De4aa0fbbE6434201F6eE6aABea1",
);

(async () => {
  try {
    const voteModule = await appModule.deployVoteModule({
      // Give your governance contract a name.
      name: "NazgulDAO's Epic Proposals",

      // This is the location of our governance token, our ERC-20 contract!
      // Insert Token address here from script 5
      votingTokenAddress: "0xC0d7220A9D0261BBf2864f5fC42083e2DFD218aE",

      // After a proposal is created, when can members start voting?
      // For now, we set this to immediately.
      proposalStartWaitTimeInSeconds: 0,

      // How long do members have to vote on a proposal when it's created?
      // Here, we set it to 24 hours (86400 seconds)
      proposalVotingTimeInSeconds: 24 * 60 * 60,

      // Will explain more below.
      votingQuorumFraction: 0,

      // What's the minimum # of tokens a user needs to be allowed to create a proposal?
      // I set it to 0. Meaning no tokens are required for a user to be allowed to
      // create a proposal.
      minimumNumberOfTokensNeededToPropose: "0",
    });

    console.log(
      "✅ Successfully deployed vote module, address:",
      voteModule.address,
    );
  } catch (err) {
    console.log("Failed to deploy vote module", err);
  }
})();
