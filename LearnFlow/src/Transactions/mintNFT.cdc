import Intro from 0xf8d6e0586b0a20c7
import NonFungibleToken from 0xf8d6e0586b0a20c7

transaction(
    recipient: Address,
    name: String,
    description: String,
    thumbnail: String,
) {
    prepare(signer: AuthAccount) {
        if signer.borrow<&Intro.Collection>(from: Intro.CollectionStoragePath) != nil {
            return
        }

        let collection <- Intro.createEmptyCollection()

        signer.save(<-collection, to: Intro.CollectionStoragePath)

        signer.link<&NonFungibleToken.CollectionPublic}>(
            Intro.CollectionPublicPath,
            target: Intro.CollectionStoragePath
        )
}

execute {
    let receiver = getAccount(recipient)
        .getCapability(Intro.CollectionPublicPath)
        .borrow<&{NonFungibleToken.CollectionPublic}>()
        ?? paic("Could not get receiver reference to the NFT Collection")

    Intro.mintNFT(
        recipient: receiver,
        name: name,
        description: description,
        thumbnail: thumbnail,
    )

    log("Minted an NFT and stored it into the collection")
}