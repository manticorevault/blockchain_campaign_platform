import React, { Component } from "react";
import factory from "../ethereum/factory";

function CampaignIndex({ campaigns }: any) {
    console.log("Campaigns", campaigns); 

    return <h1> { campaigns[0] } </h1>
}

CampaignIndex.getInitialProps = async () => {
    const campaigns = await factory.methods.getDeployedCampaigns().call()

    return { campaigns };
};

export default CampaignIndex



