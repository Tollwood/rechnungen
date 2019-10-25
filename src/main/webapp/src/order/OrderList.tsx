import * as React from "react";
import Order from "./Order";
import Helper from "../common/Helper";
import {Button, Icon} from "semantic-ui-react";

interface OrderListProps {
    onAdd:()=>void,
    onSelect:(selectedItem: Order)=>void,
    orders:Order[]
}

export default class OrderList extends React.Component<OrderListProps> {

    render () {
         return (
            <table className="ui compact celled table selectable order-list" >
                <thead>
                    <tr>
                        <th>Auftrags-Id</th>
                        <th>Nettoumsatz</th>
                        <th>Bruttoumsatz</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                {this.props.orders.map(order => this.renderRow(order))}
                </tbody>
                <tfoot className="full-width">
                <tr>
                    <th colSpan={4}>
                        <Button floated={"right"} primary icon={{name:"add"}} label={"Neuen Auftrag"} onClick={this.props.onAdd} className={"add"}/>
                    </th>
                </tr>
                </tfoot>
            </table>
        )

    }

    private renderRow(order: Order) {
        return <tr key={order.orderId} onClick={this.props.onSelect.bind(this,order)}>
            <td>{order.orderId}</td>
            <td>{order.sum.toLocaleString('de', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            })}</td>
            <td>{(order.sum * 1.19).toLocaleString('de', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            })}</td>
            <td><Icon name={Helper.getStatusIcon(order.status)}/> {Helper.getStatusName(order.status)}</td>
        </tr>;
    }
}
