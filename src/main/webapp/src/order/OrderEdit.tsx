import * as React from "react";
import {Button, Checkbox, Dropdown, DropdownItemProps, DropdownProps, Form, Grid} from 'semantic-ui-react'
import API from "../API";
import Order from "./Order";
import Employee from "../employees/Employee";
import OrderService from "./OrderService";
import ListOrderServices from "./ListOrderServices";
import CUDButtons from "../common/CUDButtons";
import Billpdf from "../billing/Billpdf";
import RealEstate from "../realestate/RealEstate";
import {PDFViewer} from "@react-pdf/renderer";
import Service from "./Service";
import BillService from "../billing/BillService";
import OrderBaseProperties from "./OrderBaseProperties";
import OrderAppointments from "./OrderAppointments";
import OrderStatusSteps from "./OrderStatusSteps";
import {OrderStatus} from "./OrderStatus";
import Helper from "../common/Helper";

interface OrderEditProps {
    onSave: () => void;
    onCancelEdit: () => void;
    onDelete: () => void;
    order?: Order;
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
        this.setState({shouldValidate:true});
        if(!this.isValid()){
            return;
        }
        if (this.state.order._links.self === undefined) {
            API.post("/order", this.state.order);
        } else {
            API.patch(this.state.order._links.self!.href, this.state.order);
        }
    }

    render() {
        return (
            <Form autoComplete={"off"}>
                <Grid>
                    <Grid.Row textAlign={"center"}>
                        <Grid.Column width={16}>
                            <OrderStatusSteps status={this.state.order.status} statusChanged={(status: OrderStatus)=>this.handleOrderChange('status', status)}/>
                        </Grid.Column>
                    </Grid.Row>
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
                                       order={this.state.order}
                                       readonly={!(this.state.order.status === 'ORDER_EDIT' || this.state.order.status === 'ORDER_EXECUTE')}
                    />
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

                    {this.state.order.status === 'ORDER_EXECUTE' ?
                        <Grid.Row>
                            <Grid.Column computer={8} tablet={8} mobile={16}>
                                <Checkbox toggle
                                          name={"includeKmFee"}
                                          label={"Km Pauschale anwenden"}
                                          checked={this.state.order.includeKmFee}
                                          onChange={()=>this.handleOrderChange('includeKmFee', !this.state.order.includeKmFee)}/>
                            </Grid.Column>
                        </Grid.Row> : null}
                    {this.shouldRenderPdf() ? this.renderPdf() : null}

                    <Grid.Row centered>
                        <Grid.Column width={5} floated='left'>
                            {this.state.order.status === Helper.nextStatus(this.state.order.status)? null:<Button.Group primary>
                                <Button content='Speichern' />

                                <Dropdown
                                    className='button icon'
                                    floating
                                    value={''}
                                    onChange={this.saveAndContinue.bind(this)}
                                    options={this.getSaveOptions()}
                                    trigger={<React.Fragment />}
                                />

                            </Button.Group>}
                        </Grid.Column>
                        <Grid.Column width={5}>
                            <Button content='Abbrechen' icon='cancel' labelPosition='left' onClick={this.props.onCancelEdit}/>
                        </Grid.Column>
                        <Grid.Column width={5} floated='right'>
                            {this.state.order._links.self !== undefined ?
                                <Button floated={"right"} color={"red"} content={"Löschen"} icon='trash' labelPosition='left'
                                        onClick={this.props.onDelete}/> : null
                            }
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Form>
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


    private updateStatus(event: React.SyntheticEvent<HTMLElement>, data: DropdownProps) {
        const newOrder = Object.assign(this.state.order, {status: data.value});
        this.setState(Object.assign(this.state, {order: newOrder}))
    }

    private updateOrderServies(orderServices: OrderService[]) {
        this.setState(Object.assign(this.state, {order: Object.assign(this.state.order, {services: orderServices})}))
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

    private renderPdf() {
        return <Grid.Row>
            <Grid.Column width={16}>
                <PDFViewer width={"100%"} height={"800px"}>
                    <Billpdf
                        bill={BillService.createNewBill(this.state.order, this.state.services, this.getCurrentRealEstate(), this.getCurrentTechnician())}/>
                </PDFViewer>
            </Grid.Column>
        </Grid.Row>;
    }

    private shouldRenderPdf() {
        return this.state.order.status === 'ORDER_BILL';
    }


    private isValid() {
        return this.isSet(this.state.order.realEstate) && this.isSet(this.state.order.technician)
            && (this.state.validUserId  || (this.props.order !== undefined && this.props.order._links.self !== undefined));
    }

    private isSet(value?: string ) {
        return value !== undefined && value.length > 0;
    }

    private saveAndContinue(event: React.SyntheticEvent<HTMLElement>, data: DropdownProps) {
        this.handleOrderChange('status', Helper.nextStatus(this.state.order.status));
        this.save();
    }

    private getSaveOptions() {
        let icon =  Helper.getStatusIcon(Helper.nextStatus(this.state.order.status));
        return  [{key:'Speicher',value:'Speichern', text:'Speichern und weiter', icon:icon}];
    }
}

