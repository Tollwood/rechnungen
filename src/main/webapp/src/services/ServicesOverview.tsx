import * as React from "react";
import API from "../API";
import Service from "../order/Service";
import ServiceEdit from "./ServiceEdit";
import ServiceList from "./ServiceList";
import {Page} from "../common/Page";
import {PageService} from "../common/PageService";

interface ServiceOverviewProps {
}

interface ServiceOverviewState {
    services: Service[]
    selectedItem: Service,
    edit: boolean,
    isLoading: boolean
    page: Page
}

export default class ServicesOverview extends React.Component<ServiceOverviewProps, ServiceOverviewState> {

    constructor(props: ServiceOverviewProps) {
        super(props);
        this.state = {services: [], edit: false, selectedItem: new Service(), isLoading: true, page: new Page('articleNumber')};
    }

    componentDidMount(): void {
        this.refresh(this.state.page);
    }

    render() {
        return (
            <div className={"service-overview"}>
                {this.state.edit ? null :
                    <ServiceList services={this.state.services}
                                 onAdd={this.handleAdd.bind(this)}
                                 onSelect={(service: Service) => {
                                     this.handleSelection(service)
                                 }}
                                 isLoading={this.state.isLoading}
                                 page={this.state.page}
                                 onPageChange={this.refresh.bind(this)}

                    />}
                {!this.state.edit ? null :
                    <ServiceEdit
                        service={this.state.selectedItem}
                        onCancelEdit={this.handleCancelEdit.bind(this)}
                        onSave={this.handleSave.bind(this)}
                        onDelete={this.handleDelete.bind(this)}
                    />}
            </div>

        );
    }

    private handleAdd() {
        this.setState(Object.assign(this.state, {edit: true, selectedItem: new Service()}))
    }

    private handleSelection(selectedItem: Service) {
        this.setState(Object.assign(this.state, {edit: true, selectedItem: selectedItem}))
    }

    private handleCancelEdit() {
        this.setState(Object.assign(this.state, {edit: false, selectedItem: new Service()}))
    }

    private handleDelete() {
        this.setState(Object.assign(this.state, {edit: false, selectedItem: new Service()}));
        this.refresh(this.state.page);
    }

    private handleSave() {
        this.setState(Object.assign(this.state, {edit: false, selectedItem: new Service()}));
        this.refresh(this.state.page);
    }

    private refresh(page: Page) {
        this.setState({isLoading: true});
        API.get('/api/service?'+ PageService.getPageAndSortParams(page))
            .then(res => {
                return res.data;
            })
            .then(data => this.setState({services: data._embedded.service, page: Object.assign(this.state.page, data.page)}))
            .finally(() => this.setState({isLoading: false}));
    }
}
