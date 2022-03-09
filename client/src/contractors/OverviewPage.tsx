import * as React from "react";
import Search from "../order/Search";
import API from "../API";
import { useNavigate, NavigateFunction } from "react-router-dom";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { Grid } from "@mui/material";
import { Address } from "../common/Address";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import Contractor from "./Contractor";
import ListResponse from "../ListResponse";

interface Props {
  columns: GridColDef[];
  apiPath: string;
  urlPath: string;
  labelAdd: string;
}
const OverviewPage: React.FC<Props> = ({ columns, apiPath, urlPath, labelAdd }) => {
  const search = (searchQuery: string) => {
    API.get<ListResponse<Contractor>>(`${apiPath}?term=${searchQuery}`).then((res) => setItems(res.data.data));
  };
  const [searchTerm, setSearchTerm] = React.useState<string>("");
  React.useEffect(() => {
    search(searchTerm);
  }, [searchTerm]);

  const [items, setItems] = React.useState<Contractor[]>([]);
  const navigate = useNavigate();

  return (
    <React.Fragment>
      <Grid container p={2} spacing={2}>
        <Grid item xs={12}>
          <Search
            onSearchChanged={setSearchTerm}
            currentValue={searchTerm}
            onAdd={() => navigate(`${urlPath}/new`)}
            labelAdd={labelAdd}
            searchFieldWidth={2}
            addButtondWidth={1}
          />
        </Grid>
        <Grid item xs={12}>
          <div style={{ height: 800, width: "100%" }}>
            <DataGrid
              rows={items}
              getRowId={(row) => row._id}
              columns={columns}
              rowsPerPageOptions={[20, 50, 100, 200, 500]}
              checkboxSelection
              disableSelectionOnClick
            />
          </div>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default OverviewPage;
