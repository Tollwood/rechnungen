import * as React from "react";
import {ChangeEvent} from "react";
import {Checkbox, CheckboxProps, Form, Icon, Input} from 'semantic-ui-react'
import API from "../API";
import Grid from "semantic-ui-react/dist/commonjs/collections/Grid";
import CUDButtons from "../common/CUDButtons";
import Service from "../order/Service";

interface Props {
    onSave: () => void;
    onCancelEdit: () => void;
    onDelete: () => void;
    service: Service;
}

interface State {
    service: Service
}

export default class ServiceEdit extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {service: props.service}
    }

    componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<State>, snapshot?: any): void {
        if (this.props.service !== prevProps.service) {
            this.setState({service: this.props.service});
        }
    }

    render() {
        return (
            <div>

                <Form>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column width={4}>
                                <Form.Field>
                                    <label>Code</label>
                                    <input id="articleNumber"
                                           placeholder='Code'
                                           value={this.state.service.articleNumber}
                                           name='articleNumber'
                                           onChange={this.handleChange.bind(this)}
                                    />
                                </Form.Field>
                            </Grid.Column>
                            <Grid.Column width={8}>
                                <Form.Field>
                                    <label>Bezeichnung</label>
                                    <input id="title"
                                           placeholder='Bezeichnung'
                                           value={this.state.service.title}
                                           name='title'
                                           onChange={this.handleChange.bind(this)}
                                    />
                                </Form.Field>
                            </Grid.Column>
                            <Grid.Column width={4}>
                                <Form.Field>
                                    <label>Preis</label>
                                    <Input
                                           type={"number"}
                                           step="0.01"
                                           id="price"
                                           placeholder='Preis'
                                           value={this.state.service.price}
                                           name='price'
                                           onChange={this.handleChange.bind(this)}
                                           icon={<Icon name='eur'/>}
                                    />
                                </Form.Field>
                            </Grid.Column>
                        </Grid.Row>
                        <Grid.Row>
                            <Grid.Column>
                                <Form.Field>
                                    <Checkbox toggle
                                              name="selectable"
                                              label="Wählbar"
                                              checked={this.state.service.selectable}
                                              onChange={this.handleSelectable.bind(this)}/>

                                </Form.Field>
                            </Grid.Column>
                        </Grid.Row>
                        <CUDButtons onSave={this.save.bind(this)} onCancel={this.props.onCancelEdit} onDelete={this.delete.bind(this)} canDelete={this.state.service._links.self !== undefined}/>
                    </Grid>
                </Form>
            </div>
        );
    }

    handleSelectable(event: React.FormEvent<HTMLInputElement>, data: CheckboxProps) {
        this.setState({service: Object.assign(this.state.service, {"selectable": data.value})});
    }

    handleChange(event: ChangeEvent<HTMLInputElement>) {
        const name: string = event.target.name;
        this.setState({service: Object.assign(this.state.service, {[name]: event.target.value})});
    }

    save() {
        if (this.state.service._links.self === undefined) {
            API.post("/api/employee", this.state.service)
                .then(() => this.props.onSave());
        } else {
            API.patch(this.state.service._links.self.href, this.state.service)
                .then(() => this.props.onSave());
        }
    }

    private delete() {
        // @ts-ignore
        API.delete(this.state.service._links.self.href).then(() => {
        });
        this.props.onCancelEdit();
    }
}