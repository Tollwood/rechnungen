import * as React from "react";
import Helper from "../common/Helper";
import {Dropdown, DropdownProps, Icon, Label, Placeholder, Table} from "semantic-ui-react";
import {Page} from "../common/Page";
import {PageService} from "../common/PageService";
import Link from "../common/Links";
import OrderSearch from "./OrderSearch";
import API from "../API";
import {debounce} from "ts-debounce";
import Search from "./Search";

interface OrderListProps {
    onAdd: () => void,
    onSelect: (selectedItem: Link) => void,
}

interface State {
    orders: OrderSearch[],
    page: Page,
    isLoading: boolean,
    statusFilter: string[],
    searchTerm: string,
    hasMore: boolean
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
            searchTerm: "",
            hasMore: true
        };

        // Binds our scroll event handler
        window.onscroll = debounce(() => {

            if (this.state.isLoading) return;

            // Checks that the page has scrolled to the bottom
            if ((window.innerHeight + window.scrollY) >= document.documentElement.offsetHeight && this.state.hasMore) {
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
                        <Search onSearchChanged={this.searchByTerm.bind(this)}
                                currentValue={this.state.searchTerm}
                                onAdd={this.props.onAdd}
                                labelAdd={"Neuen Auftrag"}
                                searchFieldWidth={6}
                                addButtondWidth={1}
                        />

                        <Table.Row>
                            <Table.HeaderCell colSpan={1} selectable={false}>
                                <Label>Treffer: {this.state.page.totalElements}</Label>
                            </Table.HeaderCell>
                            <Table.HeaderCell colSpan={6}>
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
                            <Table.HeaderCell>Liegenschaft</Table.HeaderCell>
                            <Table.HeaderCell>Adresse</Table.HeaderCell>
                            <Table.HeaderCell>Name</Table.HeaderCell>
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
                </Table>
            </React.Fragment>
        )
    }

    private renderRow(order: OrderSearch) {
        return <Table.Row key={order.orderId} onClick={this.props.onSelect.bind(this, order._links.self!)}>
            <Table.Cell>{order.orderId}</Table.Cell>
            <Table.Cell>
                <div>
                    <div>{order.realEstate!!.name}</div>
                </div>
            </Table.Cell>
            <Table.Cell>
                <div>
                    <div>{order.getRealEstateAddress().street} {order.getRealEstateAddress().houseNumber}</div>
                    <div>{order.getRealEstateAddress().zipCode} {order.getRealEstateAddress().city}</div>
                </div>
            </Table.Cell>
            <Table.Cell>{order.name ? order.name : "-"}</Table.Cell>
            <Table.Cell>{order.sum.toLocaleString('de', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            })}</Table.Cell>
            <Table.Cell>{(order.sum * (1 + order.taxRate)).toLocaleString('de', {
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
            return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => this.placeHolderRow())
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
        this.filterByStatus(data.value as string[]);
    }

    private scroll() {
        let page = this.state.page;
        page.number += 1;
        this.search(this.state.searchTerm, this.state.statusFilter, page, true)
    }

    private searchByTerm(searchTerm: string) {
        let page = this.state.page;
        page.number = 0;
        this.search(searchTerm, this.state.statusFilter, page)
    }

    private filterByStatus(statusFilter: string[]) {
        let page = this.state.page;
        page.number = 0;
        this.search(this.state.searchTerm, statusFilter, page)
    }

    private search(searchQuery: string, statusFilter: string[], page: Page, append: boolean = false) {
        var status = this.computeStatusParams(statusFilter);
        this.setState({searchTerm: searchQuery, statusFilter: statusFilter, page: page});
        API.get('api/orders/search?term=' + searchQuery + status + "&" + PageService.getPageAndSortParams(page))
            .then(res => {
                let hasMore = res.data.page.totalPages > res.data.page.number + 1;
                this.setState({hasMore: hasMore, page: Object.assign(this.state.page, {totalElements: res.data.page.totalElements})});
                return res.data._embedded === undefined ? [] : res.data._embedded.order;
            })
            .then((data: any[]) => data.map(value => Object.assign(new OrderSearch(), value)))
            .then((orders: OrderSearch[]) => this.setState({orders: append ? this.state.orders.concat(orders) : orders, isLoading: false}));
    }

    private computeStatusParams(statusFilter: string[]) {
        var statusParams = "";
        if (statusFilter.length > 0) {
            statusParams = "&status=" + statusFilter.join("&status=");
        }
        return statusParams
    }
}
