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
import OrderIdInput from "./OrderIdInput";
import Billpdf from "../billing/Billpdf";
import RealEstate from "../realestate/RealEstate";
import {PDFViewer} from "@react-pdf/renderer";
import Service from "./Service";
import BillService from "../billing/BillService";

interface OrderEditProps {
    onSave: () => void;
    onCancelEdit: () => void;
    onDelete: () => void;
    order?: Order;
}

interface OrderEditState {
    order: Order;
    technicians: Employee[];
    selectedTechnician?: string;
    realEstates: RealEstate[];
    selectedRealEstate?: string;
    services: Service[]
    canSave: boolean;
}

export default class OrderEdit extends React.Component<OrderEditProps, OrderEditState> {

    constructor(props: OrderEditProps) {
        super(props);
        let order = props.order ? props.order : new Order();
        this.state = {
            order: order,
            technicians: [],
            realEstates: [],
            services: [],
            canSave: false
        }
    }

    componentDidMount(): void {
        this.fetchTechnicians();
        this.fetchCurrentTechnician();
        this.fetchServices();
        this.fetchRealEstates();
        this.fetchCurrentRealEstate();
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
            <Form autoComplete={"off"}>
                <Grid>
                    <Grid.Column width={16}>
                        {this.state.order._links === undefined ? <h1>Neuen Auftrag anlegen</h1> : <h1>Auftrag bearbeiten</h1>}
                    </Grid.Column>
                    <Grid.Row>
                        <Grid.Column computer={4} tablet={4} mobile={8}>
                            <Form.Field>
                                <label>Auftrags-ID</label>
                                <OrderIdInput existing={this.state.order._links.self !== undefined} orderId={this.state.order.orderId}
                                              onChange={this.handleOrderChange.bind(this)} isValid={this.setCanSave.bind(this)}/>
                            </Form.Field>
                        </Grid.Column>
                        <Grid.Column computer={6} tablet={6} mobile={8}>
                            <Form.Field>
                                <label>Monteuer </label>
                                <Form.Dropdown id="technician"
                                               selection
                                               search
                                               options={this.mapTechnicianToDropdownItems(this.state.technicians)}
                                               value={this.state.selectedTechnician}
                                               onChange={this.updateTechnician.bind(this)}
                                />
                            </Form.Field>
                        </Grid.Column>
                        <Grid.Column computer={6} tablet={6}/>
                    </Grid.Row>
                    <SelectRealEstate selectedRealestate={this.getCurrentRealEstate()} realestates={this.state.realEstates} order={this.state.order} onValueChanged={this.updateRealEstate.bind(this)}/>
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
                                    minDate={'01.01.1990'}
                                    hideMobileKeyboard={true}
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
                                    minDate={'01.01.1990'}
                                    hideMobileKeyboard={true}
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
                            <ListOrderServices services={this.state.services}
                                               orderServices={this.state.order.services ? this.state.order.services : []}
                                               onOrderServicesChanged={this.updateOrderServies.bind(this)}/>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width={16}>
                            <PDFViewer width={"100%"} height={"800px"}>
                                <Billpdf
                                    bill={BillService.createNewBill(this.state.order, this.state.services, this.getCurrentRealEstate(), this.getCurrentTechnician())}/>
                            </PDFViewer>
                        </Grid.Column>
                    </Grid.Row>
                    <CUDButtons canSave={this.state.canSave || (this.props.order !== undefined && this.props.order._links.self !== undefined)}
                                onSave={this.save.bind(this)} onCancel={this.props.onCancelEdit}
                                onDelete={this.delete.bind(this)}
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

    private fetchCurrentTechnician() {
        if (this.props.order && this.props.order._links.technician) {
            API.get(this.props!.order!._links!.technician.href)
                .then(res => this.setState({selectedTechnician: res.data._links.self.href}))
        }
    }

    private fetchTechnicians() {
        API.get(`/employee`)
            .then(res => res.data)
            .then((data) => this.setState(Object.assign(this.state, {
                technicians: data._embedded.employee
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
        this.setState({order: newOrder, selectedRealEstate: realEstate});
    }

    private updateOrderServies(orderServices: OrderService[]) {
        this.setState(Object.assign(this.state, {order: Object.assign(this.state.order, {services: orderServices})}))
    }

    private setCanSave(canSave: boolean) {
        this.setState({canSave: canSave});
    }

    private fetchServices() {
        API.get(`/services`)
            .then(res => {
                console.log(res);
                console.log(res.data);
                return res.data;
            })
            .then(data => {
                this.setState({services: data._embedded.services});
            });
    }

    private fetchRealEstates() {
        API.get(`/realestate`)
            .then(res => res.data)
            .then((data) => {
                this.setState({
                    realEstates: data._embedded.realestate
                })
            });
    }

    private fetchCurrentRealEstate() {
        if (this.props.order && this.props.order._links.realEstate) {
            API.get(this.props!.order!._links!.realEstate.href)
                .then(res => {
                    this.setState({
                        selectedRealEstate: res.data._links.self.href
                    })
                })
        }
    }

    private getCurrentRealEstate() {
        return this.state.realEstates.find((realEstate: RealEstate) => realEstate._links.self!.href === this.state.selectedRealEstate);
    }

    private getCurrentTechnician() {
        return this.state.technicians.find((technician: Employee) => technician._links.self!.href === this.state.selectedTechnician);
    }
}