import * as React from "react";
import {ChangeEvent} from "react";
import OrderService from "./OrderService";
import Service from "./Service";
import Icon from "semantic-ui-react/dist/commonjs/elements/Icon";
import {Table} from "semantic-ui-react";
import AddOrderService from "./AddOrderService";
import API from "../API";

interface ListOrderServicesProps {
    orderServices: OrderService[]
    onOrderServicesChanged: (orderServices: OrderService[])=> void
}

interface ListOrderServicesState {
    services: Service[]
    amount:number
}

export default class ListOrderServices extends React.Component<ListOrderServicesProps,ListOrderServicesState> {

    constructor(props: ListOrderServicesProps) {
        super(props);
        this.state = {services:[], amount:0}
    }

    componentDidMount(): void {

        API.get(`/services`)
            .then(res => {
                console.log(res);
                console.log(res.data);
                return res.data;
            })
            .then(data => {
                this.setState(Object.assign(this.state, { services: data._embedded.services}));
            });
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
                            <AddOrderService services={this.state.services} orderServices={this.props.orderServices} onOrderServicesAdded={this.props.onOrderServicesChanged} />
                        </tbody>
                    </Table>
                </div>
            );
    }

    private renderRow(orderService: OrderService) {

        let serviceData = this.state.services.find(service => service._links.self.href === orderService._links.service.href);
        if(!serviceData){
            return null;
        }

        return <tr key={serviceData.articleNumber}>
                    <td>
                        <input value={ orderService.amount} onChange={(event: ChangeEvent<HTMLInputElement>) => { this.updateOrderServiceAmount(orderService, event.target.value)}}/>
                    </td>
                    <td>{serviceData.articleNumber}</td>
                    <td>{serviceData.title}</td>
                    <td><Icon name="remove" onClick={this.removeOrderService.bind(this, orderService)} /></td>
                </tr>
    }

    private updateOrderServiceAmount(orderService: OrderService, newValue: string) {
        const orderServices = this.props.orderServices.map((os: OrderService) => {
            if(os._links.service.href === orderService._links.service.href){
                return Object.assign(os, {amount: newValue});
            }
            return os;
        });
        this.props.onOrderServicesChanged(orderServices);
    }

    private removeOrderService(orderService: OrderService){
        this.props.onOrderServicesChanged(this.props.orderServices
            .filter((os:OrderService) => orderService._links.service.href !== os._links.service.href));
    }
}
