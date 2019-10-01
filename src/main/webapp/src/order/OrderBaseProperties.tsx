import * as React from "react";
import {Checkbox, DropdownItemProps, DropdownProps, Grid, Form, Placeholder} from 'semantic-ui-react'
import Order from "./Order";
import Employee from "../employees/Employee";
import RealEstate from "../realestate/RealEstate";
import RealEstateDetails from "./RealEstateDetails";
import {ChangeEvent} from "react";
import OrderIdInput from "./OrderIdInput";
import SelectRealEstate from "./SelectRealEstate";
import Helper from "../common/Helper";

interface OrderEditProps {
    order: Order;
    selectedTechnician?: Employee;
    selectedRealEstate?: RealEstate;
    handleOrderChange: (name: string, value: any) => void
    handleValidUserId: (isValid:boolean) => void
    technicians: Employee[];
    realEstates: RealEstate[];
    validUserId: boolean;
    shouldValidate: boolean;
    readOnly : boolean;
}

export default class OrderBaseProperties extends React.Component<OrderEditProps, {}> {

    render(){
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
                                          onChange={this.handleOrderChange.bind(this)} isValid={this.props.handleValidUserId}
                                          shouldValidate={this.props.shouldValidate}
                            />
                        </Form.Field>
                    </Grid.Column>
                    <Grid.Column computer={6} tablet={6} mobile={8}>
                        <Form.Field>
                            <label>Monteuer </label>
                            <Form.Dropdown id="technician"
                                           selection
                                           search
                                           options={this.mapTechnicianToDropdownItems(this.props.technicians)}
                                           value={this.props.order.technician}
                                           onChange={this.updateTechnician.bind(this)}
                                           error={this.props.shouldValidate && this.props.order.technician === undefined ?
                                               {
                                                   content: 'Pflichtfeld',
                                               } : null}
                            />
                        </Form.Field>
                    </Grid.Column>
                    <Grid.Column computer={6} tablet={6}/>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column computer={8} tablet={8} mobile={16}>
                        <Checkbox toggle
                                  name={"smallOrder"}
                                  label={"Kleinauftrag"}
                                  checked={this.props.order.smallOrder}
                                  onChange={this.toggleSmallOrder.bind(this)}/>
                    </Grid.Column>
                </Grid.Row>
                <SelectRealEstate selectedRealestate={this.getCurrentRealEstate()} realestates={this.props.realEstates}
                                  order={this.props.order} onValueChanged={this.updateRealEstate.bind(this)}
                                  shouldValidate={this.props.shouldValidate}
                />
                <Grid.Row>
                    <Grid.Column computer={4} tablet={4} mobile={8}>
                        <Form.Field>
                            <label>NE </label>
                            <Form.Input id="utilisationUnit"
                                        placeholder='Nutzungseinheit'
                                        value={this.props.order.utilisationUnit}
                                        name='utilisationUnit'
                                        onChange={this.handleOrderChange.bind(this)}
                            />
                        </Form.Field>
                    </Grid.Column>
                    <Grid.Column computer={6} tablet={6} mobile={8}>
                        <Form.Field>
                            <label>Name </label>
                            <Form.Input id="name"
                                        placeholder='Name'
                                        value={this.props.order.name}
                                        name='name'
                                        onChange={this.handleOrderChange.bind(this)}
                            />
                        </Form.Field>
                    </Grid.Column>
                </Grid.Row>
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
                    <Grid.Column computer={6} tablet={6} mobile={8}>
                        <Form.Field>
                            <label>Tel. Nummer</label>
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
        return this.props.realEstates.find((realEstate: RealEstate) => realEstate._links.self!.href === this.props.order.realEstate);
    }

    private updateRealEstate(realEstate: string) {
        this.props.handleOrderChange('realEstate', realEstate);
    }

    renderReadOnly() {
        if (this.props.selectedTechnician === undefined || this.props.selectedRealEstate === undefined) {
            return PlaceholderExamplePlaceholder();
        }
        return (
            <React.Fragment>
                <Grid.Row>
                    <Grid.Column computer={4} tablet={4} mobile={8}>
                        <label style={{"fontWeight":"bold" }}>Auftrags-ID: </label>
                        <label>{this.props.order.orderId}</label>
                    </Grid.Column>
                    <Grid.Column computer={6} tablet={6} mobile={8}>
                        <label style={{"fontWeight":"bold" }}>Monteuer: </label>
                        <label>{this.props.selectedTechnician!.technicianId} {this.props.selectedTechnician!.firstName} {this.props.selectedTechnician!.lastName}</label>
                    </Grid.Column>
                    <Grid.Column computer={6} tablet={6}/>
                </Grid.Row>
                <Grid.Row>
                    {this.props.order.smallOrder === true? null :
                    <Grid.Column computer={8} tablet={8} mobile={16}>
                    <label >Kleinauftrag</label>
                    </Grid.Column>}
                </Grid.Row>
                <Grid.Row>
                    <RealEstateDetails realEstate={this.props.selectedRealEstate!}/>
                </Grid.Row>
                <Grid.Row>
                    {Helper.isEmpty(this.props.order.utilisationUnit) ? null :
                        <Grid.Column computer={4} tablet={4} mobile={8}>
                        <label>NE </label>
                        <label>{this.props.order.utilisationUnit}</label>
                    </Grid.Column>
                    }
                    {Helper.isEmpty(this.props.order.name )? null :
                        <Grid.Column computer={6} tablet={6} mobile={8}>
                            <label>Name </label>
                            <label>{this.props.order.name}</label>
                        </Grid.Column>
                    }
                </Grid.Row>
                <Grid.Row>
                    {Helper.isEmpty(this.props.order.location)? null :
                        <Grid.Column computer={4} tablet={4} mobile={8}>
                            <label>Lage </label>
                            <label>{this.props.order.location}</label>
                        </Grid.Column>
                    }
                    {Helper.isEmpty(this.props.order.phoneNumber )? null :
                    <Grid.Column computer={6} tablet={6} mobile={8}>
                        <label>Tel. Nummer</label>
                        <label>{this.props.order.phoneNumber}</label>
                    </Grid.Column>}
                </Grid.Row>
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