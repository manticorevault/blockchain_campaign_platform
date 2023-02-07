import { Card } from "semantic-ui-react";
import { Button } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import factory from "../ethereum/factory";
import Link from "next/link";


export default function Home({ campaigns }) {
    const campaignItems = campaigns.map((item) => {
        return {
            header: item,
            description: (
                <Link
                    href={`/campaigns/${ item }`}
                >
                    <a>
                        View Campaign
                    </a>
                </Link>
            ),
            fluid: true,
        };
    });

    return (
        <div>
            <h3> Open Campaigns </h3>

            <Link
                href="/campaigns/new"
            >
                <a>
                    <Button
                        floated="right" 
                        content="Create Campaign!"
                        icon="add circle"
                        labelPosition="right"
                        primary
                    />
                </a>
            </Link>
            <Card.Group items={campaignItems} />
        </div>
    );
}

export async function getServerSideProps() {
    const campaigns = await factory.methods.getDeployedCampaigns().call();

    return { props: { campaigns } };
}