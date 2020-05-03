import * as React from "react";
import {ChangeEvent, useEffect, useState} from "react";
import {Checkbox, CheckboxProps, Form, Segment} from 'semantic-ui-react'
import Grid from "semantic-ui-react/dist/commonjs/collections/Grid";
import CUDButtons from "../common/CUDButtons";
import ErrorMapper from "../ErrorMapper";
import Company from "../employees/Company";
import CategoryService from "./CategoryService";
import Category from "./Category";
import CategoryServices from "./CategoryServices";
import Service from "../order/Service";
import ServiceService from "../services/ServiceService";

interface Props {
    company: Company;
    onSave: () => void;
    onCancelEdit: () => void;
    onDelete: () => void;
    categoryUrl?: string;
}

export default function CategoryEdit(props: Props) {

    const [category, setCategory] = useState<Category>(new Category());
    const [services, setServices] = useState<Service[]>([]);

    const [errors, setErrors] = useState(new Map<string, string>());

    useEffect(() => {
        if (props.categoryUrl !== undefined) {
            CategoryService.getSingleFromUrl(props.categoryUrl, setCategory);
        }
    }, [props.categoryUrl]);

    useEffect(() => {
        if (category._links.services !== undefined && services.length === 0) {
            ServiceService.fetchServicesFromUrl(category._links.services!.href).then(setServices);
        }
    }, [category]);

    function handleActive(event: React.FormEvent<HTMLInputElement>, data: CheckboxProps) {
        // @ts-ignore
        setCategory({...category, active: data.checked});
        setErrors(ErrorMapper.removeError(errors, "active"));
    }

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        setCategory({...category, [event.target.name]: event.target.value});
        setErrors(ErrorMapper.removeError(errors, event.target.name));
    }

    return (
        <Segment>
            <Form>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={4}>
                            <Form.Field>
                                <label>Name</label>
                                <Form.Input
                                    id="name"
                                    placeholder='Name'
                                    value={category.name}
                                    name='name'
                                    onChange={handleChange}
                                    error={errors.get('name') ? {content: errors.get('name')} : null}
                                />
                            </Form.Field>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <Form.Field>
                                <Checkbox toggle
                                          name="active"
                                          id="active"
                                          label="Aktiv"
                                          checked={category.active}
                                          onChange={handleActive}/>

                            </Form.Field>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <CategoryServices category={category} services={services} onChange={setCategory}/>
                        </Grid.Column>
                    </Grid.Row>

                    <CUDButtons onSave={(onSuccess, onError) => {
                        CategoryService.save(category, props.company, onSuccess, onError)
                    }}
                                object={category}
                                onDelete={CategoryService.delete}
                                name={"Kategorie"}
                                initialState={category}
                                onSuccess={props.onSave}
                                onCancel={props.onCancelEdit}
                                onError={setErrors}
                                canDelete={category._links.self !== undefined}/>
                </Grid>
            </Form>
        </Segment>
    );
}