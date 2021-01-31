import * as React from "react";
import { ChangeEvent } from "react";
import { Checkbox, DropdownItemProps, DropdownProps, Form, Grid } from "semantic-ui-react";
import Order from "./Order";
import Employee from "../employees/Employee";
import RealEstate from "../realestate/RealEstate";
import AddressReadOnly from "./AddressReadOnly";
import OrderIdInput from "./OrderIdInput";
import SelectRealEstate from "./SelectRealEstate";
import Helper from "../common/Helper";
import NameValue from "../common/NameValue";
import ClientTemplate from "../clientTemplate/ClientTemplate";

interface OrderEditProps {
  order: Order;
  handleOrderChange: (name: string, value: any) => void;
  updateClent: (clientTemplate: ClientTemplate) => void;
  updateRealEstate: (realEstate?: RealEstate) => void;
  technicians: Employee[];
  realEstates: RealEstate[];
  readOnly: boolean;
  errors: Map<string, string>;
  clientTemplates: ClientTemplate[];
}

const OrderBaseProperties: React.FC<OrderEditProps> = (props: OrderEditProps) => {
  return props.readOnly ? renderReadOnly() : renderEdit();

  function renderEdit() {
    const clients = props.clientTemplates;

    return (
      <React.Fragment>
        <Grid.Row>
          <Grid.Column computer={4} tablet={4} mobile={8}>
            <Form.Field>
              <label>Auftrags-ID</label>
              <OrderIdInput
                existing={props.order.id !== undefined}
                orderId={props.order.orderId}
                onChange={handleOrderChange}
                errors={props.errors}
              />
            </Form.Field>
          </Grid.Column>
          <Grid.Column computer={6} tablet={6} mobile={8}>
            <Form.Field>
              <label>Auftraggeber </label>
              <Form.Dropdown
                id="client"
                selection
                search
                value={
                  clients.find((c) => c.name === props.order.clientName)
                    ? clients.indexOf(clients.find((c) => c.name === props.order.clientName)!)
                    : undefined
                }
                options={mapCLientToDropdownItems(clients)}
                onChange={updateClient}
                error={props.errors.get("client") ? { content: props.errors.get("client") } : null}
              />
            </Form.Field>
          </Grid.Column>
          <Grid.Column computer={6} tablet={6} mobile={8}>
            <Form.Field>
              <label>Monteuer </label>
              <Form.Dropdown
                id="technician"
                selection
                search
                options={mapTechnicianToDropdownItems(props.technicians)}
                value={props.order.technician?.id}
                onChange={updateTechnician}
                error={props.errors.get("technician") ? { content: props.errors.get("technician") } : null}
              />
            </Form.Field>
          </Grid.Column>
          <Grid.Column computer={6} tablet={6} />
        </Grid.Row>
        <Grid.Row>
          <Grid.Column computer={8} tablet={8} mobile={16}>
            <Checkbox
              toggle
              name={"smallOrder"}
              label={"Kleinauftrag"}
              checked={props.order.smallOrder}
              onChange={toggleSmallOrder}
            />
          </Grid.Column>
        </Grid.Row>
        <SelectRealEstate
          selectedRealestate={props.order.realEstate}
          realestates={props.realEstates}
          order={props.order}
          onValueChanged={props.updateRealEstate}
          errors={props.errors}
          handleAddressChange={handleAddressChange}
        />
        <Grid.Row>
          <Grid.Column computer={4} tablet={4} mobile={16}>
            <Form.Field>
              <label>Nutzungseinheit </label>
              <Form.Input
                id="utilisationUnit"
                placeholder="Nutzungseinheit"
                value={props.order.utilisationUnit}
                name="utilisationUnit"
                onChange={handleOrderChange}
              />
            </Form.Field>
          </Grid.Column>
          <Grid.Column computer={6} tablet={6} mobile={16} style={{ marginTop: "23px" }}>
            <Form.Field>
              <Form.Input
                id="name"
                placeholder="Name"
                value={props.order.name}
                name="name"
                onChange={handleOrderChange}
              />
            </Form.Field>
          </Grid.Column>
          <Grid.Column computer={6} tablet={6} mobile={16} style={{ marginTop: "23px" }}>
            <Form.Field>
              <Form.Input
                id="phoneNumber"
                placeholder="Telefonnummer"
                value={props.order.phoneNumber}
                name="phoneNumber"
                onChange={handleOrderChange}
              />
            </Form.Field>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column computer={4} tablet={4} mobile={8}>
            <Form.Field>
              <label>Lage </label>
              <Form.Input
                id="location"
                placeholder="Lage"
                value={props.order.location}
                name="location"
                onChange={handleOrderChange}
              />
            </Form.Field>
          </Grid.Column>
        </Grid.Row>
      </React.Fragment>
    );
  }

  function handleOrderChange(event: ChangeEvent<HTMLInputElement>) {
    props.handleOrderChange(event.target.name, event.target.value);
  }

  function toggleSmallOrder(): void {
    props.handleOrderChange("smallOrder", !props.order.smallOrder);
  }

  function mapTechnicianToDropdownItems(employees: Employee[]): DropdownItemProps[] {
    return employees.map((emp: Employee) => {
      let text = emp.technicianId + " " + emp.firstName + " " + emp.lastName;
      return { key: emp.technicianId, value: emp.id, text: text };
    });
  }

  function updateTechnician(event: React.SyntheticEvent<HTMLElement>, data: DropdownProps) {
    props.handleOrderChange(
      "technician",
      props.technicians.find((t) => t.id === data.value)
    );
  }

  function mapCLientToDropdownItems(clients: ClientTemplate[]): DropdownItemProps[] {
    return clients.map((client: ClientTemplate, index: number) => {
      return { key: client.name, value: index, text: client.name };
    });
  }

  function updateClient(event: React.SyntheticEvent<HTMLElement>, data: DropdownProps) {
    const clientTemplate = props.clientTemplates[data.value as number];

    props.updateClent(clientTemplate);
  }

  function handleAddressChange(nameValue: NameValue) {
    const newAddress = { ...props.order.realEstateAddress, [nameValue.name]: nameValue.value };
    props.handleOrderChange("realEstateAddress", newAddress);
    //errors: ErrorMapper.removeError(this.state.errors, "address."+nameValue.name)
  }

  function renderReadOnly() {
    return (
      <React.Fragment>
        <Grid.Row>
          <Grid.Column
            computer={props.order.smallOrder === true ? 4 : 8}
            tablet={props.order.smallOrder === true ? 4 : 8}
            mobile={props.order.smallOrder === true ? 8 : 16}
          >
            <span style={{ fontWeight: "bold" }}>Auftrags-ID:</span>
            <span> {props.order.orderId}</span>
          </Grid.Column>
          {props.order.smallOrder === true ? (
            <Grid.Column computer={4} tablet={4} mobile={8}>
              <div style={{ fontWeight: "bold" }}>
                <label>Kleinauftrag</label>
              </div>
            </Grid.Column>
          ) : null}
          <Grid.Column computer={8} tablet={8} mobile={16}>
            <span style={{ fontWeight: "bold" }}>Monteuer:</span>
            <span>
              {" "}
              {props.order.technician?.technicianId} {props.order.technician?.firstName}{" "}
              {props.order.technician?.lastName}
            </span>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column computer={8} tablet={8} mobile={16}>
            <span style={{ fontWeight: "bold", float: "left" }}>Adresse:</span>
            <AddressReadOnly
              address={
                props.order.realEstateAddress?.zipCode !== null
                  ? props.order.realEstateAddress
                  : props.order.realEstate!.address
              }
            />
          </Grid.Column>
        </Grid.Row>
        {!Helper.isEmpty(props.order.utilisationUnit) ||
        !Helper.isEmpty(props.order.name) ||
        !Helper.isEmpty(props.order.phoneNumber) ||
        !Helper.isEmpty(props.order.location) ? (
          <Grid.Row>
            {!Helper.isEmpty(props.order.utilisationUnit) || !Helper.isEmpty(props.order.name) ? (
              <Grid.Column width={6}>
                {!Helper.isEmpty(props.order.utilisationUnit) ? (
                  <span style={{ fontWeight: "bold" }}>Nutzungseinheit:</span>
                ) : (
                  <span style={{ fontWeight: "bold" }}>Name:</span>
                )}
                {Helper.isEmpty(props.order.utilisationUnit) ? null : <span> {props.order.utilisationUnit}</span>}
                {!Helper.isEmpty(props.order.utilisationUnit) && !Helper.isEmpty(props.order.name) ? (
                  <span> -</span>
                ) : null}
                {Helper.isEmpty(props.order.name) ? null : <span> {props.order.name}</span>}
              </Grid.Column>
            ) : null}
            {Helper.isEmpty(props.order.phoneNumber) ? null : (
              <Grid.Column width={5}>
                <span style={{ fontWeight: "bold" }}>Telefon:</span>
                <span> {props.order.phoneNumber}</span>
              </Grid.Column>
            )}
            {Helper.isEmpty(props.order.location) ? null : (
              <Grid.Column width={5}>
                <span style={{ fontWeight: "bold" }}>Lage: </span>
                <span>{props.order.location}</span>
              </Grid.Column>
            )}
          </Grid.Row>
        ) : null}
      </React.Fragment>
    );
  }
};

export default OrderBaseProperties;
