import React, { Component } from 'react';
import { Button, Table } from 'semantic-ui-react';
import { Link } from '../../../routes';
import Campaign from '../../../ethereum/campaign';
import RequestRow from "../../../components/RequestRow";

interface Props {
  address: string;
  requests: {
    description: string;
    value: string;
    recipient: string;
    approvalCount: number;
    complete: boolean;
  }[];
  requestCount: number;
  approversCount: number;
}

interface Request {
  key: number,
  id: number,
  request: string,
  address: string
}

class RequestIndex extends Component<Props> {

  static async getInitialProps(props: any) {
    const { address } = props.query;
    const campaign = Campaign(address);
    const requestCount = await campaign.methods.getRequestsCount().call();
    const approversCount = await campaign.methods.approversCount().call();

    const requests = await Promise.all(
      Array(parseInt(requestCount, 10))
        .fill(null)
        .map((element, index) => {
          return campaign.methods.requests(index).call();
        })
    );

    return { address, requests, requestCount, approversCount };
  }

  renderRow() {
    return  this.props.requests.map((request, index) => {
      return (
        <RequestRow 
            key={ index }
            id={ index }
            request={ request }
            address={ this.props.address } 
            approversCount = { this.props.approversCount }
        />
      )
    })
  }

  render() {
    const { Header, Row, HeaderCell, Body } = Table;

    return (
      <>
        <h3>
          Requests
        </h3>

        <Link route={`/campaigns/${this.props.address}/requests/new`}>
          <a>
            <Button primary floated="right" style={{ marginBottom: 10 }}>
              Add Request
            </Button>
          </a>
        </Link>
        <Table>
          <Header>
            <Row>
              <HeaderCell>ID</HeaderCell>
              <HeaderCell>Description</HeaderCell>
              <HeaderCell>Amount</HeaderCell>
              <HeaderCell>Recipient</HeaderCell>
              <HeaderCell>Approval Count</HeaderCell>
              <HeaderCell>Approve</HeaderCell>
              <HeaderCell>Finalize</HeaderCell>
            </Row>
          </Header>
          <Body>
            { this.renderRow() }
          </Body>
        </Table>

        <div>There are {this.props.requestCount} requests.</div>
      </>
    );
  }
}

export default RequestIndex;
