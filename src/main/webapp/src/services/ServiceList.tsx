import * as React from "react";
import Service from "../order/Service";
import {Button, Icon, Placeholder} from "semantic-ui-react";

interface ServiceListProps {
    onAdd: () => void,
    onSelect: (selectedItem: Service) => void,
    services: Service[],
    isLoading: boolean
}

export default class ServiceList extends React.Component<ServiceListProps> {

    render() {
        return (
            <table className="ui compact celled table selectable service-list">
                <thead>
                <tr>
                    <th>Artikelnummer</th>
                    <th>Bezeichnung</th>
                    <th>Preis</th>
                    <th>Selektierbar</th>
                </tr>
                </thead>
                <tbody>
                {this.renderRows()}
                </tbody>
                <tfoot className="full-width">
                <tr>
                    <th colSpan={4}>
                        <Button floated={"right"} primary icon={{name: "add"}} label={"Neuen Service"} onClick={this.props.onAdd}
                                className={"add"}/>
                    </th>
                </tr>
                </tfoot>
            </table>
        )

    }

    private renderRow(service: Service) {
        return <tr key={service.articleNumber} onClick={this.props.onSelect.bind(this, service)}>
            <td>{service.articleNumber}</td>
            <td>{service.title}</td>
            <td>{service.price.toLocaleString('de', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            })}</td>
            <td>{service.selectable ? <Icon name={'check'}/> : null}</td>
        </tr>;
    }

    private renderRows() {

        if (this.props.isLoading) {
            return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(numer => this.placeHolderRow())
        }
        return this.props.services.map(service => this.renderRow(service))
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
