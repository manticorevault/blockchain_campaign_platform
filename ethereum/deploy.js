const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const compiledFactory = require("./build/CampaignFactory.json");
const config = require("../config");

const provider = new HDWalletProvider(
    config.metamask.TEST_SEED,
    config.infura.GOERLI_TEST_NETWORK
);

const web3 = new Web3(provider);

const deploy = async () => {
    try {
        if(!compiledFactory.evm.bytecode.object){
          throw new Error("Compiled bytecode is empty")
        }
        const accounts = await web3.eth.getAccounts();
        if(!accounts[0]){
          throw new Error("Account not found")
        }
        console.log("Attempting to deploy using account " + accounts[0]);

        const txn = await new web3.eth.Contract(compiledFactory.abi)
                            .deploy({ data: "0x" + compiledFactory.evm.bytecode.object })
                            .send({ from: accounts[0] });

        console.log("The contract factory is sitting at " + txn.options.address);
    } catch (err) {
        console.log("Error: " + err.message);
    }
    provider.engine.stop(); 
};

deploy().catch(console.error);
