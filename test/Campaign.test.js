const assert = require("assert");
const ganache = require("ganache-cli");
const options = { gasLimit: 100000000 };
const Web3 = require("web3");
const web3 = new Web3(ganache.provider(options));

const compiledFactory = require("../ethereum/build/CampaignFactory.json");
const compiledCampaign =  require("../ethereum/build/CampaignContract.json");

let accounts;
let factory;
let campaignAddress;
let campaign;

beforeEach(async () => {

    accounts = await web3.eth.getAccounts();

    factory = await new web3.eth.Contract(compiledFactory.abi)
            .deploy({ data: compiledFactory.evm.bytecode.object })
            .send({ from: accounts[0], gas: "10000000" });

    const initialCost = await web3.eth.getBalance(accounts[0]);

    await factory.methods.createCampaign("100").send({
        from: accounts[0],
        gas: "10000000",
      });

    [campaignAddress] = await factory.methods.getDeployedCampaigns().call();

    campaign = await new web3.eth.Contract(
        compiledCampaign.abi,
        campaignAddress
    );

    const finalCost = await web3.eth.getBalance(accounts[0]);

    console.log("The current wallet funds are: ", initialCost - finalCost);
});

describe("Campaigns", () => {
    it("deploys a factory and a campaign", () => {
        assert.ok(factory.options.address);
        assert.ok(campaign.options.address);
    });

    it("marks caller address as the campaign manager", async() => {
        const manager = await campaign.methods.manager().call();

        assert.equal(accounts[0], manager);
    });

    it("allows people to contribute to the campaign and marks them as approvers", async () => {
        await campaign.methods.contribute().send({
            value: "200",
            from: accounts[1]
        });

        const isContributor = await campaign.methods.approvers(accounts[1]).call();

        assert(isContributor);
    });

    it("requires a minimum contribution", async() => {
        try {
            await campaign.methods.contribute().send({
                value: "5",
                from: accounts[1]
            });

            assert(false);
        } catch (error) {
            assert(error);
        }
    });

    it("allows a manager to make a payment request", async() => {
        await campaign.methods
                        .createRequest(
                            "Buy batteries", 
                            "100", 
                            accounts[1]
                        )
                        .send({
                            from: accounts[0],
                            gas: "10000000"            
                        });
        
        const request = await campaign.methods.requests(0).call();
    
        assert.equal("Buy batteries", request.description);
    });

    it("processes requests", async() => {
        await campaign.methods.contribute().send({
            from: accounts[0],
            value: web3.utils.toWei("10", "ether")
        });

        await campaign.methods
                        .createRequest(
                            "Description",
                            web3.utils.toWei("5", "ether"),
                            accounts[1]
                        )
                        .send({
                            from: accounts[0],
                            gas: "10000000"    
                        });

        await campaign.methods
                        .approveRequest(0)
                        .send({
                            from: accounts[0],
                            gas: "10000000"  
                        });

        await campaign.methods
                        .finalizeRequest(0)
                        .send({
                            from: accounts[0],
                            gas: "10000000"  
                        });

        let balance = await web3.eth.getBalance(accounts[1]);
        balance = web3.utils.fromWei(balance, "ether");
        balance = parseFloat(balance);
        
        console.log("Account[1] current balance is: ", balance);

        assert(balance > 104);
    });
});