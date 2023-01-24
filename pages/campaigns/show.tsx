import { useRouter } from 'next/router';
import React, { Component, useEffect, useState } from 'react';
import { Card, Grid, Button } from 'semantic-ui-react';
import Campaign from "../../ethereum/campaign";
import web3 from "../../ethereum/web3";
import ContributeForm from "../../components/ContributeForm";
import { Link } from "../../routes";

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

        const items = [
            {
                header: manager,
                meta: "Manager's address",
                description: "Manager created this campaign",
                style: { overflowWrap: "break-word" }
            },
            {
                header: minimumContribution,
                meta: "Minimum Contribution in Wei",
                description: "This should be the minimum contribution to become an approver",
            },
            {
                header: requestCount,
                meta: "Number of requests",
                description: "A request will withdraw money from the campaign if successfully approved"
            },
            {
                header: approversCount,
                meta: "Number of approvers",
                description: "Number of people who have already donated to this campaign"
            },
            {
                header: web3.utils.fromWei(balance, "ether"),
                meta: "Campaign balance in ETH",
                description: "How much money this campaign has left to spend"
            }
        ];

        return (
            <div>
                <h2>
                    Campaign Address
                </h2>

                <h3>
                    {campaign ? campaign.address : 'Loading...'}
                </h3>

                <Grid>
                    <Grid.Row>
                        <Grid.Column width={ 10 }>
                            {campaign ? (
                                <Card.Group items={ items } />
                            ) : (
                                <p>Loading...</p>
                            )}
                        </Grid.Column>

                        <Grid.Column width={ 6 }>
                            <ContributeForm 
                                address={ router.query.address }
                            />
                        </Grid.Column>
                    </Grid.Row>

                    <Grid.Row>
                        <Grid.Column>
                            <Link 
                                href={ `/campaigns/${ router.query.address }/requests` }
                            >
                                <a>
                                    <Button
                                        primary
                                    >
                                        View Requests
                                    </Button>
                                </a>
                            </Link>
                        </Grid.Column>
                    </Grid.Row>

                </Grid>
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