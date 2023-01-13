import Web3 from "web3";
const config = require("../config");

let web3;

if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
  window.ethereum.autoRefreshOnNetworkChange = false;
  
  web3 = new Web3(window.ethereum);
} else {
  const provider = new Web3.providers.HttpProvider(
    "https://goerli.infura.io/v3/b21d16fea4e3416c9bb3262d18fca821"
  );

  web3 = new Web3(provider);
}

export default web3;