import * as React from "react";
import Helper from "../common/Helper";
import { Page } from "../common/Page";
import { PageService } from "../common/PageService";
import API from "../API";
import Search from "./Search";
import Order from "./Order";
import { Address } from "../common/Address";

interface OrderListProps {
  onAdd: () => void;
  onSelect: (selectedItem: Order) => void;
}

const options = [
  { key: "ORDER_EDIT", text: Helper.getStatusName("ORDER_EDIT"), value: "ORDER_EDIT" },
  { key: "ORDER_EXECUTE", text: Helper.getStatusName("ORDER_EXECUTE"), value: "ORDER_EXECUTE" },
  { key: "ORDER_BILL", text: Helper.getStatusName("ORDER_BILL"), value: "ORDER_BILL" },
  { key: "ORDER_BILL_RECIEVED", text: Helper.getStatusName("ORDER_BILL_RECIEVED"), value: "ORDER_BILL_RECIEVED" },
  { key: "PAYMENT_RECIEVED", text: Helper.getStatusName("PAYMENT_RECIEVED"), value: "PAYMENT_RECIEVED" },
];
const OrderList: React.FC<OrderListProps> = (props: OrderListProps) => {
  const [orders, setOrders] = React.useState<Order[]>([]);

  const [searchTerm, setSearchTerm] = React.useState<string>("");
  const [page, setPage] = React.useState<Page>(new Page("orderId"));
  const [totalPages, setTotalPages] = React.useState<number>(1);
  const [activePage, setActivePage] = React.useState<number>(1);
  const [statusFilter, setStatusFilter] = React.useState<string[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  function search() {
    var status = computeStatusParams(statusFilter);
    setIsLoading(true);
    API.get(
      "/api/orders?term=" +
        searchTerm +
        status +
        "&" +
        PageService.getPageAndSortParams({ ...page, number: activePage - 1 })
    )
      .then((res) => {
        setTotalPages(res.data.page.totalPages);
        setIsLoading(false);
        return res.data.data === undefined ? [] : res.data.data;
      })
      .then((orders: Order[]) => setOrders(orders));
  }

  function handlePaginationChange(data: any) {
    setActivePage(data.activePage as number);
  }

  React.useEffect(() => {
    search();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, statusFilter, page, activePage]);

  return (
    <React.Fragment>
      {/* <Table className="order-list" sortable striped>
        <Table.Header>
          <Search
            onSearchChanged={searchByTerm}
            currentValue={searchTerm}
            onAdd={props.onAdd}
            labelAdd={"Neuen Auftrag"}
            searchFieldWidth={6}
            addButtondWidth={1}
          />

          <Table.Row>
            <Table.HeaderCell colSpan={6}>
              <Dropdown
                placeholder="Nach Status Filtern"
                fluid
                multiple
                selection
                search
                closeOnChange
                options={options}
                onChange={updateStatusFilter}
              />
            </Table.HeaderCell>
          </Table.Row>
          <Table.Row>
            <Table.HeaderCell
              sorted={page.sort === "orderId" ? (page.direction === "ASC" ? "ascending" : "descending") : undefined}
              onClick={() => PageService.sort("orderId", page, sortAndPage)}
            >
              Auftrags-Id
            </Table.HeaderCell>
            <Table.HeaderCell>Liegenschaft</Table.HeaderCell>
            <Table.HeaderCell>Adresse</Table.HeaderCell>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Nettoumsatz</Table.HeaderCell>
            <Table.HeaderCell>Bruttoumsatz</Table.HeaderCell>
            <Table.HeaderCell
              sorted={page.sort === "billNo" ? (page.direction === "ASC" ? "ascending" : "descending") : undefined}
              onClick={() => {
                console.log("sort billNo");
                PageService.sort("billNo", page, sortAndPage);
              }}
            >
              RG-Nummer
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={page.sort === "status" ? (page.direction === "ASC" ? "ascending" : "descending") : undefined}
              onClick={() => PageService.sort("status", page, sortAndPage)}
            >
              Status
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>{renderRows()}</Table.Body>
        <Table.Footer>
          <Pagination
            activePage={activePage}
            onPageChange={(a, data) => handlePaginationChange(data)}
            totalPages={totalPages}
          />
        </Table.Footer>
      </Table> */}
    </React.Fragment>
  );

  function renderRow(order: Order) {
    return (
      // <Table.Row key={order.orderId} onClick={() => props.onSelect(order)}>
      //   <Table.Cell>{order.orderId}</Table.Cell>
      //   <Table.Cell>
      //     <div>
      //       <div>{order.realEstate!!.name}</div>
      //     </div>
      //   </Table.Cell>
      //   <Table.Cell>
      //     <div>
      //       <div>
      //         {getRealEstateAddress(order).street} {getRealEstateAddress(order).houseNumber}
      //       </div>
      //       <div>
      //         {getRealEstateAddress(order).zipCode} {getRealEstateAddress(order).city}
      //       </div>
      //     </div>
      //   </Table.Cell>
      //   <Table.Cell>{order.name ? order.name : "-"}</Table.Cell>
      //   <Table.Cell>
      //     {order
      //       .billItems!.map((s) => s.amount * s.price)
      //       .reduce((a, b) => a + b, 0)
      //       .toLocaleString("de", {
      //         minimumFractionDigits: 2,
      //         maximumFractionDigits: 2,
      //       })}
      //   </Table.Cell>
      //   <Table.Cell>
      //     {(
      //       order.billItems!.map((s) => s.amount * s.price).reduce((a, b) => a + b, 0) *
      //       (1 + order.taxRate)
      //     ).toLocaleString("de", {
      //       minimumFractionDigits: 2,
      //       maximumFractionDigits: 2,
      //     })}
      //   </Table.Cell>
      //   <Table.Cell>{order.billNo ? order.billNo : "-"}</Table.Cell>
      //   <Table.Cell>
      //     <Icon
      //       name={Helper.getStatusIcon(order.status)}
      //       color={order.status === "PAYMENT_RECIEVED" ? "green" : "grey"}
      //     />{" "}
      //     {Helper.getStatusName(order.status)}
      //   </Table.Cell>
      // </Table.Row>
      <div></div>
    );
  }

  function getRealEstateAddress(order: Order): Address {
    if (order.realEstate?.address.street) {
      return order.realEstate.address;
    }
    return new Address();
  }

  function renderRows() {
    if (isLoading) {
      return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n, i) => placeHolderRow(i));
    }
    return orders.map((order) => renderRow(order));
  }
  function sortAndPage(newPage: Page) {
    console.log(newPage);
    setPage(newPage);
  }

  function updateStatusFilter(event: React.SyntheticEvent<HTMLElement>, data: any) {
    filterByStatus(data.value as string[]);
  }

  function searchByTerm(searchTerm: string) {
    setActivePage(1);
    setSearchTerm(searchTerm);
  }

  function filterByStatus(statusFilter: string[]) {
    setActivePage(1);
    setStatusFilter(statusFilter);
  }

  function computeStatusParams(statusFilter: string[]) {
    var statusParams = "";
    if (statusFilter.length > 0) {
      statusParams = "&status=" + statusFilter.join("&status=");
    }
    return statusParams;
  }
};

const placeHolderRow = (index: number) => {
  return (
    // <Table.Row key={index}>
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
    <div></div>
  );
};
export default OrderList;
