import * as React from "react";
import API from "../API";
import Order from "./Order";
import OrderList from "./OrderList";
import OrderEdit from "./OrderEdit";
import Company from "../employees/Company";

interface OrderOverviewProps {
    company: Company
}

interface OrderOverviewState {
    orders: Order[]
    selectedItem: Order,
    edit: boolean,
    isLoading: boolean
}

export default class OrderOverview extends React.Component<OrderOverviewProps, OrderOverviewState> {

    constructor(props: OrderOverviewProps) {
        super(props);
        this.state = {orders: [], edit: false, selectedItem: new Order(), isLoading: true};
    }

    componentDidMount(): void {
        this.refresh();
    }

    render() {
        return (
            <div className={"order-overview"}>
                {this.state.edit ? null :
                    <OrderList orders={this.state.orders}
                               onAdd={this.handleAdd.bind(this)}
                               onSelect={(order: Order) => {
                                   this.handleSelection(order)
                               }}
                               isLoading={this.state.isLoading}
                    />}
                {!this.state.edit ? null :
                    <OrderEdit
                        company={this.props.company}
                        order={this.state.selectedItem}
                        onCancelEdit={this.handleCancelEdit.bind(this)}
                        onSave={this.handleSave.bind(this)}
                        onDelete={this.handleDelete.bind(this)}
                    />}
            </div>

        );
    }

    private handleAdd() {
        this.setState(Object.assign(this.state, {edit: true, selectedItem: new Order()}))
    }

    private handleSelection(selectedItem: Order) {
        this.setState(Object.assign(this.state, {edit: true, selectedItem: selectedItem}))
    }

    private handleCancelEdit() {
        this.setState(Object.assign(this.state, {edit: false, selectedItem: new Order()}));
        this.refresh();
    }

    private handleDelete() {
        this.setState(Object.assign(this.state, {edit: false, selectedItem: new Order()}));
        this.refresh();
    }

    private handleSave() {
        this.setState(Object.assign(this.state, {edit: false, selectedItem: new Order()}));
        this.refresh();

    }

    private refresh() {
        this.setState({isLoading: true});
        API.get('/api/order')
            .then(res => {
                return res.data;
            })
            .then(data => this.setState({orders: data._embedded.order}))
            .finally(() =>
                this.setState({isLoading: false})
            );
    }
}

