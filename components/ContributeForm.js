import Router from "next/router";
import React, { Component } from "react";
import { Button, Form, Input, Message } from "semantic-ui-react";
import Campaign from "../ethereum/campaign";
import web3 from "../ethereum/web3";

class ContributeForm extends Component {

    state = {
        value: "",
        errorMessage: "",
        loading: false
    }

    onSubmit = async (event) => {
        event.preventDefault();
        const address = Router.query.address

        const campaign = Campaign(address);

        this.setState({ loading: true, errorMessage: "" });

        try {
            const accounts = await web3.eth.getAccounts();
            
            await campaign.methods.contribute().send({
                from: accounts[0],
                value: web3.utils.toWei(this.state.value, "ether")
            });

            Router.reload();
        } catch (error) {
            this.setState({ errorMessage: error.message });
        }

        this.setState({ loading: false, value: "" });
    };

    render () {
        return (
            <Form 
                onSubmit={ this.onSubmit }
                error={!!this.state.errorMessage}
            >
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

                <Message 
                    error 
                    header={"Oops!"} 
                    content={this.state.errorMessage}
                />
                <Button 
                    primary
                    loading={ this.state.loading }
                >
                    Contribute!
                </Button>
            </Form>
        );
    }
}

export default ContributeForm;
