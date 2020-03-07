import * as React from "react";
import {Button, DropdownProps, Form, Grid, Segment} from 'semantic-ui-react'
import Order from "./Order";
import Employee from "../employees/Employee";
import OrderItem from "./OrderItem";
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
import DeleteModal from "../DeleteModal";
import {OrderAddButton} from "./OrderAddButton";
import OrderService from "./OrderService";
import RealEstateService from "../realestate/RealEstateService";
import ServiceService from "../services/ServiceService";
import EmployeeService from "../employees/EmployeeService";
import UnsavedChangesModal from "../UnsavedChangesModal";

interface Props {
    onSave: () => void;
    onCancelEdit: () => void;
    onDelete: () => void;
    orderLink?: Link;
    company: Company;
}

interface State {
    order: Order;
    initialState: Order;
    technicians: Employee[];
    realEstates: RealEstate[];
    services: Service[];
    errors: Map<string, string>;
    showDeleteModal: boolean
    showUnsavedChangesModal: boolean
}

export default class OrderEdit extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        let order = new Order();
        this.state = {
            order: order,
            initialState: order,
            technicians: [],
            realEstates: [],
            services: [],
            errors: new Map<string, string>(),
            showDeleteModal: false,
            showUnsavedChangesModal: false
        }
    }

    componentDidMount(): void {
        EmployeeService.getEmployees((employees => this.setState(Object.assign(this.state, {technicians: employees}))));
        ServiceService.fetchServices((services) => this.setState({services: services}));
        RealEstateService.fetchRealEstates((realEstates: RealEstate[]) => {
            this.setState({realEstates: realEstates})
        });
        if (this.props.orderLink !== undefined && this.props.orderLink !== null) {
            OrderService.getOrder(this.props.orderLink, this.onSuccessGetOrder.bind(this));
        }
    }

    componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>, snapshot?: any): void {
        if (this.props.orderLink !== undefined && this.props.orderLink !== prevProps.orderLink) {
            OrderService.getOrder(this.props.orderLink, this.onSuccessGetOrder.bind(this));
        }
    }

    render() {
        return (
            <Segment>
                <Form autoComplete={"off"}>
                    <Grid>
                        <OrderStatusSteps status={this.state.order.status}
                                          statusChanged={(status: OrderStatus) => this.handleOrderChange('status', status)}/>
                        <OrderBaseProperties order={this.state.order}
                                             selectedTechnician={this.getCurrentTechnician()}
                                             selectedRealEstate={OrderService.getCurrentRealEstate(this.state.order, this.state.realEstates)}
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
                        {this.state.order.status === 'ORDER_BILL' ?
                            <BillDetails order={this.state.order} handleOrderChange={this.handleOrderChange.bind(this)}
                                         errors={this.state.errors}/> : null}
                        <BillButton company={this.props.company} order={this.state.order} services={this.state.services}
                                    technician={this.getCurrentTechnician()}
                                    realEstate={OrderService.getCurrentRealEstate(this.state.order, this.state.realEstates)}/>
                        <PaymentRecieved order={this.state.order} handleOrderChange={this.handleOrderChange.bind(this)}
                                         errors={this.state.errors}/>
                        <Grid.Row centered>
                            <Grid.Column width={5} floated='left'>
                                {this.state.order.status === Helper.nextStatus(this.state.order.status) ? null :
                                    <OrderAddButton order={this.state.order} realEstates={this.state.realEstates}
                                                    onSuccess={this.onSuccessSave.bind(this)}
                                                    onError={(errors: Map<string, string>) => {
                                                        this.setState({errors: errors})
                                                    }}
                                    />}
                            </Grid.Column>
                            <Grid.Column width={5}>
                                <Button className={"cancel-bttn"} content='Abbrechen' icon='cancel' labelPosition='left'
                                        onClick={()=>{
                                            if(this.state.initialState !== this.state.order){
                                                this.setState({showUnsavedChangesModal:true});
                                            }else {
                                                this.props.onCancelEdit();
                                            }
                                        }}/>
                            </Grid.Column>
                            <Grid.Column width={5} floated='right'>
                                {(this.state.order._links.self !== undefined && this.state.order.status !== "PAYMENT_RECIEVED") &&
                                    <Button className={"delete-bttn"} floated={"right"} color={"red"} content={"Löschen"} icon='trash'
                                            labelPosition='left'
                                            onClick={() => this.setState({showDeleteModal: true})}/>
                                }
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Form>
                <DeleteModal objectToDelete={"Auftrag"}
                             show={this.state.showDeleteModal}
                             onSuccess={() => {
                                 OrderService.delete(this.state.order, this.onDeleteSuccess.bind(this))
                             }}
                             onClose={() => this.setState({showDeleteModal: false})}
                />
                <UnsavedChangesModal name={"Auftrag"}
                                     show={this.state.showUnsavedChangesModal}
                                     onSuccess={this.props.onCancelEdit}
                                     onClose={() => this.setState({showUnsavedChangesModal: false})}
                />
            </Segment>
        );
    }

    private onDeleteSuccess() {
        this.setState({showDeleteModal: false});
        this.props.onDelete();
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

    private updateStatus(event: React.SyntheticEvent<HTMLElement>, data: DropdownProps) {
        const newOrder = Object.assign(this.state.order, {status: data.value});
        this.setState(Object.assign(this.state, {order: newOrder}))
    }

    private updateOrderServies(orderServices: OrderItem[]) {
        this.setState(Object.assign(this.state, {order: Object.assign(this.state.order, {services: orderServices})}))
    }

    private getCurrentTechnician() {
        return this.state.technicians.find((technician: Employee) => technician._links.self!.href === this.state.order.technician);
    }

    private onSuccessSave(order: Order) {
        order.technician = this.state.order.technician;
        order.realEstate = this.state.order.realEstate;
        this.setState({order: order, initialState: order});
    }

    public onSuccessGetOrder(order: Order) {
        this.setState(Object.assign(this.state, {order: order}));
        if (this.state.order._links.realEstate !== undefined) RealEstateService.fetchCurrentRealEstate(this.state.order._links.realEstate, (realEstate) => {
            this.handleOrderChange('realEstate', realEstate._links.self!.href)
        });
        if (this.state.order._links.technician !== undefined) {
            EmployeeService.fetchCurrentTechnician(this.state.order._links.technician, (emp) => this.handleOrderChange('technician', emp._links.self!.href));
        }
    }
}

