import * as React from "react";

import {
  DataGrid,
  ColDef,
  ValueGetterParams,
  CellParams,
  RowParams,
  SortModel,
  SortModelParams,
} from "@material-ui/data-grid";
import { Page } from "../common/Page";
import API from "../API";
import { PageService } from "../common/PageService";
import Order, { IOrder } from "./Order";
import { useEffect } from "react";
import RealEstate from "../realestate/RealEstate";
import { Container, Grid, Paper, Typography } from "@material-ui/core";
import { Address } from "../common/Address";

import useStyles from "../useStyle";
import Search from "./Search";
const getRealEstateAddress = (order: Order): Address => {
  if (order.realEstateAddress?.street) {
    return order.realEstateAddress;
  }
  if (order.realEstate?.address.street) {
    return order.realEstate.address;
  }
  return new Address();
};
interface Props {
  onSelect: (selectedOrder?: Order) => void;
}
const Orders: React.FC<Props> = ({ onSelect }: Props) => {
  const [orders, setOrders] = React.useState<IOrder[]>([]);
  const [searchTerm, setSearchTerm] = React.useState<string>("");
  const [page, setPage] = React.useState<Page>(new Page("orderId"));
  const [statusFilter] = React.useState<string[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [sortModel, setSortModel] = React.useState<SortModel>([{ field: "orderId", sort: "asc" }]);

  React.useEffect(() => {
    let active = true;

    (async () => {
      setLoading(true);
      console.log(sortModel);
      const updatedPage = {
        ...page,
        sort: sortModel[0].field,
        direction: sortModel[0].sort?.toUpperCase(),
      } as Page;
      setPage(updatedPage);

      console.log(updatedPage);
      const orders = await API.get(
        "/api/orders?term=" + searchTerm + "&" + PageService.getPageAndSortParams(updatedPage)
      ).then((res) => {
        setPage(res.data.page);
        setLoading(false);
        return res.data.data;
      });
      setOrders(orders);

      if (!active) {
        return;
      }
      // setOrders(orders);
      setLoading(false);
    })();

    return () => {
      active = false;
    };
  }, [sortModel, page.number, searchTerm]);

  const classes = useStyles();

  function searchByTerm(searchTerm: string) {
    setPage({ ...page, number: 0 });
    setSearchTerm(searchTerm);
  }

  const handleSortModelChange = (params: SortModelParams) => {
    if (params.sortModel !== sortModel) {
      setSortModel(params.sortModel);
    }
  };
  return (
    <Container maxWidth="xl" className={classes.container}>
      <Grid container>
        <Search
          onSearchChanged={searchByTerm}
          currentValue={searchTerm}
          onAdd={() => {}}
          labelAdd={"Neuen Auftrag"}
          searchFieldWidth={6}
          addButtondWidth={1}
        />

        <Grid item xs={12}>
          <Paper className={classes.paper} style={{ height: "89vh" }}>
            <DataGrid
              rows={orders}
              sortingOrder={["desc", "asc"]}
              sortingMode="server"
              sortModel={sortModel}
              onSortModelChange={handleSortModelChange}
              columns={columns(classes)}
              pageSize={page.size}
              rowCount={page.totalElements}
              paginationMode="server"
              hideFooterSelectedRowCount
              disableColumnSelector
              loading={loading}
              showToolbar
              onRowClick={(param: RowParams) => {
                console.log(param.row);
                onSelect(param.row as Order);
              }}
            />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

const computeStatusParams = (statusFilter: string[]) => {
  var statusParams = "";
  if (statusFilter.length > 0) {
    statusParams = "&status=" + statusFilter.join("&status=");
  }
  return statusParams;
};

const columns = (classes: any): ColDef[] => {
  const colDef: ColDef[] = [
    { field: "orderId", headerName: "Auftrags-Id", width: 120 },
    {
      field: "realEstate",
      headerName: "Liegenschaft",
      width: 130,
      valueGetter: (params: ValueGetterParams) => `${(params.value as RealEstate).name} `,
    },
    {
      field: "address",
      headerName: "Adresse",
      width: 130,
      renderCell: (params: CellParams) => {
        const address: Address = getRealEstateAddress(params.row as Order);
        return (
          <div>
            <Typography style={{ fontSize: "0.85rem" }}>
              {address.street} {address.houseNumber}
            </Typography>
            <Typography style={{ fontSize: "0.85rem" }}>
              {address.zipCode} {address.city}
            </Typography>
          </div>
        );
      },
    },
    {
      field: "name",
      headerName: "Name",
      valueGetter: (params: CellParams) => `${params.value || "-"}`,
      width: 140,
    },

    {
      field: "Nettoumsatz",
      sortable: false,
      headerName: "Nettoumsatz",
      width: 160,
      type: "number",
      valueGetter: (params: CellParams) => {
        const order = params.row as Order;
        return `${order
          .billItems!.map((s) => s.amount * s.price)
          .reduce((a, b) => a + b, 0)
          .toLocaleString("de", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}€`;
      },
    },
    {
      field: "Bruttoumsatz",
      sortable: false,
      headerName: "Bruttoumsatz",
      width: 160,
      type: "number",
      valueGetter: (params: CellParams) => {
        const order = params.row as Order;
        return `${(
          order.billItems!.map((s) => s.amount * s.price).reduce((a, b) => a + b, 0) *
          (1 + order.taxRate)
        ).toLocaleString("de", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}€`;
      },
    },
    {
      field: "billNo",
      type: "number",
      headerName: "RG-Nummer",
      width: 160,
    },
    {
      field: "status",
      headerName: "Status",
      width: 160,
    },
  ];
  return colDef;
};

export default Orders;
