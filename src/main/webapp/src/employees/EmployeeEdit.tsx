import Employee from "./Employee";
import * as React from "react";
import {ChangeEvent, useState} from "react";
import {Form} from 'semantic-ui-react'
import Grid from "semantic-ui-react/dist/commonjs/collections/Grid";
import CUDButtons from "../common/CUDButtons";
import AddressInput from "../common/AddressInput";
import BankInput from "../common/BankInput";
import ErrorMapper from "../ErrorMapper";
import NameValue from "../common/NameValue";
import EmployeeService from "./EmployeeService";

interface Props {
    onSave: () => void;
    onCancelEdit: () => void;
    employee: Employee;
}

export default function EmployeeEdit(props: Props) {

    const [initialEmployee, setInitialEmploye] = useState<Employee>(props.employee);
    const [employee, setEmploye] = useState<Employee>(props.employee);
    const [errors, setErrors] = useState(new Map<string, string>());

    function onChange(event: ChangeEvent<HTMLInputElement>) {
        setEmploye({...employee, [event.target.name]: event.target.value});
        setErrors(ErrorMapper.removeError(errors, event.target.name));
    }

    function handleAddressChange(nameValue: NameValue) {
        setEmploye({...employee, address: {...employee.address, [nameValue.name]: nameValue.value}});
        setErrors(ErrorMapper.removeError(errors, "address." + nameValue.name))
    }

    function handleBankDetailsChange(event: ChangeEvent<HTMLInputElement>) {
        setEmploye({...employee, bankDetails: {...employee.bankDetails, [event.target.name]: event.target.value}});
        setErrors(ErrorMapper.removeError(errors, "address." + event.target.name));
    }

    return (
        <div className={"employee-edit"}>
            <Form>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={3}>
                            <Form.Field>
                                <label>Monteur</label>
                                <Form.Input id="technicianId"
                                            placeholder='Monteur'
                                            value={employee.technicianId}
                                            name='technicianId'
                                            onChange={onChange}
                                            error={errors.get('technicianId') ? {content: errors.get('technicianId')} : null}
                                />
                            </Form.Field>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width={8}>
                            <Form.Field>
                                <label>Vorname</label>
                                <Form.Input id="firstName"
                                            placeholder='Vorname'
                                            value={employee.firstName}
                                            name='firstName'
                                            onChange={onChange}
                                            error={errors.get('firstName') ? {content: errors.get('firstName')} : null}

                                />
                            </Form.Field>
                        </Grid.Column>
                        <Grid.Column width={8}>
                            <Form.Field>
                                <label>Nachname</label>
                                <Form.Input id="lastName"
                                            placeholder='Nachname'
                                            value={employee.lastName}
                                            name='lastName'
                                            onChange={onChange}
                                            error={errors.get('lastName') ? {content: errors.get('lastName')} : null}
                                />
                            </Form.Field>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width={8}>
                            <Form.Field>
                                <label>Email</label>
                                <Form.Input id="email"
                                            placeholder='Email'
                                            value={employee.email}
                                            name='email'
                                            onChange={onChange}
                                            error={errors.get('email') ? {content: errors.get('email')} : null}
                                />
                            </Form.Field>
                        </Grid.Column>
                        <Grid.Column width={8}>
                            <Form.Field>
                                <label>Telefon</label>
                                <Form.Input id="phone"
                                            placeholder='Telefon'
                                            value={employee.phone}
                                            name='phone'
                                            onChange={onChange}
                                            error={errors.get('phone') ? {content: errors.get('phone')} : null}
                                />
                            </Form.Field>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width={8}>
                            <Form.Field>
                                <label>Steuernummer</label>
                                <Form.Input id="taxtIdent"
                                            placeholder='Steuernummer'
                                            value={employee.taxIdent}
                                            name='taxIdent'
                                            onChange={onChange}
                                            error={errors.get('taxIdent') ? {content: errors.get('taxIdent')} : null}
                                />

                            </Form.Field>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <h4>Adresse</h4>
                        </Grid.Column>
                    </Grid.Row>
                    <AddressInput address={employee.address} handleAddressChange={handleAddressChange}
                                  errors={ErrorMapper.childError(errors)}/>
                    <Grid.Row>
                        <Grid.Column>
                            <h4>Bankdaten</h4>
                        </Grid.Column>
                    </Grid.Row>
                    <BankInput bankDetails={employee.bankDetails}
                               handleBankDetailsChange={handleBankDetailsChange}
                               errors={ErrorMapper.childError(errors)}/>

                    <CUDButtons onSave={EmployeeService.save}
                                name={"Mitarbeiter"}
                                object={employee}
                                initialState={initialEmployee}
                                onSuccess={props.onSave}
                                onError={setErrors}
                                onCancel={props.onCancelEdit}
                                onDelete={EmployeeService.delete}
                                canDelete={employee._links.self !== undefined}/>
                </Grid>
            </Form>
        </div>
    );
}