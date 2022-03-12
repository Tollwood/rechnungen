import { Grid } from "@mui/material";
import * as React from "react";

interface Props {}

const AddressInput: React.FC<Props> = ({}) => {
  return (
    <React.Fragment>
      <Grid container spacing={2}>
        {/* <Grid item xs={4}>
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
        <Grid item xs={4}>
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
        <Grid item xs={8}>
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
        </Grid> */}
      </Grid>
    </React.Fragment>
  );
};
export default AddressInput;
