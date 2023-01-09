import { Card } from "semantic-ui-react";
import { Button } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import factory from "../ethereum/factory";

interface Props {
    campaigns: any[];
}

export default function Home({ campaigns }: Props) {
    const campaignItems = campaigns.map((item: any) => {
        return {
            header: item,
            description: <a> View Campaign </a>,
            fluid: true,
        };
    });

    return (
        <div>
            <h3> Open Campaigns </h3>
            <Button
                floated="right" 
                content="Create Campaign!"
                icon="add circle"
                labelPosition="right"
                primary
            />
            <Card.Group items={campaignItems} />
        </div>
    );
}

export async function getServerSideProps() {
    const campaigns = await factory.methods.getDeployedCampaigns().call();

    return { props: { campaigns } };
}