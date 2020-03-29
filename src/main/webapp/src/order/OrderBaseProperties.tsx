import * as React from "react";
import {ChangeEvent} from "react";
import {Checkbox, DropdownItemProps, DropdownProps, Form, Grid, Placeholder} from 'semantic-ui-react'
import Order from "./Order";
import Employee from "../employees/Employee";
import RealEstate from "../realestate/RealEstate";
import AddressReadOnly from "./AddressReadOnly";
import OrderIdInput from "./OrderIdInput";
import SelectRealEstate from "./SelectRealEstate";
import Helper from "../common/Helper";
import NameValue from "../common/NameValue";
import Company from "../employees/Company";

interface OrderEditProps {
    order: Order;
    company: Company;
    selectedTechnician?: Employee;
    selectedRealEstate?: RealEstate;
    handleOrderChange: (name: string, value: any) => void
    technicians: Employee[];
    realEstates: RealEstate[];
    readOnly: boolean;
    errors: Map<string, string>
}

export default class OrderBaseProperties extends React.Component<OrderEditProps, {}> {

    render() {
        return this.props.readOnly ? this.renderReadOnly() : this.renderEdit();
    }

    renderEdit() {
        return (
            <React.Fragment>
                <Grid.Row>
                    <Grid.Column computer={4} tablet={4} mobile={8}>
                        <Form.Field>
                            <label>Auftrags-ID</label>
                            <OrderIdInput existing={this.props.order._links.self !== undefined} orderId={this.props.order.orderId}
                                          onChange={this.handleOrderChange.bind(this)}
                                          errors={this.props.errors}
                            />
                        </Form.Field>
                    </Grid.Column>
                    {this.props.company.employeeSupport && <Grid.Column computer={6} tablet={6} mobile={8}>
                        <Form.Field>
                            <label>Monteuer </label>
                            <Form.Dropdown id="technician"
                                           selection
                                           search
                                           options={this.mapTechnicianToDropdownItems(this.props.technicians)}
                                           value={this.props.order.technician}
                                           onChange={this.updateTechnician.bind(this)}
                                           error={this.props.errors.get('technician') ? {content: this.props.errors.get('technician')} : null}
                            />
                        </Form.Field>
                    </Grid.Column>}

                    <Grid.Column computer={6} tablet={6}/>
                </Grid.Row>
                {this.props.company.realEstateSupport &&
                <Grid.Row>
                    <Grid.Column computer={8} tablet={8} mobile={16}>
                        <Checkbox toggle
                                  name={"smallOrder"}
                                  label={"Kleinauftrag"}
                                  checked={this.props.order.smallOrder}
                                  onChange={this.toggleSmallOrder.bind(this)}/>
                    </Grid.Column>
                </Grid.Row>
                }
                {this.props.company.realEstateSupport &&
                <SelectRealEstate selectedRealestate={this.getCurrentRealEstate()} realestates={this.props.realEstates}
                                  order={this.props.order} onValueChanged={this.updateRealEstate.bind(this)}
                                  errors={this.props.errors}
                                  handleAddressChange={this.handleAddressChange.bind(this)}
                />}
                {this.props.company.realEstateSupport &&
                <Grid.Row>
                    <Grid.Column computer={4} tablet={4} mobile={16}>
                        <Form.Field>
                            <label>Nutzungseinheit </label>
                            <Form.Input id="utilisationUnit"
                                        placeholder='Nutzungseinheit'
                                        value={this.props.order.utilisationUnit}
                                        name='utilisationUnit'
                                        onChange={this.handleOrderChange.bind(this)}
                            />
                        </Form.Field>
                    </Grid.Column>
                    <Grid.Column computer={6} tablet={6} mobile={16} style={{marginTop: "23px"}}>
                        <Form.Field>
                            <Form.Input id="name"
                                        placeholder='Name'
                                        value={this.props.order.name}
                                        name='name'
                                        onChange={this.handleOrderChange.bind(this)}
                            />
                        </Form.Field>
                    </Grid.Column>
                    <Grid.Column computer={6} tablet={6} mobile={16} style={{marginTop: "23px"}}>
                        <Form.Field>
                            <Form.Input
                                id="phoneNumber"
                                placeholder='Telefonnummer'
                                value={this.props.order.phoneNumber}
                                name='phoneNumber'
                                onChange={this.handleOrderChange.bind(this)}
                            />
                        </Form.Field>
                    </Grid.Column>
                </Grid.Row>
                }
                {this.props.company.realEstateSupport &&
                <Grid.Row>
                    <Grid.Column computer={4} tablet={4} mobile={8}>
                        <Form.Field>
                            <label>Lage </label>
                            <Form.Input id="location"
                                        placeholder='Lage'
                                        value={this.props.order.location}
                                        name='location'
                                        onChange={this.handleOrderChange.bind(this)}
                            />
                        </Form.Field>
                    </Grid.Column>
                </Grid.Row>
                }
            </React.Fragment>
        );
    }

    handleOrderChange(event: ChangeEvent<HTMLInputElement>) {
        this.props.handleOrderChange(event.target.name, event.target.value);
    }

    toggleSmallOrder(): void {
        this.props.handleOrderChange('smallOrder', !this.props.order.smallOrder);
    }

    private mapTechnicianToDropdownItems(employees: Employee[]): DropdownItemProps[] {
        return employees.map((emp: Employee) => {
            let text = emp.technicianId + " " + emp.firstName + " " + emp.lastName;
            return {key: emp.technicianId, value: emp._links.self!.href, text: text}
        });
    }

