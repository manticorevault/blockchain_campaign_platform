import React from "react";
import { Form, Button } from "semantic-ui-react";

const CampaignNew = class extends React.Component {
    render() {
        return (
        
            <div>
                <h3> Create a Campaign </h3>
                
                <Form>
                    <Form.Field>
                        <label>
                            Campaign Details
                        </label>

                        <input 
                            placeholder="Minimum Contribution"
                        />
                    </Form.Field>  

                    <Button
                        primary 
                    >
                        Create
                    </Button>
                </Form>
            </div>

        );
    }
}

export default CampaignNew;