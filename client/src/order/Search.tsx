import * as React from "react";

import { useDebounceCallback } from "@react-hook/debounce";
import { useState } from "react";
import { Grid, OutlinedInput, Button, InputAdornment } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";

interface Props {
  onSearchChanged: (searchTerm: string) => void;
  currentValue: string;
  onAdd: () => void;
  labelAdd: string;
  searchFieldWidth: number;
  addButtondWidth: number;
}

const Search: React.FC<Props> = (props: Props) => {
  const [value, setValue] = useState<string>(props.currentValue);
  const debounce = useDebounceCallback((value) => props.onSearchChanged(value), 500, false);

  React.useEffect(() => {
    debounce(value);
  }, [value, debounce]);

  return (
    <Grid container display="flex" justifyContent={"space-between"}>
      <Grid item>
        <OutlinedInput
          className="search"
          size="small"
          placeholder="Suchen ..."
          value={value}
          onChange={(e) => setValue(e.currentTarget.value)}
          endAdornment={
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          }
        />
      </Grid>
      <Grid item>
        <Button variant="contained" startIcon={<AddIcon />} onClick={props.onAdd} color="primary">
          {props.labelAdd}
        </Button>
      </Grid>
    </Grid>
  );
};

export default Search;
