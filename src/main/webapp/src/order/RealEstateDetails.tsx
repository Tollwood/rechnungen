import * as React from "react";
import {Grid} from "semantic-ui-react";
import RealEstate from "../realestate/RealEstate";

interface RealEstateDetailsProps {
    realEstate: RealEstate;
}

export default class RealEstateDetails extends React.Component<RealEstateDetailsProps, {}> {

    render() {
        return (
            <Grid>
                <Grid.Column width={14}>
                    <label>{this.props.realEstate.address.street} {this.props.realEstate.address.houseNumber}</label>
                </Grid.Column>
                <Grid.Column width={13}>
                    <label>{this.props.realEstate.address.zipCode} {this.props.realEstate.address.city}</label>
                </Grid.Column>
            </Grid>
        );
    }
}
