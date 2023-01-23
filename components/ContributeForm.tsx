import Router from "next/router";
import React, { Component } from "react";
import { Button, Form, Input, Message } from "semantic-ui-react";
import Campaign from "../ethereum/campaign";
import web3 from "../ethereum/web3";

class ContributeForm extends Component {

    state = {
        value: ""
    }

    onSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        const address = Router.query.address

        const campaign = Campaign(address);

        try {
            const accounts = await web3.eth.getAccounts();
            
            await campaign.methods.contribute().send({
                from: accounts[0],
                value: web3.utils.toWei(this.state.value, "ether")
            });
        } catch (err) {
            
        }
    };

    render () {
        return (
            <Form onSubmit={ this.onSubmit }>
                <Form.Field>
                    <label>
                        Contribution Amount
                    </label>
                    <Input
                        label="Ether"
                        labelPosition="right"
                        value={ this.state.value }
                        onChange={ event => this.setState({ 
                                                value: event.target.value 
                                            }) 
                                }
                    />
                </Form.Field>
                <Button primary>
                    Contribute!
                </Button>
            </Form>
        );
    }
}

export default ContributeForm;
