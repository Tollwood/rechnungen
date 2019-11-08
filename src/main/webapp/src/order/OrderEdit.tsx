import * as React from "react";
import {Button, Dropdown, DropdownItemProps, DropdownProps, Form, Grid} from 'semantic-ui-react'
import API from "../API";
import Order from "./Order";
import Employee from "../employees/Employee";
import OrderService from "./OrderService";
import ListOrderServices from "./ListOrderServices";
import RealEstate from "../realestate/RealEstate";
import Service from "./Service";
import OrderBaseProperties from "./OrderBaseProperties";
import OrderAppointments from "./OrderAppointments";
import OrderStatusSteps from "./OrderStatusSteps";
import {OrderStatus} from "./OrderStatus";
import Helper from "../common/Helper";
import BillDetails from "./BillDetails";
import BillButton from "./BillButton";
import PaymentRecieved from "./PaymentRecieved";
import OrderKmPauschale from "./OrderKmPauschale";
import Company from "../employees/Company";
import BillService from "../billing/BillService";

interface OrderEditProps {
    onSave: () => void;
    onCancelEdit: () => void;
    onDelete: () => void;
    order?: Order;
    company: Company;
}

interface OrderEditState {
    order: Order;
    technicians: Employee[];
    realEstates: RealEstate[];
    services: Service[];
    validUserId: boolean;
    shouldValidate: boolean
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
            validUserId: false,
            shouldValidate: false
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
        this.setState({shouldValidate: true});
        if (!this.isValid()) {
            return;
        }
        if (this.state.order._links.self === undefined) {
            API.post("/api/order", this.state.order)
                .then(result => result.data)
                .then((order: Order) => {
                    order.technician = this.state.order.technician;
                    order.realEstate = this.state.order.realEstate;
                    this.setState({order: order});
                });
        } else {
            API.patch(this.state.order._links.self!.href, this.state.order)
                .then(result => result.data)
                .then((order: Order) => {
                    order.technician = this.state.order.technician;
                    order.realEstate = this.state.order.realEstate;
                    this.setState({order: order});
                });
        }
    }

    render() {
        return (
            <div className="order-edit">
                <Form autoComplete={"off"}>
                    <Grid>
                        <OrderStatusSteps status={this.state.order.status}
                                          statusChanged={(status: OrderStatus) => this.handleOrderChange('status', status)}/>
                        <OrderBaseProperties order={this.state.order}
                                             selectedTechnician={this.getCurrentTechnician()}
                                             selectedRealEstate={this.getCurrentRealEstate()}
                                             handleOrderChange={this.handleOrderChange.bind(this)}
                                             realEstates={this.state.realEstates} technicians={this.state.technicians}
                                             validUserId={this.state.validUserId}
                                             handleValidUserId={(isValid: boolean) => this.setState({validUserId: isValid})}
                                             shouldValidate={this.state.shouldValidate}
                                             readOnly={this.state.order.status !== 'ORDER_EDIT'}/>

                        <OrderAppointments handleOrderChange={this.handleOrderChange.bind(this)}
                                           order={this.state.order}/>
                        {this.state.order.status === 'ORDER_EDIT' || this.state.order.status === 'ORDER_EXECUTE' ?
                            <ListOrderServices services={this.state.services}
                                               orderServices={this.state.order.services ? this.state.order.services : []}
                                               onOrderServicesChanged={this.updateOrderServies.bind(this)}/>
                            : null}
                        <OrderKmPauschale handleOrderChange={this.handleOrderChange.bind(this)} order={this.state.order}/>
                        {this.shouldRenderBillDetails() ?
                            <BillDetails order={this.state.order} handleOrderChange={this.handleOrderChange.bind(this)}/> : null}
                        <BillButton company={this.props.company} order={this.state.order} services={this.state.services}
                                    technician={this.getCurrentTechnician()} realEstate={this.getCurrentRealEstate()}/>
                        <PaymentRecieved order={this.state.order} handleOrderChange={this.handleOrderChange.bind(this)}/>
                        <Grid.Row centered>
                            <Grid.Column width={5} floated='left'>
                                {this.state.order.status === Helper.nextStatus(this.state.order.status) ? null : <Button.Group primary>
                                    <Button content='Speichern' onClick={this.save.bind(this)} className={"save-bttn"}/>

                                    <Dropdown
                                        className='button icon save-continue'
                                        floating
                                        value={''}
                                        onChange={this.saveAndContinue.bind(this)}
                                        options={this.getSaveOptions()}
                                        trigger={<React.Fragment/>}
                                    />

                                </Button.Group>}
                            </Grid.Column>
                            <Grid.Column width={5}>
                                <Button className={"cancel-bttn"} content='Abbrechen' icon='cancel' labelPosition='left'
                                        onClick={this.props.onCancelEdit}/>
                            </Grid.Column>
                            <Grid.Column width={5} floated='right'>
                                {this.state.order._links.self !== undefined ?
                                    <Button className={"delete-bttn"} floated={"right"} color={"red"} content={"Löschen"} icon='trash'
                                            labelPosition='left'
                                            onClick={this.delete.bind(this)}/> : null
                                }
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Form>
            </div>
        );
    }

    handleOrderChange(name: string, value: any) {
        this.setState({order: Object.assign(this.state.order, {[name]: value})});
    }

    // @ts-ignore
    handleDateChange(e: React.SyntheticEvent<HTMLElement>, {name, value}) {
        this.handleOrderChange(name, value);
    }

    private delete() {
        // @ts-ignore
        API.delete(this.state.order._links.self.href).then(() => {
            this.props.onDelete();
        });
    }

    private fetchCurrentTechnician() {
        if (this.props.order && this.props.order._links.technician) {
            API.get(this.props!.order!._links!.technician.href)
                .then(res => this.handleOrderChange('technician', res.data._links.self.href))
        }
    }

    private fetchTechnicians() {
        API.get('/api/employee')
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


    private updateStatus(event: React.SyntheticEvent<HTMLElement>, data: DropdownProps) {
        const newOrder = Object.assign(this.state.order, {status: data.value});
        this.setState(Object.assign(this.state, {order: newOrder}))
    }

    private updateOrderServies(orderServices: OrderService[]) {
        this.setState(Object.assign(this.state, {order: Object.assign(this.state.order, {services: orderServices})}))
    }


    private fetchServices() {
        API.get('/api/service')
            .then(res => {
                console.log(res);
                console.log(res.data);
                return res.data;
            })
            .then(data => {
                this.setState({services: data._embedded.service});
            });
    }

    private fetchRealEstates() {
        API.get('/api/realestate')
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
                    this.handleOrderChange('realEstate', res.data._links.self.href)
                })
        }
    }

    private getCurrentRealEstate() {
        return this.state.realEstates.find((realEstate: RealEstate) => realEstate._links.self!.href === this.state.order.realEstate);
    }

    private getCurrentTechnician() {
        return this.state.technicians.find((technician: Employee) => technician._links.self!.href === this.state.order.technician);
    }

    private getOrderStatusOptions(): { key: string, value: string, text: string }[] {
        return [
            {key: 'ORDER_EDIT', value: "ORDER_EDIT", text: "Auftrag erfassen"},
            {key: 'ORDER_EXECUTE', value: "ORDER_EXECUTE", text: "Auftragsdurchführung"},
            {key: 'ORDER_BILL', value: "ORDER_BILL", text: "Rechnung erfasst"},
            {key: 'ORDER_BILL_RECIEVED', value: "ORDER_BILL_RECIEVED", text: "Rechnungsbetrag erhalten"},
            {key: 'PAYMENT_RECIEVED', value: "PAYMENT_RECIEVED", text: "Rechnungsbetrag erhalten"}
        ];
    }

    private shouldRenderBillDetails() {
        return this.state.order.status === 'ORDER_BILL';
    }

    private isValid() {
        return this.isSet(this.state.order.realEstate) && this.isSet(this.state.order.technician)
            && (this.state.validUserId || (this.props.order !== undefined && this.props.order._links.self !== undefined));
    }

    private isSet(value?: string) {
        return value !== undefined && value.length > 0;
    }

    private saveAndContinue(event: React.SyntheticEvent<HTMLElement>, data: DropdownProps) {
        this.setState({shouldValidate: true});
        if (!this.isValid()) {
            return;
        }
        this.handleOrderChange('status', Helper.nextStatus(this.state.order.status));
        if (this.state.order.status === 'ORDER_BILL') {
            this.handleOrderChange('billItems', BillService.createBillItems(this.state.order, this.state.services, this.getCurrentRealEstate()))
        }
        this.save();
    }

    private getSaveOptions() {
        let icon = Helper.getStatusIcon(Helper.nextStatus(this.state.order.status));
        return [{key: 'Speicher', value: 'Speichern', text: 'Speichern und weiter', icon: icon}];
    }
}

