import * as React from "react";
import {Button, DropdownItemProps, DropdownProps, Form, Grid} from 'semantic-ui-react'
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
import ErrorMapper from "../ErrorMapper";
import Link from "../common/Links";

interface OrderEditProps {
    onSave: () => void;
    onCancelEdit: () => void;
    onDelete: () => void;
    orderLink?: Link;
    company: Company;
}

interface OrderEditState {
    order: Order;
    technicians: Employee[];
    realEstates: RealEstate[];
    services: Service[];
    errors: Map<string, string>;
}

export default class OrderEdit extends React.Component<OrderEditProps, OrderEditState> {

    constructor(props: OrderEditProps) {
        super(props);
        let order = new Order();
        this.state = {
            order: order,
            technicians: [],
            realEstates: [],
            services: [],
            errors: new Map<string, string>()
        }
    }

    componentDidMount(): void {
        this.fetchTechnicians();
        this.fetchServices();
        this.fetchRealEstates();
        if (this.props.orderLink !== undefined && this.props.orderLink !== null ) {
            this.fetchOrder(this.props.orderLink);
        }
    }

    componentDidUpdate(prevProps: Readonly<OrderEditProps>, prevState: Readonly<OrderEditState>, snapshot?: any): void {
        if (this.props.orderLink !== undefined && this.props.orderLink !== prevProps.orderLink) {
            this.fetchOrder(this.props.orderLink);
        }
    }

    save(continueToNextStep: boolean) {
        let orderToSave: Order = Object.assign({}, this.state.order);
        orderToSave.distance = this.state.order.distance === undefined && this.getCurrentRealEstate() !== undefined ? this.getCurrentRealEstate()!!.distance : this.state.order.distance;
        if (continueToNextStep) {
            orderToSave.prevStatus = orderToSave.status;
            orderToSave.status = Helper.nextStatus(this.state.order.status);
        }

        if (this.state.order._links.self === undefined) {
            API.post("/api/order", orderToSave)
                .then(result => result.data)
                .then((order: Order) => {
                    this.onSuccess(order);
                })
                .catch(error => {
                    ErrorMapper.map(error, this)
                });
        } else {
            API.patch(this.state.order._links.self!.href, orderToSave)
                .then(result => result.data)
                .then((order: Order) => {
                    this.onSuccess(order);
                })
                .catch(error => {
                    ErrorMapper.map(error, this)
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
                                             readOnly={this.state.order.status !== 'ORDER_EDIT'}
                                             errors={this.state.errors}/>

                        <OrderAppointments handleOrderChange={this.handleOrderChange.bind(this)}
                                           order={this.state.order}
                                           errors={this.state.errors}/>
                        {this.state.order.status === 'ORDER_EDIT' || this.state.order.status === 'ORDER_EXECUTE' ?
                            <ListOrderServices services={this.state.services}
                                               orderServices={this.state.order.services ? this.state.order.services : []}
                                               onOrderServicesChanged={this.updateOrderServies.bind(this)}/>
                            : null}
                        <OrderKmPauschale handleOrderChange={this.handleOrderChange.bind(this)}
                                          order={this.state.order}
                                          errors={this.state.errors}/>
                        {this.shouldRenderBillDetails() ?
                            <BillDetails order={this.state.order} handleOrderChange={this.handleOrderChange.bind(this)}
                                         errors={this.state.errors}/> : null}
                        <BillButton company={this.props.company} order={this.state.order} services={this.state.services}
                                    technician={this.getCurrentTechnician()} realEstate={this.getCurrentRealEstate()}/>
                        <PaymentRecieved order={this.state.order} handleOrderChange={this.handleOrderChange.bind(this)}
                                         errors={this.state.errors}/>
                        <Grid.Row centered>
                            <Grid.Column width={5} floated='left'>
                                {this.state.order.status === Helper.nextStatus(this.state.order.status) ? null : <Button.Group>
                                    <Button primary content='Speichern' onClick={this.save.bind(this, false)} className={"save-bttn"}/>
                                    <Button.Or text='&'/>
                                    <Button primary content='Weiter' onClick={this.saveAndContinue.bind(this)} className={"save-bttn"}
                                            icon={Helper.getStatusIcon(Helper.nextStatus(this.state.order.status))}
                                            labelPosition={"right"}/>
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
        this.setState({
            order: Object.assign(this.state.order, {[name]: value}),
            errors: ErrorMapper.removeError(this.state.errors, name)
        });
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

    private fetchCurrentTechnician(technicianLink: Link) {         API.get(technicianLink.href)
                .then(res => this.handleOrderChange('technician', res.data._links.self.href))
    }

    private fetchOrder(orderLink: Link) {
        API.get(orderLink.href)
            .then(res => res.data)
            .then((order) => {
                this.setState(Object.assign(this.state, {order: order}));
                if(this.state.order._links.realEstate !== undefined) this.fetchCurrentRealEstate(this.state.order._links.realEstate);
                if(this.state.order._links.technician !== undefined) this.fetchCurrentTechnician(this.state.order._links.technician);
            });
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

    private fetchCurrentRealEstate(realEstateLink: Link) {
        API.get(realEstateLink.href)
            .then(res => {
                this.handleOrderChange('realEstate', res.data._links.self.href)
            });
    }

    private getCurrentRealEstate() {
        return this.state.realEstates.find((realEstate: RealEstate) => realEstate._links.self!.href === this.state.order.realEstate);
    }

    private getCurrentTechnician() {
        return this.state.technicians.find((technician: Employee) => technician._links.self!.href === this.state.order.technician);
    }

    private shouldRenderBillDetails() {
        return this.state.order.status === 'ORDER_BILL';
    }

    private saveAndContinue() {
        this.save(true);

    }

    private onSuccess(order: Order) {
        order.technician = this.state.order.technician;
        order.realEstate = this.state.order.realEstate;
        this.setState({order: order});
    }
}

