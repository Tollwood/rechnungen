import * as React from "react";
import { ChangeEvent } from "react";
import BankDetails from "../contractors/BankDetails";
import { TextField, Grid } from "@mui/material";

interface Props {
  bankDetails: BankDetails;
  handleBankDetailsChange: (event: ChangeEvent<HTMLInputElement>) => void;
  errors: Map<string, string>;
}

export default class BankInput extends React.Component<Props> {
  render() {
    return (
      <React.Fragment>
        <Grid container>
          <Grid item>
            <TextField
              id="bankName"
              label="Bank"
              placeholder="Name der Bank"
              value={this.props.bankDetails.bankName}
              name="bankName"
              onChange={this.props.handleBankDetailsChange}
              //error={this.props.errors.get("bankName") ? { content: this.props.errors.get("bankName") } : null}
            />
          </Grid>

          <Grid item>
            <TextField
              id="iban"
              label="IBAN"
              placeholder="IBAN"
              value={this.props.bankDetails.iban}
              name="iban"
              onChange={this.props.handleBankDetailsChange}
              //error={this.props.errors.get("iban") ? { content: this.props.errors.get("iban") } : null}
            />
          </Grid>

          <Grid item>
            <TextField
              id="bic"
              placeholder="BIC"
              label="BIC"
              value={this.props.bankDetails.bic}
              name="bic"
              onChange={this.props.handleBankDetailsChange}
              //error={this.props.errors.get("bic") ? { content: this.props.errors.get("bic") } : null}
            />
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}
