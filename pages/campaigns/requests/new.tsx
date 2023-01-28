import React, { Component } from "react";
import { Form, Button, Input, Message } from "semantic-ui-react";
import Campaign from "../../../ethereum/campaign";
import web3 from "../../../ethereum/web3";
import { useRouter } from "next/router";
import { Link } from "../../../routes";

class RequestNew extends Component {

    state = {
        value: "",
        description: "",
        recipient: ""
    };

    static async getInitialProps(props: { query: { address: any; }; }) {
        const { address } = props.query;

        return { address };
    }

    render() {
        return (
            <div>
                <Form>
                    <Form.Field>
                        <label>
                            Description
                        </label>
                        
                        <Input 
                            value={ 
                                this.state.description
                            }
                            onChange={ event => 
                                this.setState({
                                    description: event.target.value
                                })
                            }
                        />
                    </Form.Field>

                    <Form.Field>
                        <label>
                            Value in ETH
                        </label>
                        <Input
                            value={
                                this.state.value
                            }
                            onChange={ event => 
                                this.setState({
                                    value: event.target.value
                                })
                            }
                        />
                    </Form.Field>

                    <Form.Field>
                        <label>
                            Recipient Address
                        </label>

                        <Input 
                            value={
                                this.state.recipient
                            }
                            onChange={ event =>
                                this.setState({
                                    recipient: event.target.value
                                })
                            }
                        /> 
                    </Form.Field>
                    <Button
                        primary
                    >
                        Create Request
                    </Button>
                </Form>
            </div>
        )
    }
}

export default RequestNew;