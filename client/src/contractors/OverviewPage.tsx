import { Grid } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import API from "../API";
import ListResponse from "../ListResponse";
import Search from "../order/Search";
import Contractor from "./Contractor";

interface Props {
  columns: GridColDef[];
  apiPath: string;
  urlPath: string;
  labelAdd: string;
  height?: string;
}
const OverviewPage: React.FC<Props> = ({ columns, apiPath, urlPath, labelAdd, height = "85vh" }) => {
  const search = (searchQuery: string) => {
    API.get<ListResponse<Contractor>>(`${apiPath}?term=${searchQuery}`).then((res) => setItems(res.data.data));
  };
  const [searchTerm, setSearchTerm] = React.useState<string>("");
  React.useEffect(() => {
    search(searchTerm);
  }, [searchTerm, apiPath]);

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
          <div style={{ height: height, width: "100%" }}>
            <div style={{ display: "flex", height: "100%" }}>
              <div style={{ flexGrow: 1 }}>
                <DataGrid
                  rows={items}
                  getRowId={(row) => row._id}
                  columns={columns}
                  rowsPerPageOptions={[20, 50, 100, 200, 500]}
                  checkboxSelection
                  disableSelectionOnClick
                />
              </div>
            </div>
          </div>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default OverviewPage;
