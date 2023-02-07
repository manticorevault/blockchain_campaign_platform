import React, { Component } from 'react';
import { Form, Button, Input, Message } from 'semantic-ui-react';
import Router from 'next/router';
import factory from '../../ethereum/factory';
import web3 from "../../ethereum/web3";

class CampaignNew extends Component {

  state = {
    minimumContribution: '',
    errorMessage: '',
    loading: false
  };

  onSubmit = async (event) => {
    event.preventDefault();

    this.setState({ loading: true, errorMessage: '' });

    try {
      const accounts = await web3.eth.getAccounts();

      await factory.methods
        .createCampaign(this.state.minimumContribution)
        .send({
          from: accounts[0]
        });

        Router.push("/");
        
    } catch (error) {
      this.setState({ errorMessage: error.message });
    }

    this.setState({ loading: false });
  };

  render() {
    return (
      <div>
        <h3>
          Create a Campaign
        </h3>

        <Form onSubmit={ this.onSubmit } error={ !!this.state.errorMessage }>
          <Form.Field>
            <label>
              Minimum Contribution
            </label>
            <Input
              label="wei"
              labelPosition="right"
              placeholder="Value in Wei"
              value={ this.state.minimumContribution } 
              onChange={event =>
                this.setState({ minimumContribution: event.target.value })}
            />
          </Form.Field>

          <Message error header="Oops! Something went wrong!" content={ this.state.errorMessage } />
          <Button loading={ this.state.loading } primary>
            Create!
          </Button>
        </Form>
      </div>
    );
  }
}

export default CampaignNew;