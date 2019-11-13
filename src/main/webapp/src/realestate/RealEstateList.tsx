import * as React from "react";
import RealEstate from "./RealEstate";
import {Button, Placeholder, Table} from "semantic-ui-react";
import {Page} from "../common/Page";
import PaginationFooter from "../common/PaginationFooter";
import {PageService} from "../common/PageService";

interface RealEstateListProps {
    onAdd: () => void,
    onSelect: (selectedRealEstate: RealEstate) => void,
    realEstates: RealEstate[],
    page: Page
    onPageChange: (page: Page) => void,
    isLoading: boolean
}

export default class RealEstateList extends React.Component<RealEstateListProps,{}> {

    render() {
        return (
            <React.Fragment>
                <Button floated={"right"} primary icon={{name: "add"}} label={"Neue Liegenschaft"} onClick={this.props.onAdd}
                        className={"add"}/>
                <Table sortable striped>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell
                                sorted={this.props.page.sort === 'name' ? this.props.page.direction : undefined}
                                onClick={() => PageService.sort('name',this.props.page,this.props.onPageChange)}
                            >
                                Bezeichnung
                            </Table.HeaderCell>
                            <Table.HeaderCell
                                sorted={this.props.page.sort === 'address.zipCode' ? this.props.page.direction : undefined}
                                onClick={() => PageService.sort('address.zipCode',this.props.page,this.props.onPageChange)}
                            >Adresse</Table.HeaderCell>
                            <Table.HeaderCell
                                sorted={this.props.page.sort === 'distance' ? this.props.page.direction : undefined}
                                onClick={() => PageService.sort('distance',this.props.page,this.props.onPageChange)}
                            >Entfernung</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {this.renderRows()}
                    </Table.Body>
                   <PaginationFooter page={this.props.page} onPageChange={this.props.onPageChange} columns={3}/>
                </Table>
            </React.Fragment>
        )

    }

    private renderRow(realEstate: RealEstate) {
        return <Table.Row className={realEstate.name ? realEstate.name.replace(" ", "") : ""} key={realEstate.name}
                          onClick={this.props.onSelect.bind(this, realEstate)}>
            <Table.Cell>{realEstate.name}</Table.Cell>
            <Table.Cell>
                <div>
                    <div>{realEstate.address.street} {realEstate.address.houseNumber}</div>
                    <div>{realEstate.address.zipCode} {realEstate.address.city}</div>
                </div>
            </Table.Cell>
            <Table.Cell>
                {realEstate.distance}
            </Table.Cell>
        </Table.Row>;
    }

    private renderRows() {

        if (this.props.isLoading) {
            return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(numer => this.placeHolderRow())
        }
        return this.props.realEstates.map(realEstate => this.renderRow(realEstate))
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
        </Table.Row>;
    }
}
