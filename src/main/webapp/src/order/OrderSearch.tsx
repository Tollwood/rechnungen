import * as React from "react";
import {Input, InputOnChangeData} from "semantic-ui-react";
import Order from "./Order";
import API from "../API";
import Link from "../common/Links";

interface OrderSearchProps {
    onSelected: (selectedOrder: Link) => void;
    onSearchResult: (orders: Order[]) => void;
    statusFilter: string[]
}

interface OrderSearchState {
    isFetching: boolean
    currentValue: string
    orders: Order[]
}

export default class OrderSearch extends React.Component<OrderSearchProps, OrderSearchState> {

    constructor(props: OrderSearchProps) {
        super(props);
        this.state = {isFetching: false, currentValue: "", orders: []}
    }

    componentDidUpdate(prevProps: Readonly<OrderSearchProps>, prevState: Readonly<OrderSearchState>, snapshot?: any): void {
        if (prevProps.statusFilter.length !== this.props.statusFilter.length) {
            this.search(this.state.currentValue)
        }
    }

    render() {
        return (
            <Input className="order-search"
                   icon='search'
                   placeholder='Suchen ...'
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
        var status = "";
        if (this.props.statusFilter.length > 0) {
            status = "&status=" + this.props.statusFilter.join("&status=");
        }
        API.get('api/search?term=' + searchQuery + status)
            .then(res => {
                return res.data._embedded === undefined ? [] : res.data._embedded.order;
            })
            .then((orders: Order[]) => {
                this.setState({orders: orders, isFetching: false});
                this.props.onSearchResult(orders);
            })
    }
}