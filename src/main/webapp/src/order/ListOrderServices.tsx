import * as React from "react";
import OrderService from "./OrderService";
import Service from "./Service";
import Icon from "semantic-ui-react/dist/commonjs/elements/Icon";
import {Table} from "semantic-ui-react";
import {ChangeEvent} from "react";
import AddOrderService from "./AddOrderService";

interface ListOrderServicesProps {
    orderServices: OrderService[]
    onOrderServicesChanged: (orderServices: OrderService[])=> void
}

interface ListOrderServicesState {
    availableServices: {key:string, value: string, text:string}[]
    services: Service[]
    amount:number
}

export default class ListOrderServices extends React.Component<ListOrderServicesProps,ListOrderServicesState> {

    constructor(props: ListOrderServicesProps) {
        super(props);
        this.state = {availableServices:[], services:[],amount:0}
    }

    render () {
            return (
                <div>
                    <Table className="ui compact celled table" >
                        <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell width={2}>Menge</Table.HeaderCell>
                            <Table.HeaderCell width={2}>Artikel Nr.</Table.HeaderCell>
                            <Table.HeaderCell width={11}>Dienstleistung</Table.HeaderCell>
                            <Table.HeaderCell width={1}></Table.HeaderCell>
                        </Table.Row>
                        </Table.Header>
                        <tbody>
                            {this.props.orderServices.map(service => this.renderRow(service))}
                            <AddOrderService orderServices={this.props.orderServices} onOrderServicesAdded={this.props.onOrderServicesChanged} />
                        </tbody>
                    </Table>
                </div>
            );
    }

    private renderRow(orderService: OrderService) {
        return <tr key={orderService.service.articleNumber}>
                    <td>
                        <input value={ orderService.amount} onChange={(event: ChangeEvent<HTMLInputElement>) => { this.updateOrderServiceAmount(orderService, event.target.value)}}/>
                    </td>
                    <td>{orderService.service.articleNumber}</td>
                    <td>{orderService.service.title}</td>
                    <td><Icon name="remove" onClick={this.removeOrderService.bind(this, orderService)} /></td>
                </tr>
    }

    private updateOrderServiceAmount(orderService: OrderService, newValue: string) {
        const orderServices = this.props.orderServices.map((os: OrderService) => {
            if(os.service.articleNumber === orderService.service.articleNumber){
                return Object.assign(os, {amount: newValue});
            }
            return os;
        });
        this.props.onOrderServicesChanged(orderServices);
    }

    private removeOrderService(orderService: OrderService){
        this.props.onOrderServicesChanged(this.props.orderServices
            .filter((os:OrderService) => orderService.service.articleNumber !== os.service.articleNumber));
    }
}
