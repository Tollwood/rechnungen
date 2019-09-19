import * as React from "react";
import {ChangeEvent} from "react";
import {Button, ButtonProps, DropdownItemProps, DropdownProps, Form, Grid, Icon} from 'semantic-ui-react'
import API from "../API";
import Order from "./Order";
import Employee from "../employees/Employee";
import OrderService from "./OrderService";
import ListOrderServices from "./ListOrderServices";
import RealEstate from "../realestate/RealEstate";

interface OrderEditProps {
    onSave: ()=>void;
    onCancelEdit: ()=>void;
    order?: Order;
}

interface OrderEditState {
    order:Order;
    technicians: {key: string, value: string, text: string}[];
    selectedTechnician?: string;
    realestates: {key: string, value: string, text: string}[];
    selectedRealestate?: string;
}

export default class OrderEdit extends React.Component<OrderEditProps,OrderEditState> {

    constructor(props: OrderEditProps) {
        super(props);
        this.state = {
            order: props.order ? props.order: new Order(),
            technicians: [],
            realestates: []
        }
    }

    componentDidMount(): void {
        API.get(`/employee`)
            .then(res => res.data)
            .then((data) => this.setState(Object.assign(this.state, {
                technicians: this.mapToDropdownItems(data._embedded.employee)
            })));

        if(this.props.order && this.props.order._links.technician){
            API.get(this.props!.order!._links!.technician.href)
                .then( res => this.setState(Object.assign(this.state,{selectedTechnician: res.data._links.self.href})))
        }
        this.fetchRealEstates();
        this.fetchCurrentRealEstate();
    }

    private mapToDropdownItems(employees: Employee[]): DropdownItemProps[] {
        return employees.map((emp: Employee)=>{ return {key: emp.technicianId, value: emp._links.self!.href, text: this.getDropDownText(emp)}});
    }

    private getDropDownText(emp: Employee) {
        return emp.technicianId + " " + emp.firstName + " " + emp.lastName;
    }

    componentDidUpdate(prevProps: Readonly<OrderEditProps>, prevState: Readonly<OrderEditState>, snapshot?: any): void {
        if(this.props.order !== undefined && this.props.order !== prevProps.order){
            this.setState({order: this.props.order});
        }
    }

    save(event: React.MouseEvent<HTMLButtonElement>, data: ButtonProps){
        if(this.state.order._links.self === undefined){
            API.post("/order",this.state.order)
                .then(()=> this.props.onSave());
        }
        else {
            API.put(this.state.order._links.self!.href,this.state.order)
                .then(()=> this.props.onSave());
        }
    }

    render () {
            return (
                <div>
                    <Form>
                        <Grid >
                            <Grid.Row >
                                {this.state.order._links === undefined? <h1>Neuen Auftrag anlegen</h1>: <h1>Auftrag bearbeiten</h1> }
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column width={4}>
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
                                <Grid.Column width={4}>
                                    <Form.Field>
                                    <label >Monteuer </label>
                                    <Form.Dropdown id="technician"
                                              selection
                                              options={this.state.technicians}
                                               value={this.state.selectedTechnician}
                                              onChange={this.updateTechnician.bind(this)}
                                    />
                                    </Form.Field>
                                </Grid.Column>

                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column width={4}>
                                    <Form.Field>
                                        <label >Liegenschaft</label>
                                        <Form.Dropdown id="realestate"
                                                       selection
                                                       options={this.state.realestates}
                                                       value={this.state.selectedRealestate}
                                                       onChange={this.updateRealEstate.bind(this)}
                                        />
                                    </Form.Field>
                                </Grid.Column>
                        </Grid.Row>
                            <Grid.Row>
                                <Grid.Column width={3}>
                                    <Form.Field >
                                        <label>NE </label>
                                        <Form.Input id="utilisationUnit"
                                               placeholder='Nutzungseinheit'
                                               value={this.state.order.utilisationUnit}
                                               name='utilisationUnit'
                                               onChange={this.handleOrderChange.bind(this)}
                                        />
                                    </Form.Field>
                                </Grid.Column>
                                <Grid.Column width={4}>
                                    <Form.Field >
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
                                <Grid.Column width={3} >
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
                                <Grid.Column width={3}>
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
                            <Grid.Row >
                                <Grid.Column width={8}>
                                    <h2>Dienstleistungen</h2>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column width={14}>
                                    <ListOrderServices orderServices={this.state.order.services? this.state.order.services: []} onOrderServicesChanged={this.updateOrderServies.bind(this)}/>
                                </Grid.Column>
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column width={2}>
                                    <Form.Button primary onClick={this.save.bind(this)}>speichern</Form.Button>
                                </Grid.Column>
                                <Grid.Column width={2}>
                                    <Button onClick={this.props.onCancelEdit}>Abbrechen</Button>
                                </Grid.Column>
                                <Grid.Column width={2}>
                                    {this.state.order._links === undefined? null :
                                        <Button onClick={this.delete.bind(this)}><Icon name={"delete"}/></Button> }
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>

                    </Form>
                </div>
            );
    }

    handleOrderChange(event: ChangeEvent<HTMLInputElement>)
    {
        const name : string = event.target.name;
        this.setState({order: Object.assign(this.state.order, {[name]:event.target.value}) });
    }


    private delete() {
        // @ts-ignore
        API.delete(this.state.order._links.self.href).then(() =>{});
        this.props.onCancelEdit();
    }

    private nullOrEmpty(value?: string) {
        return value === undefined || value.length === 0;
    }

    private updateTechnician(event: React.SyntheticEvent<HTMLElement>, data: DropdownProps) {
        const newOrder = Object.assign(this.state.order, {technician: data.value});
        this.setState(Object.assign(this.state, {order: newOrder, selectedTechnician: data.value}))
    }


    private fetchCurrentRealEstate() {
        if (this.props.order && this.props.order._links.realEstate) {
            API.get(this.props!.order!._links!.realEstate.href)
                .then(res => this.setState(Object.assign(this.state, {selectedRealestate: res.data._links.self.href})))
        }
    }

    private fetchRealEstates() {
        API.get(`/realestate`)
            .then(res => res.data)
            .then((data) => this.setState(Object.assign(this.state, {
                realestates: this.mapRealestateToDropdownItems(data._embedded.realestate)
            })));
    }

    private mapRealestateToDropdownItems(realEstates: RealEstate[]): DropdownItemProps[] {
        return realEstates.map((realEstate: RealEstate)=>{ return {key: realEstate.name, value: realEstate._links.self!.href, text: realEstate.name}});
    }

    private updateRealEstate(event: React.SyntheticEvent<HTMLElement>, data: DropdownProps) {
        const newOrder = Object.assign(this.state.order, {realEstate: data.value});
        this.setState(Object.assign(this.state, {order: newOrder, selectedRealestate: data.value}))
    }

    private updateOrderServies(orderServices: OrderService[]) {
        this.setState(Object.assign(this.state, {order: Object.assign(this.state.order,{ services: orderServices} )}))
    }
}