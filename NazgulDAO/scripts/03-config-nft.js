import sdk from "./01-initialize-sdk.js";
import { readFileSync } from "fs";
// Insert drop address here from script 2
const bundleDrop = sdk.getBundleDropModule(
  "0xD716296613d2047De4bC81d2b7Dcb918d72a3B56",
);

(async () => {
  try {
    await bundleDrop.createBatch([
      {
        name: "Cloak & Morgul-knife",
        description: "This NFT will give you access to NazgulDAO!",
        image: readFileSync("scripts/assets/Cloak.jpg"),
      },
    ]);
    console.log("✅ Successfully created a new NFT in the drop!");
  } catch (error) {
    console.error("failed to create the new NFT", error);
  }
})()