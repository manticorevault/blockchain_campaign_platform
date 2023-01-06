import web3 from "./web3";
import CampaignFactory from "./build/CampaignFactory.json";
import { config } from "./config";

const instance = new web3.eth.Contract(
    CampaignFactory.abi, 
    config.FACTORY_ADDRESS
);

export default instance;
