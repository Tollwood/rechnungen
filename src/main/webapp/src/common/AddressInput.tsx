import * as React from "react";
import {ChangeEvent} from "react";
import {Form, Grid} from "semantic-ui-react";
import {Address} from "./Address";

interface RealEstateListProps {
    address: Address
    handleAddressChange:(event: ChangeEvent<HTMLInputElement>)=>void
}

export default class AddressInput extends React.Component<RealEstateListProps> {

    render() {
        return <React.Fragment>
            <Grid.Row>
                <Grid.Column width={12}>
                    <Form.Field>
                        <label>Straße</label>
                        <input id="street"
                               placeholder='Straße'
                               value={this.props.address.street}
                               name='street'
                               onChange={this.props.handleAddressChange}/>
                    </Form.Field>
                </Grid.Column>
                <Grid.Column width={4}>
                    <Form.Field>
                        <label>Hausnummer</label>
                        <input id="houseNumber"
                               placeholder='Hausnummer'
                               value={this.props.address.houseNumber}
                               name='houseNumber'
                               onChange={this.props.handleAddressChange}/>
                    </Form.Field>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column width={4}>
                    <Form.Field>
                        <label>PLZ</label>
                        <input id="zipCode"
                               placeholder='PLZ'
                               value={this.props.address.zipCode}
                               name='zipCode'
                               onChange={this.props.handleAddressChange}/>
                    </Form.Field>
                </Grid.Column>
                <Grid.Column width={12}>
                    <Form.Field>
                        <label>Stadt</label>
                        <input id="city"
                               placeholder='Stadt'
                               value={this.props.address.city}
                               name='city'
                               onChange={this.props.handleAddressChange}/>
                    </Form.Field>
                </Grid.Column>
            </Grid.Row>
        </React.Fragment>
    }

}
