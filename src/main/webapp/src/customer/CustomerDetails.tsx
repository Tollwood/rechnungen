import * as React from "react";
import {ChangeEvent} from "react";
import {DropdownProps, Form, Grid, Icon, Segment} from "semantic-ui-react";
import Customer from "./Customer";
import NameValue from "../common/NameValue";

interface Props {
    customer: Customer
    onChange: (name: string, value: any) => void
    errors: Map<string, string>
    readonly: boolean
}

export default function CustomerDetails(props: Props) {


    const salutations = [{key: 'Familie', text: "Familie", value: 'Familie'},
        {key: 'Herr', text: "Herr", value: 'Herr'},
        {key: 'Frau', text: "Frau", value: 'Frau'}];

    function onSalutationChange(event: React.SyntheticEvent<HTMLElement>, data: DropdownProps) {
        let newCustomer = {...props.customer, [data.name]: data.value};
        props.onChange("customer", newCustomer);
    }

    function onChange(event: ChangeEvent<HTMLInputElement>) {
        let newCustomer = {...props.customer, [event.target.name]: event.target.value};
        props.onChange("customer", newCustomer);
    }

    function handleAddressChange(nameValue: NameValue) {
        let customerAddress = {...props.customer.address, [nameValue.name]: nameValue.value};
        let newCustomer = {...props.customer, address: customerAddress};
        props.onChange("customer", newCustomer);
        // setErrors(ErrorMapper.removeError(errors, "address." + nameValue.name))
    }


    function renderEditable() {
        return <Segment>
            <Grid>
                <Grid.Row>
                    <Grid.Column computer={4} tablet={4} mobile={16} textAlign={"left"}>
                        <Form.Field>
                            <label>Anrede</label>
                            <Form.Dropdown id="salutation"
                                           name="salutation"
                                           disabled={props.readonly}
                                           fluid
                                           selection
                                           options={salutations}
                                           value={props.customer.salutation === undefined ? "Familie" : props.customer.salutation}
                                           onChange={onSalutationChange}
                                           error={props.errors.get('salutation') ? {content: props.errors.get('salutation')} : null}
                            />
                        </Form.Field>
                    </Grid.Column>
                    {(props.readonly && props.customer.firstName !== undefined || !props.readonly) &&
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
                    </Grid.Column>}
                    <Grid.Column computer={6} tablet={6} mobile={16} textAlign={"left"}>
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
                    <Grid.Column computer={16} tablet={16} mobile={16} textAlign={"left"}>
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
                <Grid.Row>
                    <Grid.Column computer={16} tablet={16} mobile={16} textAlign={"left"}>
                        <Icon name="protect"/><label>Personenbezogene Daten werden ausschließlich zur Bearbeitung Ihrer Bestellung erfasst</label>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Segment>;
    }

    function renderReadOnly() {
        return <Segment>
            <Grid>
                <Grid.Row>
                    <Grid.Column width={16} textAlign={"left"}>
                        <div><label>{props.customer.salutation} {props.customer.firstName !== undefined && props.customer.firstName} {props.customer.lastName}</label></div>
                        {(props.customer.address.street !== "" || props.customer.address.houseNumber !== "") && <div><label>{props.customer.address.street} {props.customer.address.houseNumber}</label></div>}

                        {(props.customer.address.zipCode !== "" || props.customer.address.city !== "") && <div><label>{props.customer.address.zipCode} {props.customer.address.city}</label></div>}
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={16}>
                        <label>Telefon: {props.customer.phoneNumber}</label>
                    </Grid.Column>
                </Grid.Row>

            </Grid>
        </Segment>;
    }

    return props.readonly ? renderReadOnly() : renderEditable()

}