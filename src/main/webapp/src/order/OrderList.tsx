import * as React from "react";
import Order from "./Order";
import Helper from "../common/Helper";
import {Button, Icon, Placeholder, Table} from "semantic-ui-react";
import {Page} from "../common/Page";
import PaginationFooter from "../common/PaginationFooter";
import {PageService} from "../common/PageService";
import Link from "../common/Links";
import OrderSearch from "./OrderSearch";
import API from "../API";

interface OrderListProps {
    onAdd: () => void,
    onSelect: (selectedItem: Link) => void,
}

interface State {
    orders: Order[],
    page: Page,
    isLoading: boolean
}

export default class OrderList extends React.Component<OrderListProps, State> {

    constructor(props: OrderListProps) {
        super(props);
        this.state = {
            orders: [],
            page: new Page('orderId'),
            isLoading: true
        }
    }

    componentDidMount(): void {
        this.refresh(this.state.page);
    }

    render() {
        return (
            <React.Fragment>
                <OrderSearch onSelected={this.props.onSelect.bind(this)} onSearchResult={this.updateOrders.bind(this)}/>
                <Button floated={"right"} primary icon={{name: "add"}} label={"Neuen Auftrag"} onClick={this.props.onAdd}
                        className={"add"}/>
                <Table className="order-list" sortable striped>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell
                                sorted={this.state.page.sort === 'orderId' ? this.state.page.direction : undefined}
                                onClick={() => PageService.sort('orderId', this.state.page, this.refresh.bind(this))}
                            >Auftrags-Id</Table.HeaderCell>
                            <Table.HeaderCell>Nettoumsatz</Table.HeaderCell>
                            <Table.HeaderCell>Bruttoumsatz</Table.HeaderCell>
                            <Table.HeaderCell
                                sorted={this.state.page.sort === 'billNo' ? this.state.page.direction : undefined}
                                onClick={() => PageService.sort('billNo', this.state.page, this.refresh.bind(this))}
                            >RG-Nummer</Table.HeaderCell>
                            <Table.HeaderCell
                                sorted={this.state.page.sort === 'status' ? this.state.page.direction : undefined}
                                onClick={() => PageService.sort('status', this.state.page, this.refresh.bind(this))}
                            >Status</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {this.renderRows()}
                    </Table.Body>
                    <PaginationFooter page={this.state.page} onPageChange={this.refresh.bind(this)} columns={5}/>
                </Table>
            </React.Fragment>
        )

    }

    private renderRow(order: Order) {
        return <Table.Row key={order.orderId} onClick={this.props.onSelect.bind(this, order._links.self!)}>
            <Table.Cell>{order.orderId}</Table.Cell>
            <Table.Cell>{order.sum.toLocaleString('de', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            })}</Table.Cell>
            <Table.Cell>{(order.sum * 1.19).toLocaleString('de', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            })}</Table.Cell>
            <Table.Cell>{order.billNo ? order.billNo : "-"}</Table.Cell>
            <Table.Cell><Icon name={Helper.getStatusIcon(order.status)}
                              color={order.status === "PAYMENT_RECIEVED" ? "green" : "grey"}/> {Helper.getStatusName(order.status)}
            </Table.Cell>
        </Table.Row>;
    }

    private renderRows() {

        if (this.state.isLoading) {
            return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(numer => this.placeHolderRow())
        }
        return this.state.orders.map(order => this.renderRow(order))
    }

    private placeHolderRow() {
        return <Table.Row>
            <Table.Cell>
                <Placeholder>
                    <Placeholder.Paragraph>
                        <Placeholder.Line/>
                    </Placeholder.Paragraph>
                </Placeholder>
            </Table.Cell>
            <Table.Cell>
                <Placeholder>
                    <Placeholder.Paragraph>
                        <Placeholder.Line/>
                    </Placeholder.Paragraph>
                </Placeholder>
            </Table.Cell>
            <Table.Cell>
                <Placeholder>
                    <Placeholder.Paragraph>
                        <Placeholder.Line/>
                    </Placeholder.Paragraph>
                </Placeholder>
            </Table.Cell>
            <Table.Cell>
                <Placeholder>
                    <Placeholder.Paragraph>
                        <Placeholder.Line/>
                    </Placeholder.Paragraph>
                </Placeholder>
            </Table.Cell>
            <Table.Cell>
                <Placeholder>
                    <Placeholder.Paragraph>
                        <Placeholder.Line/>
                    </Placeholder.Paragraph>
                </Placeholder>
            </Table.Cell>
        </Table.Row>;
    }

    private updateOrders(newOrders: Order[]) {
        this.setState({orders: newOrders, isLoading: false, page: new Page("orderId")})
    }

    private refresh(page: Page) {
        this.setState({isLoading: true, page: page});
        API.get('/api/order?' + PageService.getPageAndSortParams(page))
            .then(res => {
                return res.data;
            })
            .then(data => {
                this.setState({orders: data._embedded.order, page: Object.assign(this.state.page, data.page)})
            })
            .finally(() =>
                this.setState({isLoading: false})
            );
    }
}
