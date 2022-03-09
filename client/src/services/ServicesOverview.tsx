import * as React from "react";
import Service from "../order/Service";
import { GridColDef, GridRenderCellParams, GridValueGetterParams } from "@mui/x-data-grid";
import { useNavigate, NavigateFunction } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import { Box } from "@mui/material";
import { useState } from "react";
import ServiceCatlog from "../order/ServiceCatalog";
import OverviewPage from "../contractors/OverviewPage";

interface Props {
  serviceCatalogs: ServiceCatlog[];
  selectedServiceCatalog?: ServiceCatlog;
  asPriceList: boolean;
}

const ServicesOverview: React.FC<Props> = ({ serviceCatalogs }) => {
  const [selectedServiceCatalog, setSelectedServiceCatalog] = useState<ServiceCatlog>(serviceCatalogs[0]);

  React.useEffect(() => setSelectedServiceCatalog(serviceCatalogs[0]), [serviceCatalogs]);
  const navigate = useNavigate();

  return (
    <React.Fragment>
      {selectedServiceCatalog && (
        <OverviewPage
          labelAdd="Service hinzufügen"
          urlPath="/services"
          apiPath={`/api/service-catalogs/${selectedServiceCatalog._id}/services`}
          columns={getColumns(navigate)}
        />
      )}
    </React.Fragment>
  );
};

const getColumns = (navigate: NavigateFunction): GridColDef[] => {
  return [
    {
      field: "articleNumber",
      headerName: "Artikelnummer",
      flex: 1,
    },
    {
      field: "title",
      headerName: "Bezeichnung",
      flex: 1,
    },
    {
      field: "price",
      headerName: "Preis",
      flex: 1,
      renderCell: (params: GridRenderCellParams<Service>) => (
        <Box width={"100%"} textAlign={"end"} pr={2}>{`${params.row.price.toLocaleString("de", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })} €`}</Box>
      ),
    },
    {
      field: "selectable",
      headerName: "Selektierbar",
      flex: 1,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      sortable: false,
      renderCell: (params: GridRenderCellParams<Service>) => (
        <IconButton aria-label="edit" size="small" onClick={() => navigate(`/services/${params.row._id}`)}>
          <EditIcon fontSize="inherit" />
        </IconButton>
      ),
    },
  ];
};
export default ServicesOverview;
