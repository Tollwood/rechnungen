import * as React from "react";
import {DropdownItemProps, DropdownProps, Form, Grid} from "semantic-ui-react";
import API from "../API";
import RealEstate from "../realestate/RealEstate";
import Order from "./Order";

interface SelectRealEstateProps {
    order: Order;
    realestates: RealEstate[];
    onValueChanged: (value: string) => void;
}

interface SelectRealEstateState {
    selectedRealestate?: string;
    currentRealEstate?: RealEstate;
}

export default class SelectRealEstate extends React.Component<SelectRealEstateProps, SelectRealEstateState> {

    constructor(props: SelectRealEstateProps) {
        super(props);
        this.state = {}
    }

    componentDidMount(): void {
        this.fetchCurrentRealEstate();
    }

    render() {
        return (
            <Grid.Row>
                <Grid.Column computer={10} tablet={10} mobile={16}>
                    <Form.Field>
                        <label>Liegenschaft</label>
                        <Form.Dropdown id="realestate"
                                       search
                                       selection
                                       options={this.mapRealestateToDropdownItems(this.props.realestates)}
                                       value={this.state.selectedRealestate}
                                       onChange={this.updateRealEstate.bind(this)}
                        />
                    </Form.Field>
                    {this.renderDetails()}

                </Grid.Column>
            </Grid.Row>
        );
    }

    private renderDetails() {
        if (!this.state.currentRealEstate) {
            return null;
        }
        return <Grid>
            <Grid.Column width={14}>
                <label>{this.state.currentRealEstate.address.street} {this.state.currentRealEstate.address.houseNumber}</label>
            </Grid.Column>
            <Grid.Column width={13}>
                <label>{this.state.currentRealEstate.address.zipCode} {this.state.currentRealEstate.address.city}</label>
            </Grid.Column>
        </Grid>
    }

    private fetchCurrentRealEstate() {
        if (this.props.order && this.props.order._links.realEstate) {
            API.get(this.props!.order!._links!.realEstate.href)
                .then(res => {
                    let currentRealestate = this.props.realestates.find(realEstate => realEstate._links.self!.href === res.data._links.self.href);
                    this.setState(Object.assign(this.state, {
                        selectedRealestate: res.data._links.self.href,
                        currentRealEstate: currentRealestate ? currentRealestate : this.state.currentRealEstate
                    }))
                })
        }
    }

    private mapRealestateToDropdownItems(realEstates: RealEstate[]): DropdownItemProps[] {
        return realEstates.map((realEstate: RealEstate) => {
            return {key: realEstate.name, value: realEstate._links.self!.href, text: realEstate.name}
        });
    }

    private updateRealEstate(event: React.SyntheticEvent<HTMLElement>, data: DropdownProps) {
        let currentRealestate = this.props.realestates.find(options => options._links.self!.href === data.value);
        this.setState(Object.assign(this.state, {selectedRealestate: data.value, currentRealEstate: currentRealestate}));
        this.props.onValueChanged(data.value as string);
    }
}
