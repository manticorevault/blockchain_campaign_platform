import { useRouter } from 'next/router';
import React, { Component, useEffect, useState } from 'react';
import { Card, Grid, Button } from 'semantic-ui-react';
import Campaign from "../../../ethereum/campaign";
import web3 from "../../../ethereum/web3";
import ContributeForm from "../../../components/ContributeForm";
import { Link } from "../../../routes";


class CampaignShow extends Component {
    static async getInitialProps(props) {
        // console.log(props)
        const campaign = Campaign(props.query.id);

        const summary = await campaign.methods.getSummary().call();

        return {
            address: props.query.id,
            minimumContribution: summary[0],
            balance: summary[1],
            requestsCount: summary[2],
            approversCount: summary[3],
            manager: summary[4]
        };
    }

    renderCards() {
        const {
            balance, 
            manager,
            minimumContribution,
            requestsCount,
            approversCount
        } = this.props;

        const items = [
            {
                header: manager,
                meta: 'Address of Manager',
                description:
                  'The manager created this campaign and can create requests to withdraw money',
                style: { overflowWrap: 'break-word' }
            },
            {
                header: minimumContribution,
                meta: 'Minimum Contribution (wei)',
                description:
                  'You must contribute at least this much wei to become an approver'
            },
            {
                header: requestsCount,
                meta: 'Number of Requests',
                description:
                  'A request tries to withdraw money from the contract. Requests must be approved by approvers'
            },
            {
                header: approversCount,
                meta: 'Number of Approvers',
                description:
                  'Number of people who have already donated to this campaign'
            },
            {
                header: web3.utils.fromWei(balance, 'ether'),
                meta: 'Campaign Balance (ether)',
                description:
                  'The balance is how much money this campaign has left to spend.'
            }
        ];

        return <Card.Group items={ items } />;
    }

    render() {
        const {
            address
        } = this.props;
        return (
            <div>
                <h3>
                    Campaign
                </h3>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={ 10 }>
                            { this.renderCards() }
                        </Grid.Column> 

                        <Grid.Column width={ 6 }>
                            <ContributeForm 
                                address={ this.props.id }
                            />
                        </Grid.Column>
                    </Grid.Row>

                    <Grid.Row>
                        <Grid.Column>
                            <Link route={ `/campaigns/${ address }/requests` }>
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
    }
}

export default CampaignShow