    private updateTechnician(event: React.SyntheticEvent<HTMLElement>, data: DropdownProps) {
        this.props.handleOrderChange('technician', data.value);
    }

    private getCurrentRealEstate() {
        return this.getRealEstateBySelfLink(this.props.order.realEstate);
    }

    private getRealEstateBySelfLink(href?: String) {
        return this.props.realEstates.find((realEstate: RealEstate) => realEstate._links.self!.href === href);
    }

    private updateRealEstate(realEstate: string) {
        this.props.handleOrderChange('realEstate', realEstate);
        let currentRealEstate = this.getCurrentRealEstate();
        this.props.handleOrderChange('distance', currentRealEstate!.distance);
        this.props.handleOrderChange('realEstateAddress', this.getRealEstateBySelfLink(realEstate) != null ? this.getRealEstateBySelfLink(realEstate)!!.address : null);
    }

    private handleAddressChange(nameValue: NameValue) {
        const newAddress = Object.assign(this.props.order.realEstateAddress, {[nameValue.name]: nameValue.value});
        this.props.handleOrderChange('realEstateAddress', newAddress);
        //errors: ErrorMapper.removeError(this.state.errors, "address."+nameValue.name)
    }

    renderReadOnly() {
        if ((this.props.company.realEstateSupport && this.props.selectedRealEstate === undefined )
            || (this.props.company.employeeSupport && this.props.selectedTechnician === undefined) ) {
            return PlaceholderExamplePlaceholder();
        }
        return (
            <React.Fragment>
                <Grid.Row>
                    <Grid.Column computer={this.props.order.smallOrder === true ? 4 : 8}
                                 tablet={this.props.order.smallOrder === true ? 4 : 8}
                                 mobile={this.props.order.smallOrder === true ? 8 : 16}>
                        <span style={{"fontWeight": "bold"}}>Auftrags-ID:</span>
                        <span> {this.props.order.orderId}</span>
                    </Grid.Column>
                    {this.props.order.smallOrder &&
                        <Grid.Column computer={4} tablet={4} mobile={8}>
                            <div style={{"fontWeight": "bold"}}><label>Kleinauftrag</label></div>
                        </Grid.Column>
                        }
                    {this.props.company.employeeSupport &&
                    <Grid.Column computer={8} tablet={8} mobile={16}>
                        <span style={{"fontWeight": "bold"}}>Monteuer:</span>
                        <span> {this.props.selectedTechnician!.technicianId} {this.props.selectedTechnician!.firstName} {this.props.selectedTechnician!.lastName}</span>
                    </Grid.Column>
                    }
                </Grid.Row>
                {this.props.company.realEstateSupport &&
                <Grid.Row>
                    <Grid.Column computer={8} tablet={8} mobile={16}>
                        <span style={{"fontWeight": "bold", float: "left"}}>Adresse:</span>
                        <AddressReadOnly
                            address={this.props.order.realEstateAddress !== null ? this.props.order.realEstateAddress : this.props.selectedRealEstate!.address}/>
                    </Grid.Column>
                </Grid.Row>}
                {!Helper.isEmpty(this.props.order.utilisationUnit) || !Helper.isEmpty(this.props.order.name) || !Helper.isEmpty(this.props.order.phoneNumber) || !Helper.isEmpty(this.props.order.location) ?
                    <Grid.Row>
                        {!Helper.isEmpty(this.props.order.utilisationUnit) || !Helper.isEmpty(this.props.order.name) ?
                            <Grid.Column width={6}>
                                {!Helper.isEmpty(this.props.order.utilisationUnit) ?
                                    <span style={{"fontWeight": "bold"}}>Nutzungseinheit:</span> :
                                    <span style={{"fontWeight": "bold"}}>Name:</span>}
                                {Helper.isEmpty(this.props.order.utilisationUnit) ? null : <span> {this.props.order.utilisationUnit}</span>}
                                {!Helper.isEmpty(this.props.order.utilisationUnit) && (!Helper.isEmpty(this.props.order.name)) ?
                                    <span> -</span> : null}
                                {Helper.isEmpty(this.props.order.name) ? null : <span> {this.props.order.name}</span>}
                            </Grid.Column> : null}
                        {Helper.isEmpty(this.props.order.phoneNumber) ? null :
                            <Grid.Column width={5}>
                                <span style={{"fontWeight": "bold"}}>Telefon:</span><span> {this.props.order.phoneNumber}</span>
                            </Grid.Column>
                        }
                        {Helper.isEmpty(this.props.order.location) ? null :
                            <Grid.Column width={5}>
                                <span style={{"fontWeight": "bold"}}>Lage: </span><span>{this.props.order.location}</span>
                            </Grid.Column>
                        }
                    </Grid.Row> : null
                }
            </React.Fragment>
        );
    }

}

const PlaceholderExamplePlaceholder = () => (
    <Grid.Row>
        <Grid.Column width={16}>
            <Placeholder>
                <Placeholder.Header image>
                    <Placeholder.Line/>
                    <Placeholder.Line/>
                </Placeholder.Header>
                <Placeholder.Paragraph>
                    <Placeholder.Line/>
                    <Placeholder.Line/>
                    <Placeholder.Line/>
                    <Placeholder.Line/>
                </Placeholder.Paragraph>
            </Placeholder>
        </Grid.Column>
    </Grid.Row>

)