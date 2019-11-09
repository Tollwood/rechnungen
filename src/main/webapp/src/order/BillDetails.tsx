import * as React from "react";
import {ChangeEvent} from "react";
import Order from "./Order";
import {DateInput} from "semantic-ui-calendar-react";
import {Form, Grid} from "semantic-ui-react";

interface BillDetailsProps {
    order: Order
    handleOrderChange: (name: string, value: string) => void
}

interface BillDetailsState {
    renderPdf: boolean;
}
export default class BillDetails extends React.Component<BillDetailsProps, BillDetailsState> {

    constructor(props: BillDetailsProps) {
        super(props);
        this.state = {renderPdf: false}
    }

    componentDidMount(): void {
        if (!this.props.order.billDate) {
            this.props.handleOrderChange("billDate", new Intl.DateTimeFormat('de-DE', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit'
            }).format(new Date()));
        }

        if (!this.props.order.billNo) {
            this.props.handleOrderChange("billNo", "R" + new Intl.DateTimeFormat('de-DE', {
                year: '2-digit'
            }).format(new Date()) + "-");
        }
    }

    render() {
        return (
            <React.Fragment>
                <Grid.Row>
                    <Grid.Column computer={5} tablet={5} mobile={8}>
                        <Form.Field>
                            <label>Rechnungsnummer: </label>
                            <Form.Input id="billNo"
                                        placeholder='Rechungsnummer'
                                        value={this.props.order.billNo ? this.props.order.billNo : ''}
                                        name='billNo'
                                        onChange={this.handleOrderChange.bind(this)}
                            />
                        </Form.Field>
                    </Grid.Column>
                    <Grid.Column computer={5} tablet={5} mobile={8}>
                        <Form.Field>
                            <label>Rechnungsdatum: </label>
                            <DateInput
                                dateFormat={"DD.MM.YYYY"}
                                minDate={'01.01.1990'}
                                hideMobileKeyboard={true}
                                name="billDate"
                                placeholder="Rechnungsdatum wählen"
                                value={this.props.order.billDate ? this.props.order.billDate : ''}
                                iconPosition="left"
                                onChange={this.handleDateChange.bind(this)}
                            />
                        </Form.Field>
                    </Grid.Column>
                </Grid.Row>
            </React.Fragment>
        );
    }

    handleOrderChange(event: ChangeEvent<HTMLInputElement>) {
        this.props.handleOrderChange(event.target.name, event.target.value);
    }

    // @ts-ignore
    handleDateChange(e, {name, value}) {
        this.props.handleOrderChange(name, value);
    }
}