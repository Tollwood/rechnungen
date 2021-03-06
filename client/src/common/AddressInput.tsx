import * as React from "react";
import { ChangeEvent } from "react";
import { Form, Grid } from "semantic-ui-react";
import { Address } from "./Address";
import NameValue from "./NameValue";

interface RealEstateListProps {
  address?: Address;
  handleAddressChange: (nameValue: NameValue) => void;
  errors: Map<string, string>;
}

export default class AddressInput extends React.Component<RealEstateListProps> {
  render() {
    return (
      <React.Fragment>
        <Grid.Row>
          <Grid.Column width={12}>
            <Form.Field>
              <label>Straße</label>
              <Form.Input
                id="street"
                fluid
                placeholder="Straße"
                value={this.props.address?.street}
                name="street"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  this.props.handleAddressChange({
                    name: e.target.name,
                    value: e.target.value,
                  })
                }
                error={this.props.errors.get("street") ? { content: this.props.errors.get("street") } : null}
              />
            </Form.Field>
          </Grid.Column>
          <Grid.Column width={4}>
            <Form.Field>
              <label>Nr.</label>
              <Form.Input
                id="houseNumber"
                placeholder="Nr."
                fluid
                value={this.props.address?.houseNumber}
                name="houseNumber"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  this.props.handleAddressChange({
                    name: e.target.name,
                    value: e.target.value,
                  })
                }
                error={this.props.errors.get("houseNumber") ? { content: this.props.errors.get("houseNumber") } : null}
              />
            </Form.Field>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={4}>
            <Form.Field>
              <label>PLZ</label>
              <Form.Input
                id="zipCode"
                placeholder="PLZ"
                fluid
                value={this.props.address?.zipCode}
                name="zipCode"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  this.props.handleAddressChange({
                    name: e.target.name,
                    value: e.target.value,
                  })
                }
                error={this.props.errors.get("zipCode") ? { content: this.props.errors.get("zipCode") } : null}
              />
            </Form.Field>
          </Grid.Column>
          <Grid.Column width={12}>
            <Form.Field>
              <label>Stadt</label>
              <Form.Input
                id="city"
                fluid
                placeholder="Stadt"
                value={this.props.address?.city}
                name="city"
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  this.props.handleAddressChange({
                    name: e.target.name,
                    value: e.target.value,
                  })
                }
                error={this.props.errors.get("city") ? { content: this.props.errors.get("city") } : null}
              />
            </Form.Field>
          </Grid.Column>
        </Grid.Row>
      </React.Fragment>
    );
  }
}
