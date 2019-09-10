import * as React from "react";
import API from "../API";
import Order from "./Order";
import OrderList from "./OrderList";
import OrderEdit from "./OrderEdit";

interface OrderOverviewState {
    orders: Order[]
    selectedItem: Order,
    edit: boolean
}

export default class OrderOverview extends React.Component<{},OrderOverviewState> {

    constructor(props: {}) {
        super(props);
        this.state = {orders:[], edit: false, selectedItem: new Order()};
    }

    componentDidMount(): void {
        this.refresh();
    }

    render () {
        return (
            <div>
                <OrderList orders={this.state.orders}
                           onAdd={this.handleAdd.bind(this)}
                           onSelect={(order: Order) =>{this.handleSelection(order)}}/>
                {!this.state.edit? null:
                    <OrderEdit order={this.state.selectedItem}
                                    onCancelEdit={this.handleCancelEdit.bind(this)}
                                    onSave={this.handleSave.bind(this)}
                    /> }
            </div>

        );
    }

    private handleAdd(){
        this.setState(Object.assign(this.state, {edit:true, selectedItem: new Order()}))
    }

    private handleSelection(selectedItem: Order){
        this.setState(Object.assign(this.state, {edit:true, selectedItem: selectedItem}))
    }

    private handleCancelEdit(){
        this.setState(Object.assign(this.state, {edit:false, selectedItem: new Order()}))
    }

    private handleSave(){
        this.setState(Object.assign(this.state, {edit:false, selectedItem: new Order()}));
        this.refresh();

    }

    private refresh() {
        API.get('/order')
            .then(res => {
                return res.data;
            })
            .then(data => this.setState({ orders: data._embedded.order}));
    }
}

