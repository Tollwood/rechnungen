import * as React from "react";
import {ChangeEvent} from "react";
import {Button, Dropdown, DropdownItemProps, DropdownProps, Form, FormProps, Grid, Icon} from 'semantic-ui-react'
import API from "../API";
import {Order} from "./Order";
import Employee from "../employees/Employee";

interface OrderEditProps {
    onSave: ()=>void;
    onCancelEdit: ()=>void;
    order?: Order;
}

interface OrderEditState {
    order:Order;
    technicians: {key: string, value: string, text: string}[];
}

export default class OrderEdit extends React.Component<OrderEditProps,OrderEditState> {

    constructor(props: OrderEditProps) {
        super(props);
        this.state = {
            order: props.order ? props.order: new Order(),
            technicians: []
        }
    }

    componentDidMount(): void {
        API.get(`/employee`)
            .then(res => res.data)
            .then((data) => this.setState(Object.assign(this.state, { technicians: this.mapToDropdownItems(data._embedded.employee)})));
    }

    private mapToDropdownItems(employees: Employee[]): DropdownItemProps[] {
        return employees.map((emp: Employee)=>{ return {key: emp.technicianId, value: emp._links!.self.href, text: this.getDropDownText(emp)}});
    }

    private getDropDownText(emp: Employee) {
        return emp.technicianId + " " + emp.firstName + " " + emp.lastName;
    }

    componentDidUpdate(prevProps: Readonly<OrderEditProps>, prevState: Readonly<OrderEditState>, snapshot?: any): void {
        if(this.props.order !== undefined && this.props.order !== prevProps.order){
            this.setState({order: this.props.order});
        }
    }

    save(event: React.FormEvent<HTMLFormElement>, data: FormProps){
        if(this.state.order._links === undefined){
            API.post("/order",this.state.order)
                .then(()=> this.props.onSave());
        }
        else {
            API.put(this.state.order._links.self.href,this.state.order)
                .then(()=> this.props.onSave());
        }
    }

    render () {
            return (
                <div>
                    <Form onSubmit={this.save.bind(this)}>
                        <Grid >
                            <Grid.Row >
                                {this.state.order._links === undefined? <h1>Neuen Auftrag anlegen</h1>: <h1>Auftrag bearbeiten</h1> }
                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column width={4}>
                                    <Form.Field>
                                        <label>Auftrags-ID</label>
                                        <input id="orderId"
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
                                    <Dropdown id="technician"
                                              selection
                                              options={this.state.technicians}
                                              onChange={this.updateTechnician.bind(this)}
                                    />
                                    </Form.Field>
                                </Grid.Column>

                            </Grid.Row>
                            <Grid.Row>
                                <Grid.Column width={3}>
                                    <Form.Field >
                                        <label>NE </label>
                                        <input id="utilisationUnit"
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
                                        <input id="name"
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
                                        <input id="location"
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
                                        <input
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
                                <Grid.Column width={2}>
                                    <Button type='submit' primary>speichern</Button>
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
        this.setState(Object.assign(this.state, {order: newOrder}))
    }
}