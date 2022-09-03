import Intro from 0xf8d6e0586b0a20c7

transaction {
    prepare(acct: AuthAccount) {
        acct.save(<- Intro.createCollection(), to: /storage/Intro)

        acct.link<&BottomShot.Collection{BottomShot.CollectionPublic}>
            (/public/Intro, target: /storage/Intro)        
    }

    execute {
        log("Stored a collection for our empty NFTs")
    }
}

