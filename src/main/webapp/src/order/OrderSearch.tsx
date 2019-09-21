import * as React from "react";
import {Dropdown, DropdownItemProps, DropdownOnSearchChangeData, DropdownProps} from "semantic-ui-react";
import Order from "./Order";
import API from "../API";

interface OrderSearchProps {
    onSelected: (selectedOrder: Order) => void;
}

interface OrderSearchState {
    isFetching: boolean,
    currentValue: string
    minSearchLength: number
    suggetions: DropdownItemProps[]
}

export default class OrderSearch extends React.Component<OrderSearchProps, OrderSearchState> {

    constructor(props: OrderSearchProps) {
        super(props);
        this.state = {isFetching: false, currentValue: "", minSearchLength: 1, suggetions: []}
    }

    render() {
        return (
                <Dropdown icon='search'
                          placeholder='Auftrags-ID'
                          fluid
                          search
                          selection
                          options={this.state.suggetions}
                          noResultsMessage='Neuen Auftrag anlegen'
                          allowAdditions
                          loading={this.state.isFetching}
                          onAddItem={this.handleAddition.bind(this)}
                          minCharacters={this.state.minSearchLength}
                          onSearchChange={this.handleSearchChange.bind(this)}
                />
        );
    }

    private handleAddition(event: React.KeyboardEvent<HTMLElement>, data: DropdownProps) {
        this.props.onSelected({orderId: data.value as string, services: [], _links: {}});
    }

    private handleSearchChange(event: React.SyntheticEvent<HTMLElement>, data: DropdownOnSearchChangeData,) {
            this.setState(Object.assign(this.state, {isFetching: true}));
            this.search(data.searchQuery);
    }

    private search(searchQuery: string) {
        API.get('/order/search/findByOrderIdContaining?orderId='+ searchQuery)
            .then(res => {
                return res.data._embedded.order;
            })
            .then ((orders: Order[]) => orders.map(order => { return {key: order.orderId, value: order.orderId, text: order.orderId}}))
            .then(result => this.setState({ suggetions: result, isFetching:false}));
    }
}