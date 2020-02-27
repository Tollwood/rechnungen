import * as React from "react";
import {ChangeEvent, useState} from "react";
import {Form, FormInput, Grid} from 'semantic-ui-react'
import RealEstate from "./RealEstate";
import CUDButtons from "../common/CUDButtons";
import AddressInput from "../common/AddressInput";
import ErrorMapper from "../ErrorMapper";
import NameValue from "../common/NameValue";
import RealEstateService from "./RealEstateService";

interface RealEstateEditProps {
    onChange: () => void;
    realEstate: RealEstate;
}

export default function RealEstateEdit(props: RealEstateEditProps) {

    const [realEstate, setRealEstate] = useState<RealEstate>(props.realEstate);
    const [errors, setErrors] = useState(new Map<string, string>());

    function onChange(event: ChangeEvent<HTMLInputElement>) {
        setRealEstate({...realEstate, [event.target.name]: event.target.value});
        setErrors(ErrorMapper.removeError(errors, event.target.name));
    }

    function handleAddressChange(nameValue: NameValue) {
        setRealEstate({...realEstate, address: {...realEstate.address, [nameValue.name]: nameValue.value}});
        setErrors(ErrorMapper.removeError(errors, "address." + nameValue.name))
    }

    return (
        <div className={"realEstate-edit"}>
            {realEstate._links === undefined ? <h1>Neue Liegenschaft</h1> : <h1>Liegenschaft Bearbeiten</h1>}
            <Form>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={8}>
                            <Form.Field>
                                <label>Bezeichnung</label>
                                <FormInput id="name"
                                           placeholder='Bezeichnung'
                                           value={realEstate.name}
                                           name='name'
                                           onChange={onChange}
                                           error={errors.get('name') ? {content: errors.get('name')} : null}
                                />
                            </Form.Field>
                        </Grid.Column>
                        <Grid.Column width={8}>
                            <Form.Field>
                                <label>Entfernung</label>
                                <input id="distance"
                                       placeholder='Entfernung'
                                       value={realEstate.distance}
                                       name='distance'
                                       onChange={onChange}
                                />
                            </Form.Field>
                        </Grid.Column>
                    </Grid.Row>
                    <AddressInput address={realEstate.address} handleAddressChange={handleAddressChange}
                                  errors={new Map()}/>
                    <CUDButtons onSave={RealEstateService.save}
                                name={"Liegenschaft"}
                                object={realEstate}
                                onSuccess={props.onChange}
                                onError={setErrors}
                                onCancel={props.onChange}
                                onDelete={RealEstateService.delete}
                                canDelete={realEstate._links.self !== undefined}/>
                </Grid>
            </Form>
        </div>
    );
}