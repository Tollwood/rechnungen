import * as React from "react";
import API from "../API";
import RealEstate from "./RealEstate";
import RealEstateList from "./RealEstateList";
import RealEstateEdit from "./RealEstateEdit";
import {Page} from "../common/Page";

interface RealEstateOverviewState {
    realEstates: RealEstate[]
    selectedItem: RealEstate,
    edit: boolean,
    isLoading: boolean,
    page: Page
}

export default class RealEstateOverview extends React.Component<{}, RealEstateOverviewState> {

    constructor(props: {}) {
        super(props);
        this.state = {
            realEstates: [],
            edit: false,
            selectedItem: new RealEstate(),
            isLoading: true,
            page: {number: 0, size: 20, totalPages: 0, totalElements: 0}
        };
    }

    componentDidMount(): void {
        this.refresh();
    }

    render() {
        return (
            <div className={"realEstate-overview"}>
                {this.state.edit ? null :
                    <RealEstateList realEstates={this.state.realEstates}
                                    onAdd={this.handleAdd.bind(this)}
                                    onSelect={(realEstate: RealEstate) => {
                                        this.handleSelection(realEstate)
                                    }}
                                    page={this.state.page}
                                    isLoading={this.state.isLoading}
                                    onPageChange={this.onPageChange.bind(this)}
                    />}
                {!this.state.edit ? null :
                    <RealEstateEdit realEstate={this.state.selectedItem}
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
        this.refresh();
    }

    private onPageChange(page: Page){
        this.setState({page: page});
        this.refresh();
    }

    private refresh() {
        this.setState({isLoading: true});
        let page = '&page=' + this.state.page.number;
        let size = '&size=' + this.state.page.size;
        API.get('/api/realestate?sort=name' + page + size)
            .then(res => {
                return res.data;
            })
            .then(data => this.setState({realEstates: data._embedded.realestate, page: data.page}))
            .finally(() => this.setState({isLoading: false}));
    }
}

