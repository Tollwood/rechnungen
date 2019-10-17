import * as React from "react";
import {Dropdown, DropdownItemProps, DropdownOnSearchChangeData, DropdownProps} from "semantic-ui-react";
import Order from "./Order";
import API from "../API";

interface OrderSearchProps {
    onSelected: (selectedOrder: Order) => void;
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
                <Dropdown className="orderSearch"
                          icon='search'
                          placeholder='Auftrags-ID'
                          fluid
                          selectOnNavigation={false}
                          search
                          selection
                          options={this.state.suggetions}
                          noResultsMessage='Neuen Auftrag anlegen'
                          onChange={this.select.bind(this)}
                          value={this.state.currentValue}
                          allowAdditions
                          loading={this.state.isFetching}
                          onAddItem={this.handleAddition.bind(this)}
                          minCharacters={this.state.minSearchLength}
                          onSearchChange={this.handleSearchChange.bind(this)}
                />
        );
    }

    private select(event: React.SyntheticEvent<HTMLElement>, data: DropdownProps){
        this.setState({currentValue:""});
        this.props.onSelected(this.state.orders.find(order => order.orderId === data.value)!);
    }
    private handleAddition(event: React.KeyboardEvent<HTMLElement>, data: DropdownProps) {
        this.props.onSelected({orderId: data.value as string, services: [], _links: {}, smallOrder: false, status: 'ORDER_EDIT', includeKmFee:true, billDate:'', billNo:'', paymentRecievedDate:'', sum:0, billItems:[]});
    }

    private handleSearchChange(event: React.SyntheticEvent<HTMLElement>, data: DropdownOnSearchChangeData,) {
            this.setState(Object.assign(this.state, {isFetching: true}));
            this.search(data.searchQuery);
    }

    private search(searchQuery: string) {
        API.get('/api/order/search/findByOrderIdContaining?orderId='+ searchQuery)
            .then(res => {
                return res.data._embedded.order;
            })
            .then ((orders: Order[]) => {

                 let suggetions = orders.map(order => { return {key: order.orderId, value: order.orderId, text: order.orderId}});
                this.setState({ orders: orders, suggetions: suggetions, isFetching:false})
            })
    }
}