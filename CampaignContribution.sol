// SPDX-License-Identifier: MIT
pragma solidity ^0.8.x;

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

    // Confirm that whoever is creating a request
    // is the campaign manager
    modifier onlyManager() {
        require(msg.sender == manager);
        _;

    }

    // Defines the Campaign as a public function,
    // with the sender as a manager and a minimum
    // value for contribution 
    function Campaign(uint minimum) public {
        manager = msg.sender;
        minimumContribution = minimum;
    }

    // A public payable function  for contributors
    // to adhere to the campaign paying the minimum
    // amount or more
    function contribute() public payable {
        require(msg.value > minimumContribution);

        approvers[msg.sender] = true;
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
} 