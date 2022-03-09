import * as React from "react";
import { useNavigate, NavigateFunction } from "react-router-dom";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";

import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import OverviewPage from "./OverviewPage";
import Contractor from "./Contractor";

const ContractorOverview: React.FC = () => {
  const navigate = useNavigate();
  return (
    <OverviewPage
      columns={getColumns(navigate)}
      urlPath="/contractors"
      apiPath="/api/contractors"
      labelAdd="Auftragnehmer hinzufügen"
    />
  );
};

const getColumns = (navigate: NavigateFunction): GridColDef[] => {
  return [
    //     address: {street: "34234234", houseNumber: "234234", zipCode: "34234", city: "234234"}
    // bankDetails: {bic: "234234", iban: "325234", bankName: "234234"}
    // email: "234234"
    // firstName: "Tobias"
    // lastName: "Schlüter"
    // phone: "2342342"
    // taxIdent: "342342"
    // technicianId: "1"
    // _id: "6216c07b20f92da13df03362"
    {
      field: "technicanId",
      headerName: "Kürzel",
      flex: 1,
      valueGetter: (value) => value.row.technicianId,
    },
    {
      field: "firstName",
      headerName: "Vorname",
      width: 160,
    },
    {
      field: "lastName",
      headerName: "Nachname",
      flex: 1,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      sortable: false,
      renderCell: (params: GridRenderCellParams<Contractor>) => (
        <IconButton aria-label="edit" size="small" onClick={() => navigate(`/contractors/${params.row._id}`)}>
          <EditIcon fontSize="inherit" />
        </IconButton>
      ),
    },
  ] as GridColDef[];
};

export default ContractorOverview;
