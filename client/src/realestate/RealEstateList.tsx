import * as React from "react";
import RealEstate from "./RealEstate";
import { Placeholder, Table } from "semantic-ui-react";
import { Page } from "../common/Page";
import { PageService } from "../common/PageService";
import Search from "../order/Search";
import API from "../API";

interface Props {
  onAdd: () => void;
  onSelect: (selectedRealEstate: RealEstate) => void;
}

interface State {
  realEstates: RealEstate[];
  searchTerm: string;
  page: Page;
  isLoading: boolean;
}

export default class RealEstateList extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      searchTerm: "",
      page: new Page("name"),
      realEstates: [],
      isLoading: true,
    };
  }

  componentDidMount(): void {
    this.search(this.state.searchTerm, this.state.page);
  }

  render() {
    return (
      <React.Fragment>
        <Table sortable striped>
          <Table.Header>
            <Search
              onSearchChanged={this.searchByTerm.bind(this)}
              currentValue={this.state.searchTerm}
              onAdd={this.props.onAdd}
              labelAdd={"Neue Liegenschaft"}
              searchFieldWidth={2}
              addButtondWidth={1}
            />
            <Table.Row>
              <Table.HeaderCell
                sorted={
                  this.state.page.sort === "name"
                    ? this.state.page.direction === "ASC"
                      ? "ascending"
                      : "descending"
                    : undefined
                }
                onClick={() => PageService.sort("name", this.state.page, this.sortAndPage.bind(this))}
              >
                Bezeichnung
              </Table.HeaderCell>
              <Table.HeaderCell>Adresse</Table.HeaderCell>
              <Table.HeaderCell
                sorted={
                  this.state.page.sort === "distance"
                    ? this.state.page.direction === "ASC"
                      ? "ascending"
                      : "descending"
                    : undefined
                }
                onClick={() => PageService.sort("distance", this.state.page, this.sortAndPage.bind(this))}
              >
                Entfernung
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>{this.renderRows()}</Table.Body>
        </Table>
      </React.Fragment>
    );
  }

  private renderRow(realEstate: RealEstate) {
    return (
      <Table.Row
        className={realEstate.name ? realEstate.name.replace(" ", "") : ""}
        key={realEstate.name}
        onClick={this.props.onSelect.bind(this, realEstate)}
      >
        <Table.Cell>{realEstate.name}</Table.Cell>
        <Table.Cell>
          {realEstate.address != null && (
            <div>
              <div>
                {realEstate.address.street} {realEstate.address.houseNumber}
              </div>
              <div>
                {realEstate.address.zipCode} {realEstate.address.city}
              </div>
            </div>
          )}
        </Table.Cell>
        <Table.Cell>{realEstate.distance}</Table.Cell>
      </Table.Row>
    );
  }

  private renderRows() {
    if (this.state.isLoading) {
      return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((numer) => this.placeHolderRow());
    }
    return this.state.realEstates.map((realEstate) => this.renderRow(realEstate));
  }

  private placeHolderRow() {
    return (
      <Table.Row>
        <Table.Cell>
          <Placeholder>
            <Placeholder.Paragraph>
              <Placeholder.Line />
            </Placeholder.Paragraph>
          </Placeholder>
        </Table.Cell>
        <Table.Cell>
          <Placeholder>
            <Placeholder.Paragraph>
              <Placeholder.Line />
            </Placeholder.Paragraph>
          </Placeholder>
        </Table.Cell>
        <Table.Cell>
          <Placeholder>
            <Placeholder.Paragraph>
              <Placeholder.Line />
            </Placeholder.Paragraph>
          </Placeholder>
        </Table.Cell>
      </Table.Row>
    );
  }

  private searchByTerm(searchTerm: string) {
    let page = this.state.page;
    page.number = 0;
    this.search(searchTerm, page);
  }

  private search(searchQuery: string, page: Page, append: boolean = false) {
    this.setState({ searchTerm: searchQuery, page: page });
    API.get("api/realestates?term=" + searchQuery + "&" + PageService.getPageAndSortParams(page))
      .then((res) => {
        this.setState({
          page: Object.assign(this.state.page, { totalElements: res.data.page.totalElements }),
        });
        return res.data.data === undefined ? [] : res.data.data;
      })
      .then((data: any[]) => data.map((value) => Object.assign(new RealEstate(), value)))
      .then((realEstates: RealEstate[]) =>
        this.setState({
          realEstates: append ? this.state.realEstates.concat(realEstates) : realEstates,
          isLoading: false,
        })
      );
  }

  private scroll() {
    let page = this.state.page;
    page.number += 1;
    this.search(this.state.searchTerm, page, true);
  }

  private sortAndPage(page: Page) {
    this.setState({ isLoading: true, page: page });
    this.search(this.state.searchTerm, page);
  }
}
