import * as React from "react";
import {ChangeEvent} from "react";
import {Form, Grid} from 'semantic-ui-react'
import Order from "./Order";

interface Props {
    handleOrderChange: (name: string, value: any) => void
    order: Order;
    errors: Map<string, string>;
}

export default class OrderTaxRate extends React.Component<Props, {}> {

    render() {

        return <React.Fragment>
        <Grid.Row>
            <Grid.Column computer={16} tablet={16} mobile={16}>
                    <Form.Input id="taxRate"
                                label={"Steuersatz"}
                                inline
                                value={this.props.order.taxRate}
                                name='taxRate'
                                type="number"
                                onChange={this.handleOrderChange.bind(this)}
                                error={this.props.errors.get('taxRate') || null}
                    />
            </Grid.Column>
        </Grid.Row>
    </React.Fragment>

        
    }

    handleOrderChange(event: ChangeEvent<HTMLInputElement>) {
        this.props.handleOrderChange(event.target.name, event.target.value);
    }
}