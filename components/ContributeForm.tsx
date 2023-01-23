import React from "react";
import { Button, Form, Input, Message } from "semantic-ui-react";

const ContributeForm = (props: any) => {
    return (
        <Form>
            <Form.Field>
                <label>
                    Contribution Amount
                </label>
                <Input
                    label="Ether"
                    labelPosition="right"
                />
            </Form.Field>
            <Button primary>
                Contribute!
            </Button>
        </Form>
    );
}

export default ContributeForm;
