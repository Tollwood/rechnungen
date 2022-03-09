import * as React from "react";
import { ChangeEvent } from "react";
import { Grid, TextField } from "@mui/material";
import Order from "./Order";

interface Props {
  handleOrderChange: (name: string, value: any) => void;
  order: Order;
  errors: Map<string, string>;
}

export default class OrderTaxRate extends React.Component<Props, {}> {
  render() {
    return (
      <Grid item xs={12}>
        <TextField
          id="taxRate"
          label={"Steuersatz"}
          // inline
          value={this.props.order.taxRate}
          name="taxRate"
          type="number"
          onChange={this.handleOrderChange.bind(this)}
          //error={this.props.errors.get("taxRate") || null}
        />
      </Grid>
    );
  }

  handleOrderChange(event: ChangeEvent<HTMLInputElement>) {
    this.props.handleOrderChange(event.target.name, event.target.value);
  }
}
