import * as React from "react";
import RealEstate from "./RealEstate";
import RealEstateList from "./RealEstateList";
import RealEstateEdit from "./RealEstateEdit";
import Company from "../employees/Company";

interface Props {
    company:Company
}

interface RealEstateOverviewState {
    selectedItem: RealEstate,
    edit: boolean,
}

export default class RealEstateOverview extends React.Component<Props, RealEstateOverviewState> {

    constructor(props: Props) {
        super(props);
        this.state = {
            edit: false,
            selectedItem: new RealEstate(),
        };
    }

    render() {
        return (
            <div className={"realEstate-overview"}>
                {this.state.edit ? null :
                    <RealEstateList onAdd={this.handleAdd.bind(this)}
                                    onSelect={(realEstate: RealEstate) => {
                                        this.handleSelection(realEstate)
                                    }}
                    />}
                {!this.state.edit ? null :
                    <RealEstateEdit realEstate={this.state.selectedItem}
                                    company={this.props.company}
                                    onChange={this.handleChange.bind(this)}
                    />}
            </div>

        );
    }

    private handleAdd() {
        this.setState(Object.assign(this.state, {edit: true, selectedItem: new RealEstate()}))
    }

    private handleSelection(selectedItem: RealEstate) {
        this.setState(Object.assign(this.state, {edit: true, selectedItem: selectedItem}))
    }

    private handleChange() {
        this.setState(Object.assign(this.state, {edit: false, selectedItem: new RealEstate()}));
    }
}

