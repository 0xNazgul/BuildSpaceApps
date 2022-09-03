import Intro from 0xf8d6e0586b0a20c7

pub fun main(accot: Address): [UInt64] {
    let publicRef = getAccount(acct).getCapability(/public/BottomShot2)
        .borrow<&BottomShot.Collection{BottomShot.CollectionPublic}>()
        ?? panic ("account doesn't have colection")

    return publicRef.getIDs()
}