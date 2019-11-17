import * as React from "react";
import Order from "./Order";
import Helper from "../common/Helper";
import {Button, Icon, Placeholder, Table} from "semantic-ui-react";
import {Page} from "../common/Page";
import PaginationFooter from "../common/PaginationFooter";
import {PageService} from "../common/PageService";

interface OrderListProps {
    onAdd: () => void,
    onSelect: (selectedItem: Order) => void,
    orders: Order[]
    isLoading: boolean
    page: Page,
    onPageChange: (page: Page) => void
}

export default class OrderList extends React.Component<OrderListProps> {

    render() {
        return (
            <React.Fragment>
                <Button floated={"right"} primary icon={{name: "add"}} label={"Neuen Auftrag"} onClick={this.props.onAdd}
                        className={"add"}/>
                <Table className="order-list" sortable striped>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell
                                sorted={this.props.page.sort === 'orderId' ? this.props.page.direction : undefined}
                                onClick={() => PageService.sort('orderId',this.props.page,this.props.onPageChange)}
                            >Auftrags-Id</Table.HeaderCell>
                            <Table.HeaderCell>Nettoumsatz</Table.HeaderCell>
                            <Table.HeaderCell>Bruttoumsatz</Table.HeaderCell>
                            <Table.HeaderCell
                                sorted={this.props.page.sort === 'billNo' ? this.props.page.direction : undefined}
                                onClick={() => PageService.sort('billNo',this.props.page,this.props.onPageChange)}
                            >RG-Nummer</Table.HeaderCell>
                            <Table.HeaderCell
                                sorted={this.props.page.sort === 'status' ? this.props.page.direction : undefined}
                                onClick={() => PageService.sort('status',this.props.page,this.props.onPageChange)}
                            >Status</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {this.renderRows()}
                    </Table.Body>
                    <PaginationFooter page={this.props.page} onPageChange={this.props.onPageChange} columns={5}/>
                </Table>
            </React.Fragment>
        )

    }

    private renderRow(order: Order) {
        return <Table.Row key={order.orderId} onClick={this.props.onSelect.bind(this, order)}>
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

        if (this.props.isLoading) {
            return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(numer => this.placeHolderRow())
        }
        return this.props.orders.map(order => this.renderRow(order))
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
}
