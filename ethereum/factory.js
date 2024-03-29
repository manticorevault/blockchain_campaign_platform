import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";
const config = require("../config");

const instance = new web3.eth.Contract(
    CampaignFactory.abi, 
    config.factory.ADDRESS
);

export default instance;
