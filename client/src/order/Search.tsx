import * as React from "react";
import { TextField, InputAdornment, Grid, Paper, Button } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import AddIcon from "@material-ui/icons/Add";
import { useState } from "react";
import useStyles from "../useStyle";
import { useTheme } from "@material-ui/core";

interface Props {
  onSearchChanged: (searchTerm: string) => void;
  currentValue: string;
  onAdd: () => void;
  labelAdd: string;
  searchFieldWidth: number;
  addButtondWidth: number;
}

const Search: React.FC<Props> = ({ labelAdd, onAdd, currentValue, onSearchChanged }: Props) => {
  const [value, setValue] = useState<string>(currentValue);
  const classes = useStyles();
  const theme = useTheme();
  return (
    <Grid container justify="space-between" style={{ marginBottom: theme.spacing(3) }}>
      <Grid item xs={12} md={2}>
        <Paper className={classes.paper}>
          <Button variant="contained" color="primary" startIcon={<AddIcon />}>
            {labelAdd}
          </Button>
        </Paper>
      </Grid>
      <Grid item xs={12} md={4}>
        <Paper className={classes.paper}>
          <TextField
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => (e.key === "Enter" ? onSearchChanged(value) : null)}
            placeholder={"Suche"}
            onBlur={() => onSearchChanged(value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Search;
