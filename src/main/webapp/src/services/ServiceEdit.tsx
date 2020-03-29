import * as React from "react";
import {ChangeEvent, useState} from "react";
import {Checkbox, CheckboxProps, Form, Icon, Segment} from 'semantic-ui-react'
import Grid from "semantic-ui-react/dist/commonjs/collections/Grid";
import CUDButtons from "../common/CUDButtons";
import Service from "../order/Service";
import ServiceService from "./ServiceService";
import ErrorMapper from "../ErrorMapper";

interface Props {
    onSave: () => void;
    onCancelEdit: () => void;
    onDelete: () => void;
    service: Service;
}

export default function ServiceEdit(props: Props) {

    const [service, setService] = useState<Service>(props.service);
    const [initialService, setInitialService] = useState<Service>(props.service);
    const [errors, setErrors] = useState(new Map<string, string>());

    function handleSelectable(event: React.FormEvent<HTMLInputElement>, data: CheckboxProps) {

        // @ts-ignore
        setService({...service, selectable: data.checked});
        setErrors(ErrorMapper.removeError(errors, "selectable"));
    }

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        setService({...service, [event.target.name]: event.target.value});
        setErrors(ErrorMapper.removeError(errors, event.target.name));
    }

    return (
        <Segment>
            <Form>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={4}>
                            <Form.Field>
                                <label>Code</label>
                                <Form.Input
                                    id="articleNumber"
                                    placeholder='Code'
                                    value={service.articleNumber}
                                    name='articleNumber'
                                    onChange={handleChange}
                                    error={errors.get('articleNumber') ? {content: errors.get('articleNumber')} : null}
                                />
                            </Form.Field>
                        </Grid.Column>
                        <Grid.Column width={8}>
                            <Form.Field>
                                <label>Bezeichnung</label>
                                <Form.Input id="title"
                                            placeholder='Bezeichnung'
                                            value={service.title}
                                            name='title'
                                            onChange={handleChange}
                                            error={errors.get('title') ? {content: errors.get('title')} : null}
                                />
                            </Form.Field>
                        </Grid.Column>
                        <Grid.Column width={4}>
                            <Form.Field>
                                <label>Preis</label>
                                <Form.Input
                                    type={"number"}
                                    step="0.01"
                                    id="price"
                                    placeholder='Preis'
                                    value={service.price}
                                    name='price'
                                    onChange={handleChange}
                                    icon={<Icon name='eur'/>}
                                    error={errors.get('price') ? {content: errors.get('price')} : null}
                                />
                            </Form.Field>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width={4}>
                            <Form.Field>
                                <label>Beschreibung</label>
                                <Form.Input
                                    id="description"
                                    placeholder='Beschreibung'
                                    value={service.description}
                                    name='description'
                                    onChange={handleChange}
                                    error={errors.get('description') ? {content: errors.get('description')} : null}
                                />
                            </Form.Field>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <Form.Field>
                                <Checkbox toggle
                                          name="selectable"
                                          id="selectable"
                                          label="Wählbar"
                                          checked={service.selectable}
                                          onChange={handleSelectable}/>

                            </Form.Field>
                        </Grid.Column>
                    </Grid.Row>
                    <CUDButtons onSave={ServiceService.save}
                                onDelete={ServiceService.delete}
                                name={"Dienstleistung"}
                                object={service}
                                initialState={initialService}
                                onSuccess={props.onSave}
                                onCancel={props.onCancelEdit}
                                onError={setErrors}
                                canDelete={service._links.self !== undefined}/>
                </Grid>
            </Form>
        </Segment>
    );
}