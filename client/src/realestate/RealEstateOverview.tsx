import * as React from "react";
import RealEstate from "./RealEstate";
import { Placeholder, Table } from "semantic-ui-react";
import { Page } from "../common/Page";
import { PageService } from "../common/PageService";
import Search from "../order/Search";
import API from "../API";
import { useNavigate } from "react-router-dom";

const RealEstateOverview: React.FC = () => {
  const [searchTerm, setSearchTerm] = React.useState<string>("");
  const [realEstates, setRealEstates] = React.useState<RealEstate[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [page, setPage] = React.useState<Page>(new Page("name"));
  const navigate = useNavigate();

  const search = (searchQuery: string, page: Page) => {
    API.get("api/real-estates?term=" + searchQuery + "&" + PageService.getPageAndSortParams(page))
      .then((res) => (res.data.data === undefined ? [] : res.data.data))
      .then((data: any[]) => data.map((value) => Object.assign(new RealEstate(), value)))
      .then((realEstates: RealEstate[]) => {
        setRealEstates(realEstates);
        setIsLoading(false);
      });
  };
  const sortAndPage = (page: Page) => {
    setIsLoading(true);
    setPage(page);
    search(searchTerm, page);
  };

  React.useEffect(() => {
    search(searchTerm, page);
  }, [searchTerm, page]);

  function renderRows() {
    if (isLoading) {
      return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(placeHolderRow);
    }
    return realEstates.map((realEstate) => renderRow(realEstate));
  }
  return (
    <React.Fragment>
      <Table sortable striped>
        <Table.Header>
          <Search
            onSearchChanged={setSearchTerm}
            currentValue={searchTerm}
            onAdd={() => navigate("/real-estates/new")}
            labelAdd={"Neue Liegenschaft"}
            searchFieldWidth={2}
            addButtondWidth={1}
          />
          <Table.Row>
            <Table.HeaderCell
              sorted={page.sort === "name" ? (page.direction === "ASC" ? "ascending" : "descending") : undefined}
              onClick={() => PageService.sort("name", page, sortAndPage.bind(this))}
            >
              Bezeichnung
            </Table.HeaderCell>
            <Table.HeaderCell>Adresse</Table.HeaderCell>
            <Table.HeaderCell
              sorted={page.sort === "distance" ? (page.direction === "ASC" ? "ascending" : "descending") : undefined}
              onClick={() => PageService.sort("distance", page, sortAndPage.bind(this))}
            >
              Entfernung
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>{renderRows()}</Table.Body>
      </Table>
    </React.Fragment>
  );
  function renderRow(realEstate: RealEstate) {
    return (
      <Table.Row
        className={realEstate.name ? realEstate.name.replace(" ", "") : ""}
        key={realEstate.name}
        onClick={() => navigate(`/real-estates/${realEstate._id}`)}
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

  function placeHolderRow(index: number) {
    return (
      <Table.Row key={index + "real-estate-place-holder"}>
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
};

export default RealEstateOverview;
