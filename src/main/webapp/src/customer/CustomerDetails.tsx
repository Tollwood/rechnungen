import * as React from "react";
import {ChangeEvent} from "react";
import {Form, Grid, Segment} from "semantic-ui-react";
import Customer from "./Customer";
import AddressInput from "../common/AddressInput";
import NameValue from "../common/NameValue";

interface Props {
    customer: Customer
    onChange: (name: string, value: any) => void
    errors: Map<string, string>
    readonly :boolean
}

export default function CustomerDetails(props: Props) {


    return <Segment>
        <Grid>
            <Grid.Row>
                <Grid.Column width={4} textAlign={"left"}>
                    <Form.Field>
                        <label>Anrede</label>
                        <Form.Input id="salutation"
                                    disabled={props.readonly}
                                    fluid
                                    placeholder='Anrede'
                                    value={props.customer.salutation}
                                    name='salutation'
                                    onChange={onChange}
                                    error={props.errors.get('salutation') ? {content: props.errors.get('salutation')} : null}
                        />
                    </Form.Field>
                </Grid.Column>
                <Grid.Column width={6} textAlign={"left"}>
                    <Form.Field>
                        <label>Vorname</label>
                        <Form.Input id="firstName"
                                    disabled={props.readonly}
                                    fluid
                                    placeholder='Vorname'
                                    value={props.customer.firstName}
                                    name='firstName'
                                    onChange={onChange}
                                    error={props.errors.get('firstName') ? {content: props.errors.get('firstName')} : null}
                        />
                    </Form.Field>
                </Grid.Column>
                <Grid.Column width={6} textAlign={"left"}>
                    <Form.Field>
                        <label>Nachname</label>
                        <Form.Input id="lastName"
                                    disabled={props.readonly}
                                    fluid
                                    placeholder='Nachname'
                                    value={props.customer.lastName}
                                    name='lastName'
                                    onChange={onChange}
                                    error={props.errors.get('lastName') ? {content: props.errors.get('lastName')} : null}
                        />
                    </Form.Field>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column textAlign={"left"}>
                    <label>Telefon</label>
                    <Form.Input id="phoneNumber"
                                disabled={props.readonly}
                                fluid
                                placeholder='Telefon'
                                value={props.customer.phoneNumber}
                                name='phoneNumber'
                                onChange={onChange}
                                error={props.errors.get('phoneNumber') ? {content: props.errors.get('phoneNumber')} : null}
                    />
                </Grid.Column>
            </Grid.Row>
            <AddressInput readonly={props.readonly} address={props.customer.address} handleAddressChange={handleAddressChange} errors={props.errors}/>
        </Grid>
    </Segment>;


    function onChange(event: ChangeEvent<HTMLInputElement>) {
        let newCustomer = { ...props.customer, [event.target.name]: event.target.value};
        props.onChange("customer", newCustomer);
    }

    function handleAddressChange(nameValue: NameValue) {
        let customerAddress = {...props.customer.address, [nameValue.name]: nameValue.value};
        let newCustomer = { ...props.customer, address: customerAddress};
        props.onChange("customer", newCustomer);
        // setErrors(ErrorMapper.removeError(errors, "address." + nameValue.name))
    }

}