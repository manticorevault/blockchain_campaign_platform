import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";
const config = require("../config");

const instance = new web3.eth.Contract(
    CampaignFactory.abi, 
    "0x8ae26e30E80A1E345C5d60160C828B37Eb3b9B39"
);

export default instance;
