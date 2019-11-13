import * as React from "react";
import Service from "../order/Service";
import {Button, Icon, Placeholder, Table} from "semantic-ui-react";
import {Page} from "../common/Page";
import PaginationFooter from "../common/PaginationFooter";
import {PageService} from "../common/PageService";

interface ServiceListProps {
    onAdd: () => void,
    onSelect: (selectedItem: Service) => void,
    services: Service[],
    isLoading: boolean,
    page: Page,
    onPageChange: (page:Page) => void
}

export default class ServiceList extends React.Component<ServiceListProps> {

    render() {
        return (
            <React.Fragment>
                <Button floated={"right"} primary icon={{name: "add"}} label={"Neuen Service"} onClick={this.props.onAdd}
                        className={"add"}/>
                <Table className="ui compact celled table selectable service-list">
                    <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell
                            sorted={this.props.page.sort === 'orderId' ? this.props.page.direction : undefined}
                            onClick={() => PageService.sort('orderId',this.props.page,this.props.onPageChange)}
                        >Artikelnummer</Table.HeaderCell>
                        <Table.HeaderCell
                            sorted={this.props.page.sort === 'title' ? this.props.page.direction : undefined}
                            onClick={() => PageService.sort('title',this.props.page,this.props.onPageChange)}
                        >Bezeichnung</Table.HeaderCell>
                        <Table.HeaderCell
                            sorted={this.props.page.sort === 'price' ? this.props.page.direction : undefined}
                            onClick={() => PageService.sort('price',this.props.page,this.props.onPageChange)}
                        >Preis</Table.HeaderCell>
                        <Table.HeaderCell
                            sorted={this.props.page.sort === 'selectable' ? this.props.page.direction : undefined}
                            onClick={() => PageService.sort('selectable',this.props.page,this.props.onPageChange)}
                        >Selektierbar</Table.HeaderCell>
                    </Table.Row>
                    </Table.Header>
                    <Table.Body>
                    {this.renderRows()}
                    </Table.Body>
                    <PaginationFooter page={this.props.page} onPageChange={this.props.onPageChange} columns={4}/>
                </Table>
            </React.Fragment>
        )

    }

    private renderRow(service: Service) {
        return <Table.Row key={service.articleNumber} onClick={this.props.onSelect.bind(this, service)}>
            <Table.Cell>{service.articleNumber}</Table.Cell>
            <Table.Cell>{service.title}</Table.Cell>
            <Table.Cell>{service.price.toLocaleString('de', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            })}</Table.Cell>
            <Table.Cell>{service.selectable ? <Icon name={'check'}/> : null}</Table.Cell>
        </Table.Row>;
    }

    private renderRows() {

        if (this.props.isLoading) {
            return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(numer => this.placeHolderRow())
        }
        return this.props.services.map(service => this.renderRow(service))
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
        </Table.Row>;
    }
}
