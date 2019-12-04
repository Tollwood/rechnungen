import * as React from "react";
import {Dropdown, DropdownItemProps, DropdownOnSearchChangeData, DropdownProps} from "semantic-ui-react";
import Order from "./Order";
import API from "../API";
import Link from "../common/Links";

interface OrderSearchProps {
    onSelected: (selectedOrder: Link) => void;
}

interface OrderSearchState {
    isFetching: boolean
    currentValue: string
    minSearchLength: number
    suggetions: DropdownItemProps[]
    orders: Order[]
}

export default class OrderSearch extends React.Component<OrderSearchProps, OrderSearchState> {

    constructor(props: OrderSearchProps) {
        super(props);
        this.state = {isFetching: false, currentValue: "", minSearchLength: 1, suggetions: [], orders: []}
    }

    render() {
        return (
            <Dropdown className="order-search"
                      icon='search'
                      placeholder='Auftrags-ID'
                      fluid
                      selectOnNavigation={false}
                      search
                      selection
                      options={this.state.suggetions}
                      onChange={this.select.bind(this)}
                      value={this.state.currentValue}
                      loading={this.state.isFetching}
                      minCharacters={this.state.minSearchLength}
                      onSearchChange={this.handleSearchChange.bind(this)}
            />
        );
    }

    private select(event: React.SyntheticEvent<HTMLElement>, data: DropdownProps) {
        this.setState({currentValue: ""});
        this.props.onSelected(this.state.orders.find(order => order.orderId === data.value)!._links.self!);
    }

    private handleSearchChange(event: React.SyntheticEvent<HTMLElement>, data: DropdownOnSearchChangeData,) {
        this.setState(Object.assign(this.state, {isFetching: true}));
        this.search(data.searchQuery);
    }

    private search(searchQuery: string) {
        API.get('api/search?term=' + searchQuery)
            .then(res => {
                return res.data._embedded.order;
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
            })
    }
}