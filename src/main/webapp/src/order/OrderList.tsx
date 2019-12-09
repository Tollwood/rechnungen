import * as React from "react";
import Order from "./Order";
import Helper from "../common/Helper";
import {Button, Dropdown, DropdownProps, Icon, Placeholder, Table} from "semantic-ui-react";
import {Page} from "../common/Page";
import PaginationFooter from "../common/PaginationFooter";
import {PageService} from "../common/PageService";
import Link from "../common/Links";
import OrderSearch from "./OrderSearch";
import API from "../API";
import {debounce} from "ts-debounce";

interface OrderListProps {
    onAdd: () => void,
    onSelect: (selectedItem: Link) => void,
}

interface State {
    orders: Order[],
    page: Page,
    isLoading: boolean,
    statusFilter: string[],
    searchTerm: string
}

const options = [
    {key: 'ORDER_EDIT', text: Helper.getStatusName('ORDER_EDIT'), value: 'ORDER_EDIT'},
    {key: 'ORDER_EXECUTE', text: Helper.getStatusName('ORDER_EXECUTE'), value: 'ORDER_EXECUTE'},
    {key: 'ORDER_BILL', text: Helper.getStatusName('ORDER_BILL'), value: 'ORDER_BILL'},
    {key: 'ORDER_BILL_RECIEVED', text: Helper.getStatusName('ORDER_BILL_RECIEVED'), value: 'ORDER_BILL_RECIEVED'},
    {key: 'PAYMENT_RECIEVED', text: Helper.getStatusName('PAYMENT_RECIEVED'), value: 'PAYMENT_RECIEVED'}
];
export default class OrderList extends React.Component<OrderListProps, State> {


    constructor(props: OrderListProps) {
        super(props);
        this.state = {
            orders: [],
            page: new Page('orderId'),
            isLoading: true,
            statusFilter: [],
            searchTerm: ""
        };

        // Binds our scroll event handler
        window.onscroll = debounce(() => {

            if (this.state.isLoading) return;

            // Checks that the page has scrolled to the bottom
            if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
                this.scroll();
            }
        }, 100);
    }

    componentDidMount(): void {
        this.search(this.state.searchTerm, this.state.statusFilter, this.state.page);
    }

    render() {
        return (
            <React.Fragment>
                <Table className="order-list" sortable striped>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell colSpan={4}>
                                <OrderSearch onSearchChanged={this.searchByTerm.bind(this)}
                                             currentValue={this.state.searchTerm}/>
                            </Table.HeaderCell>
                            <Table.HeaderCell><Button floated={"right"} primary icon={{name: "add"}} label={"Neuen Auftrag"}
                                                      onClick={this.props.onAdd}
                                                      className={"add"}/>
                            </Table.HeaderCell>
                        </Table.Row>
                        <Table.Row>
                            <Table.HeaderCell colSpan={5}>
                                <Dropdown placeholder='Nach Status Filtern' fluid multiple selection search closeOnChange
                                          options={options}
                                          onChange={this.updateStatusFilter.bind(this)}/>
                            </Table.HeaderCell>
                        </Table.Row>

                        <Table.Row>
                            <Table.HeaderCell
                                sorted={this.state.page.sort === 'orderId' ? this.state.page.direction : undefined}
                                onClick={() => PageService.sort('orderId', this.state.page, this.sortAndPage.bind(this))}
                            >Auftrags-Id</Table.HeaderCell>
                            <Table.HeaderCell>Nettoumsatz</Table.HeaderCell>
                            <Table.HeaderCell>Bruttoumsatz</Table.HeaderCell>
                            <Table.HeaderCell
                                sorted={this.state.page.sort === 'billNo' ? this.state.page.direction : undefined}
                                onClick={() => PageService.sort('billNo', this.state.page, this.sortAndPage.bind(this))}
                            >RG-Nummer</Table.HeaderCell>
                            <Table.HeaderCell
                                sorted={this.state.page.sort === 'status' ? this.state.page.direction : undefined}
                                onClick={() => PageService.sort('status', this.state.page, this.sortAndPage.bind(this))}
                            >Status</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {this.renderRows()}
                    </Table.Body>
                    <PaginationFooter page={this.state.page} onPageChange={this.sortAndPage.bind(this)} columns={5}/>
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

    private sortAndPage(page: Page) {
        this.setState({isLoading: true, page: page});
        this.search(this.state.searchTerm, this.state.statusFilter, page);
    }

    private updateStatusFilter(event: React.SyntheticEvent<HTMLElement>, data: DropdownProps) {
        this.search(this.state.searchTerm, data.value as string[], this.state.page);
    }

    private scroll() {
        let page = this.state.page;
        page.number += 1;
        this.search(this.state.searchTerm, this.state.statusFilter, page, true)
    }

    private searchByTerm(searchTerm: string) {
        this.search(searchTerm, this.state.statusFilter, this.state.page)
    }

    private search(searchQuery: string, statusFilter: string[], page: Page, append: boolean = false) {
        var status = this.computeStatusParams(statusFilter);
        this.setState({isLoading: true, searchTerm: searchQuery, statusFilter: statusFilter, page: page});
        API.get('api/search?term=' + searchQuery + status + "&" + PageService.getPageAndSortParams(page))
            .then(res => {
                return res.data._embedded === undefined ? [] : res.data._embedded.order;
            })
            .then((orders: Order[]) => {
                if (append) {
                    this.setState({orders: this.state.orders.concat(orders), isLoading: false});
                } else {
                    this.setState({orders: orders, isLoading: false});
                }
            })
    }

    private computeStatusParams(statusFilter: string[]) {
        var statusParams = "";
        if (statusFilter.length > 0) {
            statusParams = "&status=" + statusFilter.join("&status=");
        }
        return statusParams
    }
}
