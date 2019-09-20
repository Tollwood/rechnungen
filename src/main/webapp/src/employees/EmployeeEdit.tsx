import Employee from "./Employee";
import * as React from "react";
import {ChangeEvent} from "react";
import {Button, Form, FormProps, Icon} from 'semantic-ui-react'
import API from "../API";
import Grid from "semantic-ui-react/dist/commonjs/collections/Grid";

interface EmployeeEditProps {
    onSave: () => void;
    onCancelEdit: () => void;
    employee: Employee;
}

interface EmployeeEditState {
    employee: Employee
}

export default class EmployeeEdit extends React.Component<EmployeeEditProps, EmployeeEditState> {

    constructor(props: EmployeeEditProps) {
        super(props);
        this.state = {employee: props.employee}
    }

    componentDidUpdate(prevProps: Readonly<EmployeeEditProps>, prevState: Readonly<EmployeeEditState>, snapshot?: any): void {
        if (this.props.employee !== prevProps.employee) {
            this.setState({employee: this.props.employee});
        }
    }

    render() {
        return (
            <div>

                <Form>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column textAlign={"center"}>
                                {this.state.employee._links === undefined ? <h1>Neuer Mitarbeiter</h1> : <h1>Mitarbeiter Bearbeiten</h1>}
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column>
                                <Form.Field>
                                    <label>Monteuer</label>
                                    <input id="technicianId"
                                           placeholder='Monteur'
                                           value={this.state.employee.technicianId}
                                           name='technicianId'
                                           onChange={this.handleEmployeeChange.bind(this)}
                                    />
                                </Form.Field>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column width={8}>
                                <Form.Field>
                                    <label>Vorname</label>
                                    <input id="firstName"
                                           placeholder='Vorname'
                                           value={this.state.employee.firstName}
                                           name='firstName'
                                           onChange={this.handleEmployeeChange.bind(this)}
                                    />
                                </Form.Field>
                            </Grid.Column>
                            <Grid.Column width={8}>
                                <Form.Field>
                                    <label>Nachname</label>
                                    <input id="lastName"
                                           placeholder='Nachname'
                                           value={this.state.employee.lastName}
                                           name='lastName'
                                           onChange={this.handleEmployeeChange.bind(this)}/>
                                </Form.Field>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column>
                                <Form.Field>
                                    <label>Steuernummer</label>
                                    <input id="taxtIdent"
                                           placeholder='Steuernummer'
                                           value={this.state.employee.taxIdent}
                                           name='taxIdent'
                                           onChange={this.handleEmployeeChange.bind(this)}/>
                                </Form.Field>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column width={12}>
                                <Form.Field>
                                    <label>Straße</label>
                                    <input id="street"
                                           placeholder='Straße'
                                           value={this.state.employee.address.street}
                                           name='street'
                                           onChange={this.handleAddressChange.bind(this)}/>
                                </Form.Field>
                            </Grid.Column>
                            <Grid.Column width={4}>
                                <Form.Field>
                                    <label>Hausnummer</label>
                                    <input id="houseNumber"
                                           placeholder='Hausnummer'
                                           value={this.state.employee.address.houseNumber}
                                           name='houseNumber'
                                           onChange={this.handleAddressChange.bind(this)}/>
                                </Form.Field>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column width={4}>
                                <Form.Field>
                                    <label>PLZ</label>
                                    <input id="zipCode"
                                           placeholder='PLZ'
                                           value={this.state.employee.address.zipCode}
                                           name='zipCode'
                                           onChange={this.handleAddressChange.bind(this)}/>
                                </Form.Field>
                            </Grid.Column>
                            <Grid.Column width={12}>
                                <Form.Field>
                                    <label>Stadt</label>
                                    <input id="city"
                                           placeholder='Stadt'
                                           value={this.state.employee.address.city}
                                           name='city'
                                           onChange={this.handleAddressChange.bind(this)}/>
                                </Form.Field>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row centered>
                            <Grid.Column width={5} floated='left'>
                                <Form.Button primary content='Speichern' icon='save' labelPosition='left' onClick={this.save.bind(this)}/>
                            </Grid.Column>
                            <Grid.Column width={5}>
                                <Button content='Abbrechen' icon='cancel' labelPosition='left' onClick={this.props.onCancelEdit}/>
                            </Grid.Column>
                            <Grid.Column width={5} floated='right'>
                                {this.state.employee._links.self === undefined? null :
                                    <Button floated={"right"} color={"red"} content={"Löschen"}  icon='trash'  labelPosition='left'onClick={this.delete.bind(this)}/>
                                }
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Form>
            </div>
        );
    }

    handleEmployeeChange(event: ChangeEvent<HTMLInputElement>) {
        const name: string = event.target.name;
        this.setState({employee: Object.assign(this.state.employee, {[name]: event.target.value})});
    }

    handleAddressChange(event: ChangeEvent<HTMLInputElement>) {
        const newAddress = Object.assign(this.state.employee.address, {[event.target.name]: event.target.value});
        this.setState({employee: Object.assign(this.state.employee, {address: newAddress})});
    }

    save(event: React.FormEvent<HTMLButtonElement>, data: FormProps) {
        if (this.state.employee._links.self === undefined) {
            API.post("/employee", this.state.employee)
                .then(() => this.props.onSave());
        } else {
            API.put(this.state.employee._links.self.href, this.state.employee)
                .then(() => this.props.onSave());
        }
    }


    private delete() {
        // @ts-ignore
        API.delete(this.state.employee._links.self.href).then(() => {
        });
        this.props.onCancelEdit();
    }
}