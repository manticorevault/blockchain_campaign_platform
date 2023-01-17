import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";
const config = require("../config");

const instance = new web3.eth.Contract(
    CampaignFactory.abi, 
    "0x85D23B3988007443710C8dA4b0adA7Da0E3724d0"
);

export default instance;
