const express = require("express");
const Web3 = require("web3");
const Provider = require("@truffle/hdwallet-provider");
const asyncHandler = require("express-async-handler");
const db = require("./firebase");
const abi = require("./abi/VyshManager");
const axios = require('axios')
const ethers = require('ethers');

const app = express();

app.use(express.json()); // parse application/json, basically parse incoming Request Object as a JSON Object
app.use(express.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded, basically can only parse incoming Request Object if strings or arrays, extended : true will parse any object

const port = process.env.PORT || 5001;

const mnemonics = "profit brown cost select actual judge sleep arrow goat rule desert hint";

const provider = new Provider({
    mnemonic: { phrase: mnemonics },
    providerOrUrl: "wss://eth-sf.skalenodes.com/v1/ws/hackathon-complex-easy-naos",
});

const web3 = new Web3(provider);

app.post(
    "/mint",
    asyncHandler(async (req, res) => {
        console.log(req.body);
        const VyshManagerContract = new web3.eth.Contract(abi, "0xfE19819ae10B680CA3CA71411Ad79A1e6307A016");
        const val = await VyshManagerContract.methods
            .mintNFT(req.body.address, req.body.tokenURI) //
            .send({ from: provider.getAddress(0) });
        console.log(val);
        console.log(val.events.minted);
        console.log("NFT and Cert Minted");
        res.status(200).json({
            certTokenId: val.events.minted.returnValues.certTokenId,
            nftTokenId: val.events.minted.returnValues.nftTokenId,
        });
    })
);

// read the API key from an environment variable. You'll need to set this before running the example!
const NFT_STORAGE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEE5NmVFZUNhQzY4MDM3MzRCRkI5MzNBQUQ2ZDQ5MDExOTQ4MUViQ0MiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY2NTUzMzgyOTU3MiwibmFtZSI6IkpDTyJ9.s3feHM9dUbij2UgfzUq9gKnY17tauw1bGO19iS6BTiE"

/**
  * Reads an image file from `imagePath` and stores an NFT with the given name and description.
  * @param {string} imagePath the path to an image file
  * @param {string} name a name for the NFT
  * @param {string} description a text description for the NFT
  */
async function storeNFT(imagePath, name, description, value) {
    // load the file from disk
    const image = await fileFromPath(imagePath)

    // create a new NFTStorage client using our API key
    const nftstorage = new NFTStorage({ token: NFT_STORAGE_KEY })

    // call client.store, passing in the image & metadata
    return nftstorage.store({
        image,
        name,
        description,
        value
    })
}
// For example's sake, we'll fetch an image from an HTTP URL.
// In most cases, you'll want to use files provided by a user instead.
async function getExampleImage() {
    const imageOriginUrl = "https://user-images.githubusercontent.com/87873179/144324736-3f09a98e-f5aa-4199-a874-13583bf31951.jpg"
    const r = await fetch(imageOriginUrl)
    if (!r.ok) {
        throw new Error(`error fetching image: [${r.statusCode}]: ${r.status}`)
    }
    return r
}
app.get("/storeNFT",
    asyncHandler(async (req, res) => {
        const image = await getExampleImage()
        console.log(image)

        const result = await storeNFT('nft.png', 'nft.storage store test', 'Test ERC-1155 compatible metadata.', '50')
        console.log(result)


        res.status(200).json({
            uri: result,
        });
    })

)

app.listen(port, () => console.log(`Server started on port ${port}`));
