import Intro from 0xf8d6e0586b0a20c7

transaction {
    prepare(acct: AuthAccount) {
        let collectionReference =
            acct.borrow<&Intro.Collection>(from: /storage/Intro)
            ?? panic("No collection found!")

        collectionReference.deposit(token: <- Intro.mintNFT())
    }

    execute {
        log("Minted an NFT and stored it into the collection")
    }
}
 