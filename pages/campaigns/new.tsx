import React, { useState } from "react";
import { Form, Button, Input } from "semantic-ui-react";

const CampaignNew:React.FC = () => {
    const [minimumContribution, setMinimumContribution] = useState<string>("");

    const onMinimumContributionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMinimumContribution(event.target.value);
    };

    return (
        <div>
            <h3> Create Your Campaign </h3>

            <Form>
                <Form.Field>
                    <label>
                        Campaign Details
                    </label>

                    <Input 
                        label="ETH"
                        labelPosition="right"
                        placeholder="Minimum Contribution in ETH"
                        value={ minimumContribution }
                        onChange={ onMinimumContributionChange }
                    />
                </Form.Field>  

                <Button
                    primary 
                >
                    Create
                </Button>
            </Form>
        </div>
    )
}


export default CampaignNew;