import React, { useState, useEffect } from "react";
import { NextPage } from "next";
import { Button, Table } from "semantic-ui-react";
import { useRouter } from "next/router";
import Campaign from "../../../ethereum/campaign";
import { Link } from "../../../routes";

interface Props {
    address: string;
}

const RequestIndex: NextPage<Props> = ({ address }) => {
    const [campaign, setCampaign] = useState<Campaign | null>(null);
    const router = useRouter();

    useEffect(() => {
        const loadCampaign = async () => {
            const campaign = Campaign(address);
            setCampaign(campaign);
        };
        loadCampaign();
    }, [address]);

    return (
        <div>
            <h3>
                Request List!
            </h3>
            <Link href={`/campaigns/${address}/requests/new`}>
                <a>
                    <Button primary>Add Request</Button>    
                </a>  
            </Link>
        </div>
    )
}

RequestIndex.getInitialProps = async (ctx: NextPageContext) => {
    const { address } = ctx.query;
    return { address }
}

export default RequestIndex;
``
