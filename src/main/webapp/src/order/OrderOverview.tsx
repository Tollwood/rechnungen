import * as React from "react";
import OrderList from "./OrderList";
import OrderEdit from "./OrderEdit";
import Company from "../employees/Company";
import Link from "../common/Links";

interface OrderOverviewProps {
    company: Company
}

interface OrderOverviewState {
    selectedItem?: Link,
    edit: boolean
}

export default class OrderOverview extends React.Component<OrderOverviewProps, OrderOverviewState> {

    constructor(props: OrderOverviewProps) {
        super(props);
        this.state = {
            edit: false
        };
    }

    render() {
        return (
            <React.Fragment>
                <div className={"order-overview"}>
                    {this.state.edit ? null :
                        <OrderList onAdd={this.handleAdd.bind(this)}
                                   onSelect={(orderLink: Link) => {
                                       this.handleSelection(orderLink)
                                   }}
                        />}
                    {!this.state.edit ? null :
                        <OrderEdit
                            company={this.props.company}
                            orderLink={this.state.selectedItem}
                            onCancelEdit={this.handleCancelEdit.bind(this)}
                            onSave={this.handleSave.bind(this)}
                            onDelete={this.handleDelete.bind(this)}
                        />}
                </div>
            </React.Fragment>

        );
    }

    private handleAdd() {
        this.setState(Object.assign(this.state, {edit: true, selectedItem: null}))
    }

    private handleSelection(selectedOrderLink?: Link) {
        this.setState(Object.assign(this.state, {edit: true, selectedItem: selectedOrderLink}))
    }

    private handleCancelEdit() {
        this.setState(Object.assign(this.state, {edit: false, selectedItem: null}));
    }

    private handleDelete() {
        this.setState(Object.assign(this.state, {edit: false, selectedItem: null}));
    }

    private handleSave() {
        this.setState(Object.assign(this.state, {edit: false, selectedItem: null}));
    }
}

