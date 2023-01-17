import { useRouter } from 'next/router';
import React, { Component, useEffect, useState } from 'react';
import Campaign from "../../ethereum/campaign";

interface Props {
    address: string;
    minimumContribution: string;
    balance: string;
    requestCount: string;
    approversCount: string;
    manager: string;
}

const CampaignShow: React.FC<Props> = ({
        address,
        minimumContribution,
        balance,
        requestCount,
        approversCount,
        manager
    }) => {

        // Handle the type check for address
        if (!address) return <p> Invalid address </p>

        const router = useRouter();
        const [campaign, setCampaign] = useState<Props | null>(null);

        useEffect(() => {
            const getData = async () => {

                // Type checking for address
                if (typeof router.query.address !== "string") {
                    return;
                }
                const campaign = Campaign(router.query.address);
                const summary = await campaign.methods.getSummary().call();
                
                setCampaign({
                    address: router.query.address,
                    minimumContribution: summary[0],
                    balance: summary[1],
                    requestCount: summary[2],
                    approversCount: summary[3],
                    manager: summary[4],
                });
            };

            getData();
        }, [router.query.address]);

        return (
            <div>
                <h3>{campaign ? campaign.address : 'Loading...'}</h3>
                {campaign ? (
                    <>
                        <p>Minimum Contribution: {campaign.minimumContribution}</p>
                        <p>Balance: {campaign.balance}</p>
                        <p>Requests Count: {campaign.requestCount}</p>
                        <p>Approvers Count: {campaign.approversCount}</p>
                        <p>Manager: {campaign.manager}</p>
                    </>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        );
};

export const getServerSideProps = async (ctx: any) => {

    // Type check for address
    if(typeof ctx.query.address !== "string") {
        return { props: {} };
    }

    const campaign = Campaign(ctx.query.address);
    const summary = await campaign.methods.getSummary().call();

    return {
        props: {
            address: ctx.query.address,
            minimumContribution: summary[0],
            balance: summary[1],
            requestCount: summary[2],
            approversCount: summary[3],
            manager: summary[4],
        },
    };
};

export default CampaignShow;