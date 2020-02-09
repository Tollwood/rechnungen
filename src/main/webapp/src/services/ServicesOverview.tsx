import * as React from "react";
import Service from "../order/Service";
import ServiceEdit from "./ServiceEdit";
import ServiceList from "./ServiceList";
import {Page} from "../common/Page";

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


    render() {
        return (
            <div className={"service-overview"}>
                {this.state.edit ? null :
                    <ServiceList
                                 onAdd={this.handleAdd.bind(this)}
                                 onSelect={(service: Service) => {
                                     this.handleSelection(service)
                                 }}

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
    }

    private handleSave() {
        this.setState(Object.assign(this.state, {edit: false, selectedItem: new Service()}));
    }

}
