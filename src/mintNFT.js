require("dotenv").config();
const { API_URL, PUBLIC_KEY, PRIVATE_KEY } = process.env;
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");

const contract = require("../artifacts/contracts/factoryNFT.sol/FactoryNFT.json");
const web3 = createAlchemyWeb3(API_URL);

const contractAddress = "0xFd05B417228A4971B8B6553c26E56f13B3fe0717";

const nftContract = new web3.eth.Contract(contract.abi, contractAddress);

(async function (
  tokenURI = "https://gateway.pinata.cloud/ipfs/Qmdq4pzPCiuox3WovXjd1PUUeRYyf4FEuWK3tRytRdphC9"
) {
  try {
    const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest"); //get latest nonce

    //the transaction
    const tx = {
      from: PUBLIC_KEY,
      to: contractAddress,
      nonce: nonce,
      gas: 500000,
      data: nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI(),
    };

    web3.eth.accounts
      .signTransaction(tx, PRIVATE_KEY)
      .then((signedTx) => {
        web3.eth.sendSignedTransaction(
          signedTx.rawTransaction,
          function (err, hash) {
            if (!err) {
              console.log(
                "Transaction : ",
                hash,
                "\nCheck Alchemy's Mempool to view the status of your transaction!"
              );
            } else {
              console.log(
                "Something went wrong when submitting your transaction:",
                err
              );
            }
          }
        );
      })
      .catch((err) => {
        console.log(" Promise failed:", err);
      });
  } catch (error) {
    console.log(error);
  }
})();
