import * as React from "react";
import {ChangeEvent} from "react";
import {Form, Grid} from 'semantic-ui-react'
import API from "../API";
import RealEstate from "./RealEstate";
import CUDButtons from "../common/CUDButtons";
import AddressInput from "../common/AddressInput";

interface RealEstateEditProps {
    onChange: () => void;
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
            <div className={"realEstate-edit"}>
                {this.state.realEstate._links === undefined ? <h1>Neue Liegenschaft</h1> : <h1>Liegenschaft Bearbeiten</h1>}
                <Form>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column width={8}>
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
                            <Grid.Column width={8}>
                                <Form.Field>
                                    <label>Entfernung</label>
                                    <input id="distance"
                                           placeholder='Entfernung'
                                           value={this.state.realEstate.distance}
                                           name='distance'
                                           onChange={this.handleRealestateChange.bind(this)}
                                    />
                                </Form.Field>
                            </Grid.Column>
                        </Grid.Row>
                        <AddressInput address={this.state.realEstate.address} handleAddressChange={this.handleAddressChange.bind(this)}/>
                        <CUDButtons onSave={this.save.bind(this)} onCancel={this.props.onChange} onDelete={this.delete.bind(this)}
                                    canDelete={this.state.realEstate._links.self !== undefined}/>
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
            API.post("/api/realestate", this.state.realEstate)
                .then(() => this.props.onChange());
        } else {
            API.patch(this.state.realEstate._links.self.href, this.state.realEstate)
                .then(() => this.props.onChange());
        }
    }

    private delete() {
        // @ts-ignore
        API.delete(this.state.realEstate._links.self.href).then(() => {
            this.props.onChange();
        });

    }
}