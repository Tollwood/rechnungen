import * as React from "react";
import { ChangeEvent } from "react";
import Order from "./Order";
import OrderTaxRate from "./OrderTaxRate";
import { Grid, TextField } from "@mui/material";

interface BillDetailsProps {
  order: Order;
  handleOrderChange: (name: string, value: any) => void;
  errors: Map<string, string>;
}

interface BillDetailsState {
  renderPdf: boolean;
}
export default class BillDetails extends React.Component<BillDetailsProps, BillDetailsState> {
  constructor(props: BillDetailsProps) {
    super(props);
    this.state = { renderPdf: false };
  }

  componentDidMount(): void {
    if (!this.props.order.billDate) {
      this.props.handleOrderChange(
        "billDate",
        new Intl.DateTimeFormat("de-DE", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        }).format(new Date())
      );
    }
  }

  render() {
    return (
      <React.Fragment>
        <Grid container>
          <Grid item xs={12}>
            <TextField
              id="billNo"
              label="Rechnungsnummer"
              placeholder="Rechungsnummer"
              value={this.props.order.billNo ? this.props.order.billNo : ""}
              name="billNo"
              onChange={this.handleOrderChange.bind(this)}
              //error={this.props.errors.get("billNo") ? { content: this.props.errors.get("billNo") } : null}
            />
          </Grid>
          <Grid item xs={12}>
            {/* <Form.Field>
              <label>Rechnungsdatum: </label>
              <DateInput
                dateFormat={"DD.MM.YYYY"}
                minDate={"01.01.1990"}
                hideMobileKeyboard={true}
                name="billDate"
                localization="de"
                placeholder="Rechnungsdatum wählen"
                value={this.props.order.billDate ? this.props.order.billDate : ""}
                iconPosition="left"
                onChange={this.handleDateChange.bind(this)}
                error={this.props.errors.get("billDate") ? { content: this.props.errors.get("billDate") } : null}
              />
            </Form.Field> */}
          </Grid>

          <Grid item xs={12}>
            {/* <Form.Field>
              <Checkbox
                toggle
                name={"stornieren"}
                label={"Rechnung stornieren"}
                checked={this.props.order.canceled}
                onChange={this.toggleCancel.bind(this)}
              />
            </Form.Field>
          </Grid.Column> */}
          </Grid>
          <OrderTaxRate
            handleOrderChange={this.props.handleOrderChange.bind(this)}
            order={this.props.order}
            errors={this.props.errors}
          />
        </Grid>
      </React.Fragment>
    );
  }

  toggleCancel(): void {
    this.props.handleOrderChange("canceled", !this.props.order.canceled);
  }

  handleOrderChange(event: ChangeEvent<HTMLInputElement>) {
    this.props.handleOrderChange(event.target.name, event.target.value);
  }

  // @ts-ignore
  handleDateChange(e, { name, value }) {
    this.props.handleOrderChange(name, value);
  }
}
