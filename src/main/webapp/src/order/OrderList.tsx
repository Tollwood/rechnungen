import * as React from "react";
import Order from "./Order";
import Helper from "../common/Helper";
import {Button, Icon, Placeholder} from "semantic-ui-react";

interface OrderListProps {
    onAdd: () => void,
    onSelect: (selectedItem: Order) => void,
    orders: Order[]
    isLoading: boolean
}

export default class OrderList extends React.Component<OrderListProps> {

    render() {
        return (
            <React.Fragment>
                <Button floated={"right"} primary icon={{name: "add"}} label={"Neuen Auftrag"} onClick={this.props.onAdd}
                        className={"add"}/>
                <table className="ui compact celled table selectable order-list">
                    <thead>
                    <tr>
                        <th>Auftrags-Id</th>
                        <th>Nettoumsatz</th>
                        <th>Bruttoumsatz</th>
                        <th>Status</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.renderRows()}
                    </tbody>
                </table>
            </React.Fragment>
        )

    }

    private renderRow(order: Order) {
        return <tr key={order.orderId} onClick={this.props.onSelect.bind(this, order)}>
            <td>{order.orderId}</td>
            <td>{order.sum.toLocaleString('de', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            })}</td>
            <td>{(order.sum * 1.19).toLocaleString('de', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            })}</td>
            <td><Icon name={Helper.getStatusIcon(order.status)}
                      color={order.status === "PAYMENT_RECIEVED" ? "green" : "grey"}/> {Helper.getStatusName(order.status)}</td>
        </tr>;
    }

    private renderRows() {

        if (this.props.isLoading) {
            return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(numer => this.placeHolderRow())
        }
        return this.props.orders.map(order => this.renderRow(order))
    }

    private placeHolderRow() {
        return <tr>
            <td>
                <Placeholder>
                    <Placeholder.Paragraph>
                        <Placeholder.Line/>
                    </Placeholder.Paragraph>
                </Placeholder>
            </td>
            <td>
                <Placeholder>
                    <Placeholder.Paragraph>
                        <Placeholder.Line/>
                    </Placeholder.Paragraph>
                </Placeholder>
            </td>
            <td>
                <Placeholder>
                    <Placeholder.Paragraph>
                        <Placeholder.Line/>
                    </Placeholder.Paragraph>
                </Placeholder>
            </td>
            <td>
                <Placeholder>
                    <Placeholder.Paragraph>
                        <Placeholder.Line/>
                    </Placeholder.Paragraph>
                </Placeholder>
            </td>
        </tr>;
    }
}
