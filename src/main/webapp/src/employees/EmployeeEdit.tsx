import Employee from "./Employee";
import * as React from "react";
import {ChangeEvent} from "react";
import {Form} from 'semantic-ui-react'
import API from "../API";
import Grid from "semantic-ui-react/dist/commonjs/collections/Grid";
import CUDButtons from "../common/CUDButtons";
import AddressInput from "../common/AddressInput";
import BankInput from "../common/BankInput";

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
            <div className={"employee-edit"}>
                <Form>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column width={3}>
                                <Form.Field>
                                    <label>Monteur</label>
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
                            <Grid.Column width={8}>
                                <Form.Field>
                                    <label>Email</label>
                                    <input id="email"
                                           placeholder='Email'
                                           value={this.state.employee.email}
                                           name='email'
                                           onChange={this.handleEmployeeChange.bind(this)}/>
                                </Form.Field>
                            </Grid.Column>
                            <Grid.Column width={8}>
                                <Form.Field>
                                    <label>Telefon</label>
                                    <input id="phone"
                                           placeholder='Telefon'
                                           value={this.state.employee.phone}
                                           name='phone'
                                           onChange={this.handleEmployeeChange.bind(this)}/>
                                </Form.Field>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column width={8}>
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
                            <Grid.Column>
                                <h4>Adresse</h4>
                            </Grid.Column>
                        </Grid.Row>
                        <AddressInput address={this.state.employee.address} handleAddressChange={this.handleAddressChange.bind(this)}/>
                        <Grid.Row>
                            <Grid.Column>
                                <h4>Bankdaten</h4>
                            </Grid.Column>
                        </Grid.Row>
                        <BankInput bankDetails={this.state.employee.bankDetails} handleBankDetailsChange={this.handleBankDetailsChange.bind(this)}/>

                        <CUDButtons onSave={this.save.bind(this)} onCancel={this.props.onCancelEdit} onDelete={this.delete.bind(this)} canDelete={this.state.employee._links.self !== undefined}/>
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

    handleBankDetailsChange(event: ChangeEvent<HTMLInputElement>) {
        const newBankDetails = Object.assign(this.state.employee.bankDetails, {[event.target.name]: event.target.value});
        this.setState({employee: Object.assign(this.state.employee, {bankDetails: newBankDetails})});
    }

    save() {
        if (this.state.employee._links.self === undefined) {
            API.post("/api/employee", this.state.employee)
                .then(() => this.props.onSave());
        } else {
            API.patch(this.state.employee._links.self.href, this.state.employee)
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