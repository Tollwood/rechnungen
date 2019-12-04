import * as React from "react";
import API from "../API";
import Order from "./Order";
import OrderList from "./OrderList";
import OrderEdit from "./OrderEdit";
import Company from "../employees/Company";
import {Grid} from "semantic-ui-react";
import OrderSearch from "./OrderSearch";
import {Page} from "../common/Page";
import {PageService} from "../common/PageService";
import Link from "../common/Links";

interface OrderOverviewProps {
    company: Company
}

interface OrderOverviewState {
    orders: Order[]
    selectedItem?: Link,
    edit: boolean,
    isLoading: boolean,
    page: Page
}

export default class OrderOverview extends React.Component<OrderOverviewProps, OrderOverviewState> {

    constructor(props: OrderOverviewProps) {
        super(props);
        this.state = {
            orders: [],
            edit: false,
            isLoading: true,
            page: new Page('orderId')
        };
    }

    componentDidMount(): void {
        this.refresh(this.state.page);
    }

    render() {
        return (
            <React.Fragment>
                <Grid.Row>
                    <Grid.Column textAlign={'center'} computer={3} tablet={12} mobile={16}>
                        <OrderSearch onSelected={this.handleSelection.bind(this)}/>
                    </Grid.Column>
                </Grid.Row>
                <div className={"order-overview"}>
                    {this.state.edit ? null :
                        <OrderList orders={this.state.orders}
                                   onAdd={this.handleAdd.bind(this)}
                                   onSelect={(orderLink: Link) => {
                                       this.handleSelection(orderLink)
                                   }}
                                   isLoading={this.state.isLoading}
                                   page={this.state.page}
                                   onPageChange={this.refresh.bind(this)}
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
        this.setState(Object.assign(this.state, {edit: true, selectedItem: new Order()}))
    }

    private handleSelection(selectedOrderLink?: Link) {
        this.setState(Object.assign(this.state, {edit: true, selectedItem: selectedOrderLink}))
    }

    private handleCancelEdit() {
        this.setState(Object.assign(this.state, {edit: false, selectedItem: new Order()}));
        this.refresh(this.state.page);
    }

    private handleDelete() {
        this.setState(Object.assign(this.state, {edit: false, selectedItem: new Order()}));
        this.refresh(this.state.page);
    }

    private handleSave() {
        this.setState(Object.assign(this.state, {edit: false, selectedItem: new Order()}));
        this.refresh(this.state.page);

    }

    private refresh(page: Page) {
        this.setState({isLoading: true, page: page});
        API.get('/api/order?' + PageService.getPageAndSortParams(page))
            .then(res => {
                return res.data;
            })
            .then(data => {this.setState({orders: data._embedded.order, page: Object.assign(this.state.page, data.page)})
            })
            .finally(() =>
                this.setState({isLoading: false})
            );
    }
}

