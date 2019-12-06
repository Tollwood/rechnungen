import * as React from "react";
import {DropdownItemProps, Input, InputOnChangeData} from "semantic-ui-react";
import Order from "./Order";
import API from "../API";
import Link from "../common/Links";

interface OrderSearchProps {
    onSelected: (selectedOrder: Link) => void;
    onSearchResult: (orders: Order[]) => void;
}

interface OrderSearchState {
    isFetching: boolean
    currentValue: string
    suggetions: DropdownItemProps[]
    orders: Order[]
}

export default class OrderSearch extends React.Component<OrderSearchProps, OrderSearchState> {

    constructor(props: OrderSearchProps) {
        super(props);
        this.state = {isFetching: false, currentValue: "", suggetions: [], orders: []}
    }

    render() {
        return (
            <Input className="order-search"
                   icon='search'
                   placeholder='Auftrags-ID'
                   fluid
                   value={this.state.currentValue}
                   loading={this.state.isFetching}
                   onChange={this.handleSearchChange.bind(this)}
            />
        );
    }


    private handleSearchChange(event: React.ChangeEvent<HTMLInputElement>, data: InputOnChangeData) {
        this.setState(Object.assign(this.state, {currentValue: data.value, isFetching: true}));
        this.search(data.value);
    }

    private search(searchQuery: string) {
        API.get('api/search?term=' + searchQuery)
            .then(res => {
                return res.data._embedded === undefined ? [] : res.data._embedded.order;
            })
            .then((orders: Order[]) => {

                let suggetions = orders.flatMap(order => {
                    let elements = [];
                    if (order.billNo !== null && order.billNo.includes(searchQuery)) {
                        elements.push({key: order.billNo, value: order.orderId, text: order.billNo, icon: "envelope open"});
                    }
                    if (order.orderId !== null && order.orderId !== undefined && order.orderId.includes(searchQuery)) {
                        elements.push({key: order.orderId, value: order.orderId, text: order.orderId, icon: "unordered list"});
                    }
                    return elements
                });
                this.setState({orders: orders, suggetions: suggetions, isFetching: false})
                this.props.onSearchResult(orders);
            })
    }
}