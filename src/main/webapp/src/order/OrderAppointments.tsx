import * as React from "react";
import {Form, Grid} from 'semantic-ui-react'
import Order from "./Order";
import {DateInput} from "semantic-ui-calendar-react";
import Helper from "../common/Helper";

interface OrderEditProps {
    handleOrderChange: (name: string, value: any) => void
    order: Order;
}


export default class OrderAppointments extends React.Component<OrderEditProps, {}> {


    render() {
        if(!(this.props.order.status === 'ORDER_EDIT' || this.props.order.status === 'ORDER_EXECUTE')){
            return this.renderReadOnly();
        }
        else {
            return this.renderEditable();
        }
    }

    private renderEditable() {
        return (
            <Grid.Row>
                <Grid.Column computer={8} tablet={8} mobile={16}>
                    <Form.Field>
                        <label>Erster Termin</label>
                        <DateInput
                            dateFormat={"DD.MM.YYYY"}
                            minDate={'01.01.1990'}
                            hideMobileKeyboard={true}
                            name="firstAppointment"
                            placeholder="Termin wählen"
                            value={this.props.order.firstAppointment ? this.props.order.firstAppointment : ''}
                            iconPosition="left"
                            onChange={this.handleDateChange.bind(this)}
                        />
                    </Form.Field>
                </Grid.Column>
                <Grid.Column computer={8} tablet={8} mobile={16}>
                    <Form.Field>
                        <label>Zweiter Termin</label>
                        <DateInput
                            dateFormat={"DD.MM.YYYY"}
                            minDate={'01.01.1990'}
                            hideMobileKeyboard={true}
                            name="secondAppointment"
                            placeholder="Termin wählen"
                            value={this.props.order.secondAppointment ? this.props.order.secondAppointment : ''}
                            iconPosition="left"
                            onChange={this.handleDateChange.bind(this)}
                        />
                    </Form.Field>
                </Grid.Column>
            </Grid.Row>
        );
    }

    // @ts-ignore
    handleDateChange(e, {name, value}) {
        this.props.handleOrderChange(name, value);
    }

    private renderReadOnly() {
        return <Grid.Row>
            {Helper.isEmpty(this.props.order.firstAppointment)? null :
            <Grid.Column width={8}>
                <label style={{"fontWeight": "bold"}}>Erster Termin</label><label> {this.props.order.firstAppointment}</label>
            </Grid.Column>}
            {Helper.isEmpty(this.props.order.secondAppointment)? null :
            <Grid.Column width={8}>
                <label style={{"fontWeight": "bold"}}>Zweiter Termin</label><label> {this.props.order.secondAppointment}</label>
            </Grid.Column>}
        </Grid.Row>;
    }


}