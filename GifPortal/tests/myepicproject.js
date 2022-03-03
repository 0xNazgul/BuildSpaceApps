const assert = require("assert");
const anchor = require("@project-serum/anchor");
let Mocha = require('mocha');
const chai = require('chai'), expect = chai.expect

describe("quote-gif-program", () => {
  // Create and set the provider. We set it before but we needed to update it, so that it can communicate with our frontend!
  const provider = anchor.Provider.env();
  anchor.setProvider(provider);

  const program = anchor.workspace.Myepicproject;
  // Create an account keypair for our program to use.
  const baseAccount = anchor.web3.Keypair.generate();

  it("Is initializes the program", async () => {
    console.log("🚀 Starting test...");
    // Call start_stuff_off, pass it the params it needs!
    const tx = await program.rpc.startStuffOff({
      accounts: {
        baseAccount: baseAccount.publicKey,
        user: provider.wallet.publicKey,
        systemProgram: anchor.web3.SystemProgram.programId,
      },
      signers: [baseAccount],
    });

    console.log("📝 Your transaction signature", tx);

    let account = await program.account.baseAccount.fetch(
      baseAccount.publicKey
    );
    assert.ok(account.totalGifs.eq(new anchor.BN(0)));
  });

  it("Adds a GIF", async () => {
    await program.rpc.addGif("https://media0.giphy.com/media/mlR0QdwsJUDdK/giphy.gif?cid=ecf05e47u48gtrfepnnjltfxerdwlq4r5tnib12cn3vzlpz3&rid=giphy.gif&ct=g", {
      accounts: {
        baseAccount: baseAccount.publicKey,
        user: provider.wallet.publicKey,
      },
    });

    let account = await program.account.baseAccount.fetch(
      baseAccount.publicKey
    );
    assert.ok(account.totalGifs.eq(new anchor.BN(1)));

    let gifs = account.gifList;
    assert.equal(gifs[0].gifLink, "https://media0.giphy.com/media/mlR0QdwsJUDdK/giphy.gif?cid=ecf05e47u48gtrfepnnjltfxerdwlq4r5tnib12cn3vzlpz3&rid=giphy.gif&ct=g");
    assert.ok(gifs[0].userAddress.equals(provider.wallet.publicKey));
  });

  it("Upvotes a GIF", async () => {
    // upVote, downVote requires an item index (u64)
    // that should be provided as an anchor.BN()
    await program.rpc.upVote(new anchor.BN(0), {
      accounts: {
        baseAccount: baseAccount.publicKey,
      },
    });

    let account = await program.account.baseAccount.fetch(
      baseAccount.publicKey
    );
    let gifs = account.gifList;
    assert.ok(gifs[0].votes.eq(new anchor.BN(1)));
  });

  it("Downvotes a GIF", async () => {
    // upVote, downVote requires an item index (u64)
    // that should be provided as an anchor.BN()
    await program.rpc.downVote(new anchor.BN(0), {
      accounts: {
        baseAccount: baseAccount.publicKey,
      },
    });

    let account = await program.account.baseAccount.fetch(
      baseAccount.publicKey
    );
    let gifs = account.gifList;
    assert.ok(gifs[0].votes.eq(new anchor.BN(0)));
  });
});