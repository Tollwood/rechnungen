import * as React from "react";
import {ChangeEvent, useState} from "react";
import {Form, Image, Segment} from 'semantic-ui-react'
import Grid from "semantic-ui-react/dist/commonjs/collections/Grid";
import Company from "./employees/Company";
import ErrorMapper from "./ErrorMapper";
import ImageUpload from "./services/ImageUpload";
import NameValue from "./common/NameValue";
import AddressInput from "./common/AddressInput";
import CUDButtons from "./common/CUDButtons";
import CompanyService from "./order/CompanyService";

interface Props {
    company: Company;
    onChange: (company: Company) => void
    onClose: () => void
}

export default function CompanyEdit(props: Props) {

    const [company, setCompany] = useState<Company>(props.company);
    const [initialCompany] = useState<Company>(props.company);
    const [errors, setErrors] = useState(new Map<string, string>());
    const [selectedCompanyLogo, setSelectedCompanyLogo] = useState<File>();
    const [selectedThankYouImage, setSelectedThankYouImage] = useState<File>();

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        setCompany({...company, [event.target.name]: event.target.value});
        setErrors(ErrorMapper.removeError(errors, event.target.name));
    }

    function handleAddressChange(nameValue: NameValue) {
        setCompany({...company, address: {...company.address, [nameValue.name]: nameValue.value}});
        setErrors(ErrorMapper.removeError(errors, "address." + nameValue.name))
    }

    return (
        <Segment>
            <Form>
                <Grid>
                    <Grid.Row>
                        <Grid.Column computer={6} tablet={6} mobile={16}>
                            <Form.Field>
                                <label>Firmenname</label>
                                <Form.Input
                                    id="name"
                                    placeholder='Firmenname'
                                    value={company.name}
                                    name='name'
                                    onChange={handleChange}
                                    error={errors.get('name') ? {content: errors.get('name')} : null}
                                />
                            </Form.Field>
                        </Grid.Column>
                        <Grid.Column computer={6} tablet={6} mobile={16}>
                            <Form.Field>
                                <label>Email</label>
                                <Form.Input
                                    id="email"
                                    placeholder='Email'
                                    value={company.email}
                                    name='email'
                                    onChange={handleChange}
                                    error={errors.get('email') ? {content: errors.get('email')} : null}
                                />
                            </Form.Field>
                        </Grid.Column>
                        <Grid.Column computer={4} tablet={4} mobile={16}>
                            <Form.Field>
                                <label>Telefon</label>
                                <Form.Input
                                    id="phone"
                                    placeholder='Telefon'
                                    value={company.phone}
                                    name='phone'
                                    onChange={handleChange}
                                    error={errors.get('phone') ? {content: errors.get('phone')} : null}
                                />
                            </Form.Field>
                        </Grid.Column>
                    </Grid.Row>
                    <AddressInput readonly={false} address={company.address} handleAddressChange={handleAddressChange}
                                  errors={ErrorMapper.childError(errors)}/>
                    <Grid.Row>
                        <Grid.Column computer={4} tablet={4} mobile={8}>
                            <Form.Field>
                                <label>Firmenlogo</label>
                                <Image src={props.company.logo} style={{width: "200px"}} wrapped centered/>
                            </Form.Field>
                        </Grid.Column>
                        <Grid.Column computer={4} tablet={4} mobile={8}>
                            <ImageUpload onFileChange={setSelectedCompanyLogo}/>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column computer={4} tablet={4} mobile={8}>
                            <Form.Field>
                                <label>Danke Bild</label>
                                <Image src={props.company.thankYouImage} style={{width: "200px"}} wrapped centered/>
                            </Form.Field>
                        </Grid.Column>
                        <Grid.Column computer={4} tablet={4} mobile={8}>
                            <ImageUpload onFileChange={setSelectedThankYouImage}/>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
                <CUDButtons onSave={(onSuccess, onError) => {
                    CompanyService.save(company, props.company, onSuccess, onError, selectedCompanyLogo, selectedThankYouImage)
                }}
                            object={company}
                            onDelete={() => {
                            }}
                            name={"Firma"}
                            initialState={initialCompany}
                            onSuccess={props.onClose}
                            onCancel={props.onClose}
                            onError={setErrors}
                            canDelete={false}/>
            </Form>
        </Segment>
    );
}