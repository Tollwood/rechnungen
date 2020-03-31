import * as React from "react";
import {ChangeEvent} from "react";
import {DropdownProps, Form, Grid, Segment} from "semantic-ui-react";
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


    const salutations  = [{key: 'Familie', text: "Familie", value: 'Familie'},
        {key: 'Herr', text: "Herr", value: 'Herr'},
        {key: 'Frau', text: "Frau", value: 'Frau'}];

    return <Segment>
        <Grid>
            <Grid.Row>
                <Grid.Column computer={4} tablet={4} mobile={16}  textAlign={"left"}>
                    <Form.Field>
                        <label>Anrede</label>
                        <Form.Dropdown id="salutation"
                                       disabled={props.readonly}
                                       fluid
                                       selection
                                       options={salutations}
                                       value={props.customer.salutation == null ? "Familie": props.customer.salutation}
                                       onChange={onSalutationChange}
                                       error={props.errors.get('salutation') ? {content: props.errors.get('salutation')} : null}
                        />
                    </Form.Field>
                </Grid.Column>
                <Grid.Column computer={6} tablet={6} mobile={16} textAlign={"left"}>
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
                <Grid.Column computer={6} tablet={6} mobile={16}  textAlign={"left"}>
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
                <Grid.Column computer={16} tablet={16} mobile={16}  textAlign={"left"}>
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

    function onSalutationChange(event: ChangeEvent<DropdownProps>) {
        let newCustomer = { ...props.customer, [event.target.name]: event.target.value};
        props.onChange("customer", newCustomer);
    }

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