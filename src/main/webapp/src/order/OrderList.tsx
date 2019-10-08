import * as React from "react";
import Order from "./Order";
import Helper from "../common/Helper";
import {Icon} from "semantic-ui-react";

interface OrderListProps {
    onAdd:()=>void,
    onSelect:(selectedItem: Order)=>void,
    orders:Order[]
}

export default class OrderList extends React.Component<OrderListProps> {

    render () {
         return (
            <table className="ui compact celled table selectable" >
                <thead>
                    <tr>
                        <th>Auftrags-Id</th>
                        <th>Nettoumsatz</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                {this.props.orders.map(order => this.renderRow(order))}
                </tbody>
                <tfoot className="full-width">
                <tr>
                    <th colSpan={2}>
                        <div className="ui right floated small primary labeled icon button" onClick={this.props.onAdd}>
                            <i className="user icon"/> Neuen Auftrag
                        </div>
                    </th>
                </tr>
                </tfoot>
            </table>
        )

    }

    private renderRow(order: Order) {
        return <tr key={order.orderId} onClick={this.props.onSelect.bind(this,order)}>
            <td>{order.orderId}</td>
            <td>{order.sum}</td>
            <td><Icon name={Helper.getStatusIcon(order.status)}/> {Helper.getStatusName(order.status)}</td>
        </tr>;
    }
}
