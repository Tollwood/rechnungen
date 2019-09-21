import * as React from "react";
import {ChangeEvent} from "react";
import {DropdownItemProps, DropdownProps, Form, Grid} from 'semantic-ui-react'
import API from "../API";
import Order from "./Order";
import Employee from "../employees/Employee";
import OrderService from "./OrderService";
import ListOrderServices from "./ListOrderServices";
import SelectRealEstate from "./SelectRealEstate";
import CUDButtons from "../common/CUDButtons";
import {DateInput} from "semantic-ui-calendar-react";

interface OrderEditProps {
    onSave: () => void;
    onCancelEdit: () => void;
    onDelete: () => void;
    order?: Order;
}

interface OrderEditState {
    order: Order;
    technicians: { key: string, value: string, text: string }[];
    selectedTechnician?: string;
}

export default class OrderEdit extends React.Component<OrderEditProps, OrderEditState> {

    constructor(props: OrderEditProps) {
        super(props);
        this.state = {
            order: props.order ? props.order : new Order(),
            technicians: []
        }
    }

    componentDidMount(): void {
        this.fetchTechnicians();
        this.fetchCurrentTechnician();

    }

    componentDidUpdate(prevProps: Readonly<OrderEditProps>, prevState: Readonly<OrderEditState>, snapshot?: any): void {
        if (this.props.order !== undefined && this.props.order !== prevProps.order) {
            this.setState({order: this.props.order});
        }
    }

    save() {
        if (this.state.order._links.self === undefined) {
            API.post("/order", this.state.order)
                .then(() => this.props.onSave());
        } else {
            API.patch(this.state.order._links.self!.href, this.state.order)
                .then(() => this.props.onSave());
        }
    }

    render() {
        return (
            <Form>
                <Grid>
                    <Grid.Column width={16}>
                        {this.state.order._links === undefined ? <h1>Neuen Auftrag anlegen</h1> : <h1>Auftrag bearbeiten</h1>}
                    </Grid.Column>
                    <Grid.Row>
                        <Grid.Column computer={4} tablet={4} mobile={8}>
                            <Form.Field>
                                <label>Auftrags-ID</label>
                                <Form.Input id="orderId"
                                            placeholder='Auftrags-ID'
                                            value={this.state.order.orderId}
                                            name='orderId'
                                            onChange={this.handleOrderChange.bind(this)}
                                />
                            </Form.Field>
                        </Grid.Column>
                        <Grid.Column computer={6} tablet={6} mobile={8}>
                            <Form.Field>
                                <label>Monteuer </label>
                                <Form.Dropdown id="technician"
                                               selection
                                               search
                                               options={this.state.technicians}
                                               value={this.state.selectedTechnician}
                                               onChange={this.updateTechnician.bind(this)}
                                />
                            </Form.Field>
                        </Grid.Column>
                        <Grid.Column computer={6} tablet={6}/>
                    </Grid.Row>
                    <SelectRealEstate order={this.state.order} onValueChanged={this.updateRealEstate.bind(this)}/>
                    <Grid.Row>
                        <Grid.Column computer={4} tablet={4} mobile={8}>
                            <Form.Field>
                                <label>NE </label>
                                <Form.Input id="utilisationUnit"
                                            placeholder='Nutzungseinheit'
                                            value={this.state.order.utilisationUnit}
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
                                            value={this.state.order.name}
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
                                            value={this.state.order.location}
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
                                    value={this.state.order.phoneNumber}
                                    name='phoneNumber'
                                    onChange={this.handleOrderChange.bind(this)}
                                />
                            </Form.Field>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column computer={5} tablet={5} mobile={8}>
                            <Form.Field>
                                <label>Erster Termin</label>
                                <DateInput
                                    name="firstAppointment"
                                    placeholder="Termin wählen"
                                    value={this.state.order.firstAppointment ? this.state.order.firstAppointment : ''}
                                    iconPosition="left"
                                    onChange={this.handleDateChange.bind(this)}
                                />
                            </Form.Field>
                        </Grid.Column>
                        <Grid.Column computer={5} tablet={5} mobile={8}>
                            <Form.Field>
                                <label>Zweiter Termin</label>
                                <DateInput
                                    name="secondAppointment"
                                    placeholder="Termin wählen"
                                    value={this.state.order.secondAppointment ? this.state.order.secondAppointment : ''}
                                    iconPosition="left"
                                    onChange={this.handleDateChange.bind(this)}
                                />
                            </Form.Field>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column computer={8} tablet={8} mobile={16}>
                            <h2>Dienstleistungen</h2>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width={16}>
                            <ListOrderServices orderServices={this.state.order.services ? this.state.order.services : []}
                                               onOrderServicesChanged={this.updateOrderServies.bind(this)}/>
                        </Grid.Column>
                    </Grid.Row>
                    <CUDButtons onSave={this.save.bind(this)} onCancel={this.props.onCancelEdit} onDelete={this.delete.bind(this)}
                                canDelete={this.state.order._links.self !== undefined}/>
                </Grid>
            </Form>
        );
    }

    handleOrderChange(event: ChangeEvent<HTMLInputElement>) {
        const name: string = event.target.name;
        this.setState({order: Object.assign(this.state.order, {[name]: event.target.value})});
    }

    // @ts-ignore
    handleDateChange(e: React.SyntheticEvent<HTMLElement>, {name, value}) {
        this.setState({order: Object.assign(this.state.order, {[name]: value})});
    }


    private delete() {
        // @ts-ignore
        API.delete(this.state.order._links.self.href).then(() => {
        });
        this.props.onDelete();
    }

    private nullOrEmpty(value?: string) {
        return value === undefined || value.length === 0;
    }

    private fetchCurrentTechnician() {
        if (this.props.order && this.props.order._links.technician) {
            API.get(this.props!.order!._links!.technician.href)
                .then(res => this.setState(Object.assign(this.state, {selectedTechnician: res.data._links.self.href})))
        }
    }

    private fetchTechnicians() {
        API.get(`/employee`)
            .then(res => res.data)
            .then((data) => this.setState(Object.assign(this.state, {
                technicians: this.mapTechnicianToDropdownItems(data._embedded.employee)
            })));
    }

    private mapTechnicianToDropdownItems(employees: Employee[]): DropdownItemProps[] {
        return employees.map((emp: Employee) => {
            return {key: emp.technicianId, value: emp._links.self!.href, text: this.getDropDownText(emp)}
        });
    }

    private getDropDownText(emp: Employee) {
        return emp.technicianId + " " + emp.firstName + " " + emp.lastName;
    }

    private updateTechnician(event: React.SyntheticEvent<HTMLElement>, data: DropdownProps) {
        const newOrder = Object.assign(this.state.order, {technician: data.value});
        this.setState(Object.assign(this.state, {order: newOrder, selectedTechnician: data.value}))
    }

    private updateRealEstate(realEstate: string) {
        const newOrder = Object.assign(this.state.order, {realEstate: realEstate});
        this.setState(Object.assign(this.state, {order: newOrder}))
    }

    private updateOrderServies(orderServices: OrderService[]) {
        this.setState(Object.assign(this.state, {order: Object.assign(this.state.order, {services: orderServices})}))
    }
}