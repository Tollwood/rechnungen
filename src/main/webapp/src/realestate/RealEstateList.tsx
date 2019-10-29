import * as React from "react";
import RealEstate from "./RealEstate";
import {Button, Placeholder} from "semantic-ui-react";

interface RealEstateListProps {
    onAdd: () => void,
    onSelect: (selectedRealEstate: RealEstate) => void,
    realEstates: RealEstate[],
    isLoading: boolean
}

export default class RealEstateList extends React.Component<RealEstateListProps> {

    render() {
        return (
            <table className="ui compact celled table selectable realEstate-list">
                <thead>
                <tr>
                    <th>Bezeichnung</th>
                    <th>Adresse</th>
                    <th>Entfernung</th>
                </tr>
                </thead>
                <tbody>
                {this.renderRows()}
                </tbody>
                <tfoot className="full-width">
                <tr>
                    <th colSpan={3}>
                        <Button floated={"right"} primary icon={{name: "add"}} label={"Neue Liegenschaft"} onClick={this.props.onAdd}
                                className={"add"}/>
                    </th>
                </tr>
                </tfoot>
            </table>
        )

    }

    private renderRow(realEstate: RealEstate) {
        return <tr key={realEstate.name} onClick={this.props.onSelect.bind(this, realEstate)}>
            <td>{realEstate.name}</td>
            <td>
                <div>
                    <div>{realEstate.address.street} {realEstate.address.houseNumber}</div>
                    <div>{realEstate.address.zipCode} {realEstate.address.city}</div>
                </div>
            </td>
            <td>
                {realEstate.distance}
            </td>
        </tr>;
    }

    private renderRows() {

        if (this.props.isLoading) {
            return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(numer => this.placeHolderRow())
        }
        return this.props.realEstates.map(realEstate => this.renderRow(realEstate))
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
        </tr>;
    }
}
