import * as React from "react";
import Order from "./Order";

interface BillDetailsProps {
  order: Order;
  handleOrderChange: (name: string, value: string) => void;
  errors: Map<string, string>;
}

export default class PaymentRecieved extends React.Component<BillDetailsProps, {}> {
  constructor(props: BillDetailsProps) {
    super(props);
    this.state = { renderPdf: false };
  }

  render() {
    if (this.props.order.status === "ORDER_BILL_RECIEVED") {
      return this.edit();
    } else if (this.props.order.status === "PAYMENT_RECIEVED") {
      return this.readOnly();
    }
    return null;
  }

  private edit() {
    return (
      <React.Fragment>
        {/* <Grid.Row>
          <Grid.Column computer={5} tablet={5} mobile={8}>
            <Form.Field>
              <label>Zahlung erhalten am: </label>
              <DateInput
                dateFormat={"DD.MM.YYYY"}
                minDate={"01.01.1990"}
                localization={"de"}
                hideMobileKeyboard={true}
                name="paymentRecievedDate"
                placeholder="Zahlungseingang wählen"
                value={this.props.order.paymentRecievedDate ? this.props.order.paymentRecievedDate : ""}
                iconPosition="left"
                // onChange={(e, { name, value }) => this.props.handleOrderChange(name, value)}
                error={
                  this.props.errors.get("paymentRecievedDate")
                    ? { content: this.props.errors.get("paymentRecievedDate") }
                    : null
                }
              />
            </Form.Field>
          </Grid.Column>
        </Grid.Row> */}
      </React.Fragment>
    );
  }
  private readOnly() {
    return (
      <React.Fragment>
        {/* <Grid.Row>
          <Grid.Column computer={5} tablet={5} mobile={8}>
            <Form.Field inline>
              <label>Zahlung erhalten am: </label>
              <span>{this.props.order.paymentRecievedDate}</span>
            </Form.Field>
          </Grid.Column>
        </Grid.Row> */}
      </React.Fragment>
    );
  }
}
