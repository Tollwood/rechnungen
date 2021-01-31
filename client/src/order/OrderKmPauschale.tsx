import * as React from "react";
import {ChangeEvent} from "react";
import {Checkbox, Form, Grid} from 'semantic-ui-react'
import Order from "./Order";

interface OrderKmPauschaleProps {
    handleOrderChange: (name: string, value: any) => void
    order: Order;
    errors: Map<string, string>;
}

export default class OrderKmPauschale extends React.Component<OrderKmPauschaleProps, {}> {

    render() {
        switch (this.props.order.status) {
            case 'ORDER_EXECUTE':
                return this.renderEditable();
            case 'ORDER_BILL':
            case 'ORDER_BILL_RECIEVED':
            case 'PAYMENT_RECIEVED':
                return this.renderReadOnly();
            case 'ORDER_EDIT':
                return null;
        }
    }

    private renderEditable() {

        return (
            <React.Fragment>
                <Grid.Row>
                    <Grid.Column computer={8} tablet={8} mobile={16}>
                        <Checkbox toggle
                                  name={"includeKmFee"}
                                  label={"Km Pauschale anwenden"}
                                  checked={this.props.order.includeKmFee}
                                  onChange={() => this.props.handleOrderChange('includeKmFee', !this.props.order.includeKmFee)}/>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column computer={16} tablet={16} mobile={16}>
                            <Form.Input id="distance"
                                        label={"tatsächlich gefahrene KM:"}
                                        inline
                                        placeholder='gefahrene Kilometer'
                                        value={this.props.order.distance}
                                        name='distance'
                                        onChange={this.handleOrderChange.bind(this)}
                                        error={this.props.errors.get('distance') ? {content: this.props.errors.get('distance')} : null}
                            />
                    </Grid.Column>
                </Grid.Row>
            </React.Fragment>
        );
    }

    private renderReadOnly() {
        return <Grid.Row>
            <Grid.Column width={8}>
                {this.props.order.includeKmFee ? <label style={{"fontWeight": "bold"}}>Inkl. KM-Pauschale</label> :
                    <label style={{"fontWeight": "bold"}}>Ohne KM-Pauschale</label>}
            </Grid.Column>
        </Grid.Row>;
    }

    handleOrderChange(event: ChangeEvent<HTMLInputElement>) {
        this.props.handleOrderChange(event.target.name, event.target.value);
    }
}