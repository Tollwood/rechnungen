import * as React from "react";
import Service from "../order/Service";
import {Icon} from "semantic-ui-react";

interface ServiceListProps {
    onAdd:()=>void,
    onSelect:(selectedItem: Service)=>void,
    services:Service[]
}

export default class ServiceList extends React.Component<ServiceListProps> {

    render () {
         return (
            <table className="ui compact celled table selectable" >
                <thead>
                    <tr>
                        <th>Artikelnummer</th>
                        <th>Bezeichnung</th>
                        <th>Preis</th>
                        <th>Selektierbar</th>
                    </tr>
                </thead>
                <tbody>
                {this.props.services.map(service => this.renderRow(service))}
                </tbody>
                <tfoot className="full-width">
                <tr>
                    <th colSpan={2}>
                        <div className="ui right floated small primary labeled icon button" onClick={this.props.onAdd}>
                            <i className="user icon"/> Neuen Service
                        </div>
                    </th>
                </tr>
                </tfoot>
            </table>
        )

    }

    private renderRow(service: Service) {
        return <tr key={service.articleNumber} onClick={this.props.onSelect.bind(this,service)}>
            <td>{service.articleNumber}</td>
            <td>{service.title}</td>
            <td>{service.price.toLocaleString('de', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            })}</td>
            <td>{service.selectable ? <Icon name={'check'}/> : null}</td>
        </tr>;
    }
}
