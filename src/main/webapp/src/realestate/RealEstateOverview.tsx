import * as React from "react";
import API from "../API";
import RealEstate from "./RealEstate";
import RealEstateList from "./RealEstateList";
import RealEstateEdit from "./RealEstateEdit";

interface RealEstateOverviewState {
    realEstates: RealEstate[]
    selectedItem: RealEstate,
    edit: boolean
}

export default class RealEstateOverview extends React.Component<{},RealEstateOverviewState> {

    constructor(props: {}) {
        super(props);
        this.state = {realEstates:[], edit: false, selectedItem: new RealEstate()};
    }

    componentDidMount(): void {
        this.refresh();
    }

    render () {
        return (
            <div className={"realEstate-overview"}>
                {this.state.edit? null:
                <RealEstateList realEstates={this.state.realEstates}
                                onAdd={this.handleAdd.bind(this)}
                                onSelect={(realEstate: RealEstate) =>{this.handleSelection(realEstate)}}/>}
                {!this.state.edit? null:
                    <RealEstateEdit realEstate={this.state.selectedItem}
                                    onCancelEdit={this.handleCancelEdit.bind(this)}
                                    onSave={this.handleSave.bind(this)}
                    /> }
            </div>

        );
    }

    private handleAdd(){
        this.setState(Object.assign(this.state, {edit:true, selectedItem: new RealEstate()}))
    }

    private handleSelection(selectedItem: RealEstate){
        this.setState(Object.assign(this.state, {edit:true, selectedItem: selectedItem}))
    }

    private handleCancelEdit(){
        this.setState(Object.assign(this.state, {edit:false, selectedItem: new RealEstate()}))
    }

    private handleSave(){
        this.setState(Object.assign(this.state, {edit:false, selectedItem: new RealEstate()}));
        this.refresh();

    }

    private refresh() {
        API.get('/api/realestate')
            .then(res => {
                return res.data;
            })
            .then(data => this.setState({ realEstates: data._embedded.realestate}));
    }
}

