import * as React from "react";
import RealEstate from "./RealEstate";
import { useNavigate, NavigateFunction } from "react-router-dom";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";

import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import OverviewPage from "../contractors/OverviewPage";

const RealEstateOverview: React.FC = () => {
  const navigate = useNavigate();

  return (
    <OverviewPage
      columns={getColumns(navigate)}
      urlPath="/real-estates"
      apiPath="/api/real-estates"
      labelAdd="Liegenschaft hinzufügen"
    />
  );
};

const getColumns = (navigate: NavigateFunction): GridColDef[] => {
  return [
    {
      field: "name",
      headerName: "Bezeichnung",
      width: 160,
    },
    {
      field: "address.street",
      headerName: "Straße",
      flex: 1,
      valueGetter: (value) => `${value.row.address.street} ${value.row.address.houseNumber || ""}`,
    },
    {
      field: "address.zipCode",
      headerName: "PLZ",
      flex: 1,
      valueGetter: (value) => value.row.address.zipCode,
    },
    {
      field: "address.ciry",
      headerName: "Stadt",
      flex: 1,
      valueGetter: (value) => value.row.address.city,
    },
    {
      field: "distance",
      headerName: "Distanz",
      width: 120,
    },
    {
      field: "distance",
      headerName: "Actions",
      width: 120,
      sortable: false,
      renderCell: (params: GridRenderCellParams<RealEstate>) => (
        <IconButton aria-label="edit" size="small" onClick={() => navigate(`/real-estates/${params.row._id}`)}>
          <EditIcon fontSize="inherit" />
        </IconButton>
      ),
    },
  ] as GridColDef[];
};

export default RealEstateOverview;
