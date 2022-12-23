const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const compiledFactory = require("./build/CampaignFactory.json");
require('dotenv').config()

const provider = new HDWalletProvider(
    process.env.METAMASK_TEST_SEED,
    process.env.GOERLI_TEST_NETWORK
);

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    console.log("Attempting to deploy using account " + accounts[0]);

    const txn = await new web3.eth.Contract(compiledFactory.abi)
                        .deploy({ data: "0x" + compiledFactory.evm.bytecode.object })
                        .send({ from: accounts[0] });

    console.log("The contract is sitting at " + txn.options.address);

    provider.engine.stop(); 
};

deploy();
