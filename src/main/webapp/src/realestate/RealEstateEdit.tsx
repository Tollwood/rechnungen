import * as React from "react";
import {Button, Form, FormProps, Icon} from 'semantic-ui-react'
import {ChangeEvent} from "react";
import API from "../API";
import RealEstate from "./RealEstate";

interface RealEstateEditProps {
    onSave: ()=>void;
    onCancelEdit: ()=>void;
    realEstate: RealEstate;
}

interface RealEstateEditState {
    realEstate:RealEstate
}

export default class RealEstateEdit extends React.Component<RealEstateEditProps,RealEstateEditState> {

    constructor(props: RealEstateEditProps) {
        super(props);
        this.state = {realEstate: props.realEstate}
    }

    componentDidUpdate(prevProps: Readonly<RealEstateEditProps>, prevState: Readonly<RealEstateEditState>, snapshot?: any): void {
        if(this.props.realEstate !== prevProps.realEstate){
            this.setState({realEstate: this.props.realEstate});
        }
    }

    render () {
            return (
                <div>
                    {this.state.realEstate._links === undefined? <h1>Neue Liegenschaft</h1>: <h1>Liegenschaft Bearbeiten</h1> }
                    <Form onSubmit={this.save.bind(this)}>
                        <Form.Field>
                            <label>Bezeichnung</label>
                            <input id="name"
                                   placeholder='Bezeichnung'
                                   value={this.state.realEstate.name}
                                   name='name'
                                   onChange={this.handleRealestateChange.bind(this)}
                            />
                        </Form.Field>

                        <h3>Adresse:</h3>
                        <Form.Field>
                            <label>Straße</label>
                            <input id="street"
                                   placeholder='Straße'
                                   value={this.state.realEstate.address.street}
                                   name='street'
                                   onChange={this.handleAddressChange.bind(this)}/>
                        </Form.Field>
                        <Form.Field>
                            <label>Hausnummer</label>
                            <input id="houseNumber"
                                   placeholder='Hausnummer'
                                   value={this.state.realEstate.address.houseNumber}
                                   name='houseNumber'
                                   onChange={this.handleAddressChange.bind(this)}/>
                        </Form.Field>
                        <div >
                            <Form.Field>
                                <label>PLZ</label>
                                <input id="zipCode"
                                       placeholder='PLZ'
                                       value={this.state.realEstate.address.zipCode}
                                       name='zipCode'
                                       onChange={this.handleAddressChange.bind(this)}/>
                            </Form.Field>
                            <Form.Field>
                                <label>Stadt</label>
                                <input id="city"
                                       placeholder='Stadt'
                                       value={this.state.realEstate.address.city}
                                       name='city'
                                       onChange={this.handleAddressChange.bind(this)}/>
                            </Form.Field>
                        </div>

                        <Button type='submit' primary>speichern</Button>
                        <Button onClick={this.props.onCancelEdit}>Abbrechen</Button>
                        {this.state.realEstate._links !== undefined?
                            <Button onClick={this.delete}><Icon name={"delete"}/></Button> : <span/> }
                    </Form>
                </div>
            );
    }

    handleRealestateChange(event: ChangeEvent<HTMLInputElement>)
    {
        const name : string = event.target.name;
        this.setState({realEstate: Object.assign(this.state.realEstate, {[name]:event.target.value}) });
    }

    handleAddressChange(event: ChangeEvent<HTMLInputElement>)
    {
        const newAddress = Object.assign(this.state.realEstate.address, { [event.target.name]:event.target.value});
        this.setState({realEstate: Object.assign(this.state.realEstate, {address: newAddress})});
    }

    save(event: React.FormEvent<HTMLFormElement>, data: FormProps){
        if(this.state.realEstate._links.self === undefined){
            API.post("/realestate",this.state.realEstate)
                .then(()=> this.props.onSave());
        }
        else {
            API.put(this.state.realEstate._links.self.href,this.state.realEstate)
                .then(()=> this.props.onSave());
        }
    }

    private delete() {
        // @ts-ignore
        API.delete(this.state.realEstate._links.self.href).then(() =>{});
        this.props.onCancelEdit();
    }
}