import * as React from "react";
import {ChangeEvent} from "react";
import {Form, Grid} from 'semantic-ui-react'
import API from "../API";
import RealEstate from "./RealEstate";
import CUDButtons from "../common/CUDButtons";
import AddressInput from "../common/AddressInput";

interface RealEstateEditProps {
    onSave: () => void;
    onCancelEdit: () => void;
    realEstate: RealEstate;
}

interface RealEstateEditState {
    realEstate: RealEstate
}

export default class RealEstateEdit extends React.Component<RealEstateEditProps, RealEstateEditState> {

    constructor(props: RealEstateEditProps) {
        super(props);
        this.state = {realEstate: props.realEstate}
    }

    componentDidUpdate(prevProps: Readonly<RealEstateEditProps>, prevState: Readonly<RealEstateEditState>, snapshot?: any): void {
        if (this.props.realEstate !== prevProps.realEstate) {
            this.setState({realEstate: this.props.realEstate});
        }
    }

    render() {
        return (
            <div>
                {this.state.realEstate._links === undefined ? <h1>Neue Liegenschaft</h1> : <h1>Liegenschaft Bearbeiten</h1>}
                <Form>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column>
                                <Form.Field>
                                    <label>Bezeichnung</label>
                                    <input id="name"
                                           placeholder='Bezeichnung'
                                           value={this.state.realEstate.name}
                                           name='name'
                                           onChange={this.handleRealestateChange.bind(this)}
                                    />
                                </Form.Field>
                            </Grid.Column>
                        </Grid.Row>
                        <AddressInput address={this.state.realEstate.address} handleAddressChange={this.handleAddressChange}/>
                        <CUDButtons canSave={true} onSave={this.save.bind(this)} onCancel={this.props.onCancelEdit} onDelete={this.delete}
                                    canDelete={this.state.realEstate._links !== undefined}/>
                    </Grid>
                </Form>
            </div>
        );
    }

    handleRealestateChange(event: ChangeEvent<HTMLInputElement>) {
        const name: string = event.target.name;
        this.setState({realEstate: Object.assign(this.state.realEstate, {[name]: event.target.value})});
    }

    handleAddressChange(event: ChangeEvent<HTMLInputElement>) {
        const newAddress = Object.assign(this.state.realEstate.address, {[event.target.name]: event.target.value});
        this.setState({realEstate: Object.assign(this.state.realEstate, {address: newAddress})});
    }

    save() {
        if (this.state.realEstate._links.self === undefined) {
            API.post("/realestate", this.state.realEstate)
                .then(() => this.props.onSave());
        } else {
            API.put(this.state.realEstate._links.self.href, this.state.realEstate)
                .then(() => this.props.onSave());
        }
    }

    private delete() {
        // @ts-ignore
        API.delete(this.state.realEstate._links.self.href).then(() => {
        });
        this.props.onCancelEdit();
    }
}