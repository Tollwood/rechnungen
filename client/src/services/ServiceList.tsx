import * as React from "react";
import Service from "../order/Service";
import { Page } from "../common/Page";
import { PageService } from "../common/PageService";
import API from "../API";
import Search from "../order/Search";
import { useEffect, useState } from "react";
import ServiceCatlog from "../order/ServiceCatalog";

interface Props {
  onAdd: () => void;
  onSelect: (selectedService: Service) => void;
  selectedServiceCatalog?: ServiceCatlog;
  serviceCatalogs: ServiceCatlog[];
  asPriceList: boolean;
}

const ServiceList: React.FC<Props> = ({ serviceCatalogs, asPriceList, onSelect, onAdd }: Props) => {
  const [selectedServiceCatalog, setSelectedServiceCatalog] = useState<ServiceCatlog>(serviceCatalogs[0]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [page, setPage] = useState<Page>(new Page("articleNumber", 200));
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [services, setServices] = useState<Service[]>([]);

  function search() {
    setIsLoading(true);
    API.get(
      `/api/service-catalogs/${
        selectedServiceCatalog._id
      }/services/?term=${searchTerm}&${PageService.getPageAndSortParams(page)}`
    )
      .then((res) => {
        return res.data.data === undefined ? [] : res.data.data;
      })
      .then((data: any[]) => data.map((value) => Object.assign(new Service(), value)))
      .then((services: Service[]) => {
        setServices((prev) => [...services]);
        setIsLoading(false);
      });
  }

  useEffect(() => {
    if (selectedServiceCatalog) {
      search();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedServiceCatalog, searchTerm, page]);

  function sortAndPage(newPage: Page) {
    setIsLoading(true);
    setServices([]);
    setPage(newPage);
  }

  function renderRows() {
    if (isLoading) {
      return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(placeHolderRow);
    }
    return services
      .filter((s: Service) => s.serviceCatalogId === (selectedServiceCatalog ? selectedServiceCatalog._id : ""))
      .map((service) => renderRow(asPriceList, service, onSelect));
  }

  function searchByTerm(searchTerm: string) {
    setPage({ ...page, number: 0 });
    setSearchTerm(searchTerm);
  }

  function mapCatalogToDropdownItems(): any[] {
    return serviceCatalogs.map((serviceCatalog: ServiceCatlog, index: number) => {
      return { key: serviceCatalog._id, value: serviceCatalog._id, text: serviceCatalog.name };
    });
  }

  function updateCatalog(event: React.SyntheticEvent<HTMLElement>, data: any) {
    const selected = serviceCatalogs.find((sc) => sc._id === (data.value as string));
    setSelectedServiceCatalog(selected!);
  }

  return (
    <React.Fragment>
      {/* {asPriceList && <h1>Preisliste</h1>}
      {!asPriceList && (
        <h3>
          Service Katalog
          <Form.Dropdown
            id="client"
            selection
            options={mapCatalogToDropdownItems()}
            value={selectedServiceCatalog?._id}
            onChange={updateCatalog}
          />
        </h3>
      )}
      {selectedServiceCatalog && (
        <Table className="ui compact celled table selectable service-list" sortable>
          <Table.Header>
            <Search
              onSearchChanged={searchByTerm}
              currentValue={searchTerm}
              onAdd={onAdd}
              labelAdd={"Neuen Service"}
              searchFieldWidth={asPriceList ? 2 : 3}
              addButtondWidth={1}
            />
            <Table.Row>
              <Table.HeaderCell
                sorted={
                  page.sort === "articleNumber" ? (page.direction === "ASC" ? "ascending" : "descending") : undefined
                }
                onClick={() => PageService.sort("articleNumber", page, sortAndPage)}
              >
                Artikelnummer
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={page.sort === "title" ? (page.direction === "ASC" ? "ascending" : "descending") : undefined}
                onClick={() => PageService.sort("title", page, sortAndPage)}
              >
                Bezeichnung
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={page.sort === "price" ? (page.direction === "ASC" ? "ascending" : "descending") : undefined}
                onClick={() => PageService.sort("price", page, sortAndPage)}
              >
                Preis
              </Table.HeaderCell>
              {!asPriceList && <Table.HeaderCell>Selektierbar</Table.HeaderCell>}
            </Table.Row>
          </Table.Header>
          <Table.Body>{renderRows()}</Table.Body>
        </Table>
      )} */}
    </React.Fragment>
  );
};

const renderRow = (asPriceList: boolean, service: Service, onSelect: (service: Service) => void) => {
  return (
    <div></div>
    // <Table.Row key={service.articleNumber} onClick={() => onSelect(service)}>
    //   <Table.Cell>{service.articleNumber}</Table.Cell>
    //   <Table.Cell>{service.title}</Table.Cell>
    //   <Table.Cell>
    //     {service.price.toLocaleString("de", {
    //       minimumFractionDigits: 2,
    //       maximumFractionDigits: 2,
    //     })}
    //   </Table.Cell>
    //   {!asPriceList && <Table.Cell>{service.selectable ? <Icon name={"check"} /> : null}</Table.Cell>}
    // </Table.Row>
  );
};

const placeHolderRow = (index: number) => {
  return (
    <div></div>
    // <Table.Row key={`serice-placeholder-${index}`}>
    //   <Table.Cell>
    //     <Placeholder>
    //       <Placeholder.Paragraph>
    //         <Placeholder.Line />
    //       </Placeholder.Paragraph>
    //     </Placeholder>
    //   </Table.Cell>
    //   <Table.Cell>
    //     <Placeholder>
    //       <Placeholder.Paragraph>
    //         <Placeholder.Line />
    //       </Placeholder.Paragraph>
    //     </Placeholder>
    //   </Table.Cell>
    //   <Table.Cell>
    //     <Placeholder>
    //       <Placeholder.Paragraph>
    //         <Placeholder.Line />
    //       </Placeholder.Paragraph>
    //     </Placeholder>
    //   </Table.Cell>
    //   <Table.Cell>
    //     <Placeholder>
    //       <Placeholder.Paragraph>
    //         <Placeholder.Line />
    //       </Placeholder.Paragraph>
    //     </Placeholder>
    //   </Table.Cell>
    // </Table.Row>
  );
};

export default ServiceList;
