import * as React from "react";
import {ChangeEvent} from "react";
import OrderItem from "./OrderItem";
import Service from "./Service";
import Icon from "semantic-ui-react/dist/commonjs/elements/Icon";
import {Button, Grid, Table} from "semantic-ui-react";
import AddOrderService from "./AddOrderService";

interface ListOrderServicesProps {
    services: Service[]
    orderServices: OrderItem[]
    onOrderServicesChanged: (orderServices: OrderItem[]) => void
}

interface ListOrderServicesState {
    amount: number
}

export default class ListOrderServices extends React.Component<ListOrderServicesProps, ListOrderServicesState> {

    constructor(props: ListOrderServicesProps) {
        super(props);
        this.state = { amount: 0}
    }

    render() {
        return (
            <React.Fragment>
                <Grid.Row>
                    <Grid.Column computer={8} tablet={8} mobile={16}>
                        <h2>Produkte</h2>
                    </Grid.Column>
                </Grid.Row>
            <Grid.Row>
                <Grid.Column width={16}>
            <div>
                <Table className="ui compact celled table">
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell width={1}>Menge</Table.HeaderCell>
                            <Table.HeaderCell width={3}>Artikel Nr.</Table.HeaderCell>
                            <Table.HeaderCell width={11}>Dienstleistung</Table.HeaderCell>
                            <Table.HeaderCell width={1}></Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <tbody>
                    {this.props.orderServices.map(service => this.renderRow(service))}
                    <AddOrderService services={this.props.services} orderServices={this.props.orderServices}
                                     onOrderServicesAdded={this.props.onOrderServicesChanged}/>
                    </tbody>
                </Table>
            </div>
                </Grid.Column>
            </Grid.Row>
            </React.Fragment>

        );
    }

    private renderRow(orderService: OrderItem) {

        let serviceData = this.props.services.find(service => service._links.self!.href === orderService._links.service.href);
        if (!serviceData) {
            return null;
        }

        return <tr key={serviceData.articleNumber}>
            <td>
                <input value={orderService.amount} onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    this.updateOrderServiceAmount(orderService, event.target.value)
                }}/>
            </td>
            <td>{serviceData.articleNumber}</td>
            <td>{serviceData.title}</td>
            <td>
                <Button color={"red"} onClick={this.removeOrderService.bind(this, orderService)}><Icon name={"trash"}/></Button>
            </td>
        </tr>
    }

    private updateOrderServiceAmount(orderService: OrderItem, newValue: string) {
        const orderServices = this.props.orderServices.map((os: OrderItem) => {
            if (os._links.service.href === orderService._links.service.href) {
                return Object.assign(os, {amount: newValue});
            }
            return os;
        });
        this.props.onOrderServicesChanged(orderServices);
    }

    private removeOrderService(orderService: OrderItem) {
        this.props.onOrderServicesChanged(this.props.orderServices
            .filter((os: OrderItem) => orderService._links.service.href !== os._links.service.href));
    }
}
