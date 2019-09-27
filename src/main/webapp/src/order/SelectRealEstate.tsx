import * as React from "react";
import {DropdownItemProps, DropdownProps, Form, Grid} from "semantic-ui-react";
import RealEstate from "../realestate/RealEstate";
import Order from "./Order";

interface SelectRealEstateProps {
    order: Order;
    realestates: RealEstate[];
    selectedRealestate?: RealEstate;
    onValueChanged: (value: string) => void;
}

export default class SelectRealEstate extends React.Component<SelectRealEstateProps, {}> {

    constructor(props: SelectRealEstateProps) {
        super(props);
        this.state = {}
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
                                       value={this.props.selectedRealestate?this.props.selectedRealestate._links.self!.href : undefined }
                                       onChange={this.updateRealEstate.bind(this)}
                        />
                    </Form.Field>
                    {this.renderDetails()}
                </Grid.Column>
            </Grid.Row>
        );
    }

    private renderDetails() {
        let realEstate : RealEstate | undefined = this.props.selectedRealestate;
        if (!realEstate) {
            return null;
        }
        return <Grid>
            <Grid.Column width={14}>
                <label>{realEstate.address.street} {realEstate.address.houseNumber}</label>
            </Grid.Column>
            <Grid.Column width={13}>
                <label>{realEstate.address.zipCode} {realEstate.address.city}</label>
            </Grid.Column>
        </Grid>
    }

    private mapRealestateToDropdownItems(realEstates: RealEstate[]): DropdownItemProps[] {
        return realEstates.map((realEstate: RealEstate) => {
            return {key: realEstate.name, value: realEstate._links.self!.href, text: realEstate.name}
        });
    }

    private updateRealEstate(event: React.SyntheticEvent<HTMLElement>, data: DropdownProps) {
        this.props.onValueChanged(data.value as string);
    }
}
