import * as React from "react";
import {DropdownItemProps, DropdownProps, Form, Grid, Icon, Step} from 'semantic-ui-react'
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
                                         canSave={this.state.canSave}
                                         handleCanSave={this.setCanSave.bind(this)}
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
                    <Grid.Row>
                        <Grid.Column computer={6} tablet={6} mobile={8}>
                            <Form.Field>
                                <label>Status </label>
                                <Form.Dropdown id="status"
                                               selection
                                               options={this.getOrderStatusOptions()}
                                               value={this.state.order.status}
                                               onChange={this.updateStatus.bind(this)}
                                />
                            </Form.Field>
                        </Grid.Column>
                    </Grid.Row>
                    {this.shouldRenderPdf() ? this.renderPdf() : null}
                    <CUDButtons
                        canSave={this.state.canSave || (this.props.order !== undefined && this.props.order._links.self !== undefined)}
                        onSave={this.save.bind(this)} onCancel={this.props.onCancelEdit}
                        onDelete={this.delete.bind(this)}
                        canDelete={this.state.order._links.self !== undefined}/>
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


}

