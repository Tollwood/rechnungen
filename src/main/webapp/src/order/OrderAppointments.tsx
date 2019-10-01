import * as React from "react";
import {Form, Grid} from 'semantic-ui-react'
import Order from "./Order";
import {DateInput} from "semantic-ui-calendar-react";
import Helper from "../common/Helper";

interface OrderEditProps {
    handleOrderChange: (name: string, value: any) => void
    readonly : boolean
    order: Order;
}


export default class OrderAppointments extends React.Component<OrderEditProps, {}> {


    render() {
        if(this.props.readonly){
            return this.renderReadOnly();
        }
        else {
            return this.renderEditable();
        }
    }

    private renderEditable() {
        return (
            <Grid.Row>
                <Grid.Column computer={5} tablet={5} mobile={8}>
                    <Form.Field>
                        <label>Erster Termin</label>
                        <DateInput
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
                <Grid.Column computer={5} tablet={5} mobile={8}>
                    <Form.Field>
                        <label>Zweiter Termin</label>
                        <DateInput
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
            <Grid.Column computer={5} tablet={5} mobile={8}>
                <label>Erster Termin</label>
                <label>{this.props.order.firstAppointment}</label>
            </Grid.Column>}
            {Helper.isEmpty(this.props.order.secondAppointment)? null :
            <Grid.Column computer={5} tablet={5} mobile={8}>
                <label>Zweiter Termin</label>
                <label>{this.props.order.secondAppointment}</label>
            </Grid.Column>}
        </Grid.Row>;
    }


}