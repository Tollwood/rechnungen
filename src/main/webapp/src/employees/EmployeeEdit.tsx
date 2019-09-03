import Employee from "./Employee";
import * as React from "react";
import {Button, Form, FormProps, Icon} from 'semantic-ui-react'
import {ChangeEvent} from "react";
import API from "../API";

interface EmployeeEditProps {
    onSave: ()=>void;
    onCancelEdit: ()=>void;
    employee: Employee;
}

interface EmployeeEditState {
    employee:Employee
}

export default class EmployeeEdit extends React.Component<EmployeeEditProps,EmployeeEditState> {

    constructor(props: EmployeeEditProps) {
        super(props);
        this.state = {employee: props.employee}
    }

    componentDidUpdate(prevProps: Readonly<EmployeeEditProps>, prevState: Readonly<EmployeeEditState>, snapshot?: any): void {
        if(this.props.employee !== prevProps.employee){
            this.setState({employee: this.props.employee});
        }
    }

    render () {
            return (
                <div>
                    {this.state.employee._links === undefined? <h1>Neuer Mitarbeiter</h1>: <h1>Mitarbeiter Bearbeiten</h1> }
                    <Form onSubmit={this.save.bind(this)}>
                        <Form.Field>
                            <label>Monteuer</label>
                            <input id="technicianId"
                                   placeholder='Monteur'
                                   value={this.state.employee.technicianId}
                                   name='technicianId'
                                   onChange={this.handleEmployeeChange.bind(this)}
                            />
                        </Form.Field>
                        <Form.Field>
                            <label>Vorname</label>
                            <input id="firstName"
                                   placeholder='Vorname'
                                   value={this.state.employee.firstName}
                                   name='firstName'
                                   onChange={this.handleEmployeeChange.bind(this)}
                            />
                        </Form.Field>
                        <Form.Field>
                            <label>Nachname</label>
                            <input id="lastName"
                                   placeholder='Nachname'
                                   value={this.state.employee.lastName}
                                   name='lastName'
                                   onChange={this.handleEmployeeChange.bind(this)}/>
                        </Form.Field>
                        <Form.Field>
                            <label>Steuernummer</label>
                            <input id="taxtIdent"
                                   placeholder='Steuernummer'
                                   value={this.state.employee.taxIdent}
                                   name='taxIdent'
                                   onChange={this.handleEmployeeChange.bind(this)}/>
                        </Form.Field>

                        <h3>Adresse:</h3>
                        <Form.Field>
                            <label>Straße</label>
                            <input id="street"
                                   placeholder='Straße'
                                   value={this.state.employee.address.street}
                                   name='street'
                                   onChange={this.handleAddressChange.bind(this)}/>
                        </Form.Field>
                        <Form.Field>
                            <label>Hausnummer</label>
                            <input id="houseNumber"
                                   placeholder='Hausnummer'
                                   value={this.state.employee.address.houseNumber}
                                   name='houseNumber'
                                   onChange={this.handleAddressChange.bind(this)}/>
                        </Form.Field>
                        <div >
                            <Form.Field>
                                <label>PLZ</label>
                                <input id="zipCode"
                                       placeholder='PLZ'
                                       value={this.state.employee.address.zipCode}
                                       name='zipCode'
                                       onChange={this.handleAddressChange.bind(this)}/>
                            </Form.Field>
                            <Form.Field>
                                <label>Stadt</label>
                                <input id="city"
                                       placeholder='Stadt'
                                       value={this.state.employee.address.city}
                                       name='city'
                                       onChange={this.handleAddressChange.bind(this)}/>
                            </Form.Field>
                        </div>

                        <Button type='submit' primary>speichern</Button>
                        <Button onClick={this.props.onCancelEdit}>Abbrechen</Button>
                        {this.state.employee._links !== undefined?
                            <Button onClick={this.delete}><Icon name={"delete"}/></Button> : <span/> }
                    </Form>
                </div>
            );
    }

    handleEmployeeChange(event: ChangeEvent<HTMLInputElement>)
    {
        const name : string = event.target.name;
        this.setState({employee: Object.assign(this.state.employee, {[name]:event.target.value}) });
    }

    handleAddressChange(event: ChangeEvent<HTMLInputElement>)
    {
        const newAddress = Object.assign(this.state.employee.address, { [event.target.name]:event.target.value});
        this.setState({employee: Object.assign(this.state.employee, {address: newAddress})});
    }

    save(event: React.FormEvent<HTMLFormElement>, data: FormProps){
        if(this.state.employee._links === undefined){
            API.post("/employee",this.state.employee)
                .then(()=> this.props.onSave());
        }
        else {
            API.put(this.state.employee._links.self.href,this.state.employee)
                .then(()=> this.props.onSave());
        }
    }


    private delete() {
        // @ts-ignore
        API.delete(this.state.employee._links.self.href).then(() =>{});
        this.props.onCancelEdit();
    }
}