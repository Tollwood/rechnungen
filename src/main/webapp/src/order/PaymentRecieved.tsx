import * as React from "react";
import Order from "./Order";
import {DateInput} from "semantic-ui-calendar-react";
import {Form, Grid} from "semantic-ui-react";

interface BillDetailsProps {
    order: Order
    handleOrderChange: (name: string, value: string) => void
}


export default class PaymentRecieved extends React.Component<BillDetailsProps, {}> {

    constructor(props: BillDetailsProps) {
        super(props);
        this.state = {renderPdf: false}
    }

    render() {
        if (this.props.order.status !== 'ORDER_BILL_RECIEVED'){
            return null;
        }
        return (
            <React.Fragment>
                <Grid.Row>
                    <Grid.Column computer={5} tablet={5} mobile={8}>
                        <Form.Field>
                            <label>Zahlung erhalten am: </label>
                            <DateInput
                                minDate={'01.01.1990'}
                                hideMobileKeyboard={true}
                                name="paymentRecievedDate"
                                placeholder="Zahlungseingang wählen"
                                value={this.props.order.paymentRecievedDate ? this.props.order.paymentRecievedDate : ''}
                                iconPosition="left"
                                onChange={(e, {name, value})=> this.props.handleOrderChange(name,value)}
                            />
                        </Form.Field>
                    </Grid.Column>
                </Grid.Row>
            </React.Fragment>
        );
    }
}