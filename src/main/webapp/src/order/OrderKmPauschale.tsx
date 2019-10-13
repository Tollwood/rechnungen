import * as React from "react";
import {Checkbox, Grid} from 'semantic-ui-react'
import Order from "./Order";

interface OrderKmPauschaleProps {
    handleOrderChange: (name: string, value: any) => void
    order: Order;
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
                    <Grid.Row>
                        <Grid.Column computer={8} tablet={8} mobile={16}>
                            <Checkbox toggle
                                      name={"includeKmFee"}
                                      label={"Km Pauschale anwenden"}
                                      checked={this.props.order.includeKmFee}
                                      onChange={()=>this.props.handleOrderChange('includeKmFee', !this.props.order.includeKmFee)}/>
                        </Grid.Column>
                    </Grid.Row>
        );
    }

    private renderReadOnly() {
        return <Grid.Row>
            <Grid.Column width={8}>
                {this.props.order.includeKmFee? <label style={{"fontWeight": "bold"}}>Inkl. KM-Pauschale</label>: <label style={{"fontWeight": "bold"}}>Ohne KM-Pauschale</label>}
            </Grid.Column>
        </Grid.Row>;
    }
}