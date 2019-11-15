import * as React from "react";
import {ChangeEvent} from "react";
import {Checkbox, CheckboxProps, Form, Icon} from 'semantic-ui-react'
import API from "../API";
import Grid from "semantic-ui-react/dist/commonjs/collections/Grid";
import CUDButtons from "../common/CUDButtons";
import Service from "../order/Service";
import ErrorMapper from "../ErrorMapper";

interface Props {
    onSave: () => void;
    onCancelEdit: () => void;
    onDelete: () => void;
    service: Service;
}

interface State {
    service: Service
    errors: Map<string, string>
}

export default class ServiceEdit extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {service: props.service, errors: new Map<string, string>()}
    }

    componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>, snapshot?: any): void {
        if (this.props.service !== prevProps.service) {
            this.setState({service: this.props.service});
        }
    }

    render() {
        return (
            <div className={"service-edit"}>
                <Form>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column width={4}>
                                <Form.Field>
                                    <label>Code</label>
                                    <Form.Input
                                        id="articleNumber"
                                        placeholder='Code'
                                        value={this.state.service.articleNumber}
                                        name='articleNumber'
                                        onChange={this.handleChange.bind(this)}
                                        error={this.state.errors.get('articleNumber') ? {content: this.state.errors.get('articleNumber')} : null}
                                    />
                                </Form.Field>
                            </Grid.Column>
                            <Grid.Column width={8}>
                                <Form.Field>
                                    <label>Bezeichnung</label>
                                    <Form.Input id="title"
                                                placeholder='Bezeichnung'
                                                value={this.state.service.title}
                                                name='title'
                                                onChange={this.handleChange.bind(this)}
                                                error={this.state.errors.get('title') ? {content: this.state.errors.get('title')} : null}
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
                                        value={this.state.service.price}
                                        name='price'
                                        onChange={this.handleChange.bind(this)}
                                        icon={<Icon name='eur'/>}
                                        error={this.state.errors.get('price') ? {content: this.state.errors.get('price')} : null}
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
                                              checked={this.state.service.selectable}
                                              onChange={this.handleSelectable.bind(this)}/>

                                </Form.Field>
                            </Grid.Column>
                        </Grid.Row>
                        <CUDButtons onSave={this.save.bind(this)} onCancel={this.props.onCancelEdit} onDelete={this.delete.bind(this)}
                                    canDelete={this.state.service._links.self !== undefined}/>
                    </Grid>
                </Form>
            </div>
        );
    }

    handleSelectable(event: React.FormEvent<HTMLInputElement>, data: CheckboxProps) {
        this.setState({
            service: Object.assign(this.state.service, {"selectable": data.value}),
            errors: ErrorMapper.removeError(this.state.errors, "selectable", )
        });
    }

    handleChange(event: ChangeEvent<HTMLInputElement>) {
        const name: string = event.target.name;
        this.setState({
            service: Object.assign(this.state.service, {[name]: event.target.value}),
            errors: ErrorMapper.removeError(this.state.errors, name)
        });
    }

    save() {
        if (this.state.service._links.self === undefined) {
            API.post("/api/service", this.state.service)
                .then(() => this.props.onSave())
                .catch(error => {
                    ErrorMapper.map(error, this)
                });
        } else {
            API.patch(this.state.service._links.self.href, this.state.service)
                .then(() => this.props.onSave())
                .catch(error => {
                    ErrorMapper.map(error, this)
                });
        }
    }

    private delete() {
        // @ts-ignore
        API.delete(this.state.service._links.self.href).then(() => {
        });
        this.props.onDelete();
    }
}