import * as React from "react";
import { Button, DropdownItemProps, DropdownProps, Form, Grid, Modal, Segment } from "semantic-ui-react";
import RealEstate from "../realestate/RealEstate";
import Order from "./Order";
import AddressReadOnly from "./AddressReadOnly";
import AddressInput from "../common/AddressInput";
import NameValue from "../common/NameValue";

interface SelectRealEstateProps {
  order: Order;
  realestates: RealEstate[];
  selectedRealestate?: RealEstate;
  onValueChanged: (realEstate?: RealEstate) => void;
  errors: Map<string, string>;
  handleAddressChange: (nameValue: NameValue) => void;
}

export default class SelectRealEstate extends React.Component<SelectRealEstateProps, {}> {
  constructor(props: SelectRealEstateProps) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <React.Fragment>
        <Grid.Row>
          <Grid.Column computer={8} tablet={8} mobile={16}>
            <Form.Field>
              <label>Liegenschaft</label>
              <Form.Dropdown
                id="realEstate"
                search
                selection
                options={this.mapRealestateToDropdownItems(this.props.realestates)}
                value={this.props.selectedRealestate ? this.props.selectedRealestate._id : undefined}
                onChange={this.updateRealEstate.bind(this)}
                error={this.props.errors.get("realEstate") ? { content: this.props.errors.get("realEstate") } : null}
              />
            </Form.Field>
          </Grid.Column>
          {this.renderDetails()}
        </Grid.Row>
      </React.Fragment>
    );
  }

  private renderDetails() {
    if (this.props.selectedRealestate == null) return;
    return (
      <React.Fragment>
        <Grid.Column computer={7} tablet={7} mobile={15} style={{ marginTop: "23px" }}>
          <AddressReadOnly address={this.props.order.realEstateAddress} />
        </Grid.Column>
        <Grid.Column width={1} style={{ marginTop: "23px" }}>
          <Modal trigger={<Button icon={"edit"} />} closeOnDimmerClick>
            <Modal.Content>
              <h2 style={{ textAlign: "center" }}>Liegenschaft anpassen</h2>
              <Segment raised>
                <Grid>
                  <AddressInput
                    address={this.props.order.realEstateAddress}
                    handleAddressChange={this.props.handleAddressChange.bind(this)}
                    errors={this.props.errors}
                  />
                </Grid>
              </Segment>
            </Modal.Content>
          </Modal>
        </Grid.Column>
      </React.Fragment>
    );
  }

  private mapRealestateToDropdownItems(realEstates: RealEstate[]): DropdownItemProps[] {
    return realEstates.map((realEstate: RealEstate) => {
      return { key: realEstate.name, value: realEstate._id, text: realEstate.name };
    });
  }

  private updateRealEstate(event: React.SyntheticEvent<HTMLElement>, data: DropdownProps) {
    const selectedId = data.value as number;
    this.props.onValueChanged(this.props.realestates.find((r) => r._id === selectedId));
  }
}
