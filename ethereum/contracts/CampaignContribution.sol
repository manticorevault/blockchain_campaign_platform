// SPDX-License-Identifier: MIT
pragma solidity ^0.8.x;

// Create a Factory contract that will deploy the 
// original campaign contract
contract CampaignFactory {
    address[] public deployedCampaigns;

    function createCampaign(uint minimumAmount) external {
        // Instructions to deploy the new instances
        // of the campaign contract
        address newCampaign = address(new CampaignContract(minimumAmount, msg.sender));

        // Add the newly generated campaign to the array
        deployedCampaigns.push(newCampaign);
    }

    // Returns the campaign's array
    function getDeployedCampaigns() public view returns (address[] memory){
        return deployedCampaigns;
    }
}

contract CampaignContract {

    struct Request {
        string description;
        uint value;
        address recipient;
        bool complete;
        uint approvalCount; 
        mapping(address => bool) approvingVotes;
    }

    Request[] public requests; 
    address public manager;
    uint public minimumContribution;
    mapping(address => bool) public approvers; 
    uint public approversCount;

    // Confirm that whoever is creating a request
    // is the campaign manager
    modifier onlyManager() {
        require(msg.sender == manager);
        _;

    }

    // Defines the Campaign as a public function,
    // with the sender as a manager and a minimum
    // value for contribution 
    constructor(uint minimum, address campaignCreator) {
        manager = campaignCreator;
        minimumContribution = minimum;
    }

    // A public payable function  for contributors
    // to adhere to the campaign paying the minimum
    // amount or more
    function contribute() public payable {
        require(msg.value > minimumContribution);

        approvers[msg.sender] = true;

        // Increment the approversCount
        approversCount++;
    }

    // A public function for the manager to create campaign 
    // requests from an external account, locked by the custom
    // restricted 'onlyManager' modifier
    function createRequest
                (string memory description, 
                uint value, 
                address recipient) 
                public onlyManager {
                    Request storage newRequest = requests.push();
                    
                    newRequest.description = description;
                    newRequest.value = value;
                    newRequest.recipient = recipient;
                    newRequest.complete = false;
                    newRequest.approvalCount = 0;
                }    

    // A public function to check all the approved requests
    // based on their index
    function approveRequest(uint index) public {

        Request storage request = requests[index];

        // Requirements: User is a donator
        require(approvers[msg.sender]);
        // Requirements: User didn't vote before
        require(!request.approvingVotes[msg.sender]);

        // Add the user address to the approval's mapping
        request.approvingVotes[msg.sender] = true;
        request.approvalCount++;

    }

    // Create a function that a manager finalizes a request, 
    // only after the request already gathered enough votes

    function finalizeRequest(uint index) public onlyManager {

        Request storage request = requests[index];

        require(request.approvalCount > (approversCount / 2));
        require(!request.complete);

        payable(request.recipient).transfer(request.value);
        request.complete = true;
    }

    // Returns a summary of the contract's statistics.
    function getSummary() public view returns (
        uint256, // For minimumContribution,
        uint256, // For balance,
        uint256, // for requests length,
        uint256, // for approversCount,
        address // for manager
    ) {
        return (
            minimumContribution,
            address(this).balance,
            requests.length,
            approversCount,
            manager
        );
    }

    // Returns the number of requests in a certain contract call
    function getRequestsCount() public view returns (uint256) {
        return requests.length;
    }
} 