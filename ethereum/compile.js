const path = require("path");
const solc = require("solc");
const fs = require("fs-extra");

// Get the build folder
const buildPath = path.resolve(__dirname, "build");

// Remove it if it exists.
fs.removeSync(buildPath);

// Compile both factory and original contract with solc
const campaignContractPath = path.resolve(__dirname, "contracts", "CampaignContribution.sol")
const source = fs.readFileSync(campaignContractPath, "UTF-8")

const input = {
    language: "Solidity",
    sources: {
        "CampaignContribution.sol": {
            content: source,
        },
    },

    settings: {
        outputSelection: {
            "*": {
                "*": ["*"],
            },
        },
    },
};

const output = JSON.parse(solc.compile(JSON.stringify(input)));

// Check if the dir exists, otherwise creates it
fs.ensureDirSync(buildPath)

// Creates a file based on the output
for (let contract in output.contracts["CampaignContribution.sol"]) {
    fs.outputJSONSync(
        path.resolve(buildPath, contract.replace(":", "") + ".json"),
        output.contracts["CampaignContribution.sol"][contract]
    );
}

module.exports = JSON.parse(solc.compile(JSON.stringify(input)))
            .contracts["CampaignContribution.sol"]
            .Campaign;