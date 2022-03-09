import * as React from "react";
import { ChangeEvent } from "react";
import { Address } from "./Address";
import NameValue from "./NameValue";
import { Grid, TextField } from "@mui/material";
interface RealEstateListProps {
  address?: Address;
  handleAddressChange: (nameValue: NameValue) => void;
  errors: Map<string, string>;
}

export default class AddressInput extends React.Component<RealEstateListProps> {
  render() {
    return (
      <React.Fragment>
        <Grid container>
          <Grid item xs={12}>
            <TextField
              id="street"
              fullWidth
              label="Straße"
              placeholder="Straße"
              value={this.props.address?.street}
              name="street"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                this.props.handleAddressChange({
                  name: e.target.name,
                  value: e.target.value,
                })
              }
              //error={this.props.errors.get("street") ? { content: this.props.errors.get("street") } : null}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              id="houseNumber"
              placeholder="Nr."
              fullWidth
              label="Nr."
              value={this.props.address?.houseNumber}
              name="houseNumber"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                this.props.handleAddressChange({
                  name: e.target.name,
                  value: e.target.value,
                })
              }
              //error={this.props.errors.get("houseNumber") ? { content: this.props.errors.get("houseNumber") } : null}
            />
          </Grid>
        </Grid>
        <Grid>
          <Grid width={4}>
            <TextField
              id="zipCode"
              placeholder="PLZ"
              label="PLZ"
              fullWidth
              value={this.props.address?.zipCode}
              name="zipCode"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                this.props.handleAddressChange({
                  name: e.target.name,
                  value: e.target.value,
                })
              }
              //error={this.props.errors.get("zipCode") ? { content: this.props.errors.get("zipCode") } : null}
            />
          </Grid>
          <Grid width={12}>
            <TextField
              id="city"
              label="Stadt"
              fullWidth
              placeholder="Stadt"
              value={this.props.address?.city}
              name="city"
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                this.props.handleAddressChange({
                  name: e.target.name,
                  value: e.target.value,
                })
              }
              //    error={this.props.errors.get("city") ? { content: this.props.errors.get("city") } : null}
            />
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}
