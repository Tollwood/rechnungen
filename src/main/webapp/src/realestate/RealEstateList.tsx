import * as React from "react";
import RealEstate from "./RealEstate";
import {Button, Dropdown, DropdownProps, Pagination, PaginationProps, Placeholder, Table} from "semantic-ui-react";
import {Page} from "../common/Page";

interface RealEstateListProps {
    onAdd: () => void,
    onSelect: (selectedRealEstate: RealEstate) => void,
    realEstates: RealEstate[],
    page: Page
    onPageChange: (page: Page) => void,
    isLoading: boolean
}

export default class RealEstateList extends React.Component<RealEstateListProps, { }> {

    render() {
        return (
            <React.Fragment>
                <Button floated={"right"} primary icon={{name: "add"}} label={"Neue Liegenschaft"} onClick={this.props.onAdd}
                        className={"add"}/>
                <Table className="ui compact celled table selectable realEstate-list">
                    <Table.Header>
                        <Table.HeaderCell>Bezeichnung</Table.HeaderCell>
                        <Table.HeaderCell>Adresse</Table.HeaderCell>
                        <Table.HeaderCell>Entfernung</Table.HeaderCell>
                    </Table.Header>
                    <Table.Body>
                        {this.renderRows()}
                    </Table.Body>
                    {this.props.page ?
                        <Table.Footer>
                            <Table.Cell colSpan={2}>
                                {this.props.page.totalPages > 1 ?
                                <Pagination  activePage={this.props.page.number + 1}
                                            onPageChange={this.handlePaginationChange.bind(this)}
                                            totalPages={this.props.page.totalPages}
                                            lastItem={this.props.page.totalPages - 1 === this.props.page.number? null : undefined}
                                            nextItem={this.props.page.totalPages - 1 === this.props.page.number? null : undefined}
                                            firstItem={0 === this.props.page.number? null : undefined}
                                            prevItem={0 === this.props.page.number? null : undefined}

                                />:null}
                            </Table.Cell>
                            <Table.Cell>
                                <Dropdown id="pageSize"
                                          style={{float: "right"}}
                                          compact={true}
                                          selection
                                          options={[{key: 10, value: 10, text: 10}, {
                                              key: 20,
                                              value: 20,
                                              text: 20
                                          }, {key: 30, value: 30, text: 30}, {key: 40, value: 40, text: 40}, {
                                              key: 50,
                                              value: 50,
                                              text: 50
                                          }]}
                                          value={this.props.page.size}
                                          onChange={this.handlePageSizeChange.bind(this)}
                                />
                            </Table.Cell>
                        </Table.Footer>

                        : null}
                </Table>

            </React.Fragment>
        )

    }

    handlePageSizeChange(event: React.SyntheticEvent<HTMLElement>, data: DropdownProps) {
        this.props.onPageChange(Object.assign(this.props.page, {size: data.value, number: 0}))
    }

    handlePaginationChange(event: React.MouseEvent<HTMLAnchorElement>, data: PaginationProps) {
        this.props.onPageChange(Object.assign(this.props.page, {number: data.activePage as number - 1}))
    };

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
