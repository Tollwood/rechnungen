import * as React from "react";
import { ChangeEvent } from "react";
import { Form, Grid } from "semantic-ui-react";
import BankDetails from "../contractors/BankDetails";

interface Props {
  bankDetails: BankDetails;
  handleBankDetailsChange: (event: ChangeEvent<HTMLInputElement>) => void;
  errors: Map<string, string>;
}

export default class BankInput extends React.Component<Props> {
  render() {
    return (
      <React.Fragment>
        <Grid.Row>
          <Grid.Column>
            <Form.Field>
              <label>Bank</label>
              <Form.Input
                id="bankName"
                placeholder="Name der Bank"
                value={this.props.bankDetails.bankName}
                name="bankName"
                onChange={this.props.handleBankDetailsChange}
                error={this.props.errors.get("bankName") ? { content: this.props.errors.get("bankName") } : null}
              />
            </Form.Field>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Form.Field>
              <label>IBAN</label>
              <Form.Input
                id="iban"
                placeholder="IBAN"
                value={this.props.bankDetails.iban}
                name="iban"
                onChange={this.props.handleBankDetailsChange}
                error={this.props.errors.get("iban") ? { content: this.props.errors.get("iban") } : null}
              />
            </Form.Field>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Form.Field>
              <label>BIC</label>
              <Form.Input
                id="bic"
                placeholder="BIC"
                value={this.props.bankDetails.bic}
                name="bic"
                onChange={this.props.handleBankDetailsChange}
                error={this.props.errors.get("bic") ? { content: this.props.errors.get("bic") } : null}
              />
            </Form.Field>
          </Grid.Column>
        </Grid.Row>
      </React.Fragment>
    );
  }
}
