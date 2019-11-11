import * as React from "react";
import {ChangeEvent} from "react";
import {Form, Grid} from "semantic-ui-react";
import BankDetails from "../employees/BankDetails";

interface Props {
    bankDetails: BankDetails
    handleBankDetailsChange: (event: ChangeEvent<HTMLInputElement>) => void
}

export default class BankInput extends React.Component<Props> {

    render() {
        return <React.Fragment>
            <Grid.Row>
                <Grid.Column >
                    <Form.Field>
                        <label>Bank</label>
                        <input id="bankName"
                               placeholder='Name der Bank'
                               value={this.props.bankDetails.bankName}
                               name='bankName'
                               onChange={this.props.handleBankDetailsChange}/>
                    </Form.Field>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column >
                    <Form.Field>
                        <label>IBAN</label>
                        <input id="iban"
                               placeholder='IBAN'
                               value={this.props.bankDetails.iban}
                               name='iban'
                               onChange={this.props.handleBankDetailsChange}/>
                    </Form.Field>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column>
                    <Form.Field>
                        <label>BIC</label>
                        <input id="bic"
                               placeholder='BIC'
                               value={this.props.bankDetails.bic}
                               name='bic'
                               onChange={this.props.handleBankDetailsChange}/>
                    </Form.Field>
                </Grid.Column>
            </Grid.Row>
        </React.Fragment>
    }

}
