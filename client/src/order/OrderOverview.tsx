import * as React from "react";
import Company from "../contractors/Company";
import Customer from "../customers/Customer";
import Order from "./Order";
import ServiceCatlog from "./ServiceCatalog";
import OverviewPage from "../contractors/OverviewPage";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { useNavigate, NavigateFunction } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import Helper from "../common/Helper";

interface Props {
  company: Company;
  customers: Customer[];
  serviceCatalogs: ServiceCatlog[];
}

const OrderOverview: React.FC<Props> = (props: Props) => {
  const navigate = useNavigate();
  return (
    <OverviewPage
      columns={getColumns(navigate)}
      labelAdd="Auftrag hinzufügen"
      urlPath="/orders"
      apiPath="/api/orders"
    />
  );
};

const getColumns = (navigate: NavigateFunction): GridColDef[] => {
  return [
    {
      field: "orderId",
      headerName: "Auftrags-Id",
      width: 160,
    },
    {
      field: "realEstate.name",
      headerName: "Liegenschaft",
      width: 160,
      valueGetter: (value) => value.row.realEstate?.name,
    },
    // {
    //   field: "orderId",
    //   headerName: "Adresse",
    //   width: 160,
    // },
    {
      field: "name",
      headerName: "Name",
      width: 160,
      valueGetter: (value) => value.row.contactDetails?.name,
    },
    // {
    //   field: "orderId",
    //   headerName: "Nettoumsatz",
    //   width: 160,
    // },
    // {
    //   field: "orderId",
    //   headerName: "Bruttoumsatz",
    //   width: 160,
    // },
    {
      field: "bill.billNo",
      headerName: "RG-Nummer",
      width: 160,
      valueGetter: (value) => value.row.bill?.billNo,
    },
    {
      field: "status",
      headerName: "Status",
      width: 160,
      valueGetter: (value) => Helper.getStatusName(value.row.status),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      sortable: false,
      renderCell: (params: GridRenderCellParams<Order>) => (
        <IconButton aria-label="edit" size="small" onClick={() => navigate(`/orders/${params.row._id}`)}>
          <EditIcon fontSize="inherit" />
        </IconButton>
      ),
    },
  ];
};
export default OrderOverview;
