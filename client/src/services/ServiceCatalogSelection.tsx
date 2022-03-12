import { Autocomplete, createFilterOptions, Grid, TextField } from "@mui/material";
import React, { useState } from "react";
import API from "../API";
import ServiceCatlog from "../order/ServiceCatalog";

interface Props {
  serviceCatalogs: ServiceCatlog[];
  value: ServiceCatlog | null;
  onChange: (serviceCatolg: ServiceCatlog | null) => void;
}

const filter = createFilterOptions<ServiceCatlog>();

const ServiceCatalogSelection: React.FC<Props> = ({ serviceCatalogs, value, onChange }) => {
  const [inputValue, setInputValue] = useState<string>();
  return (
    <Grid container p={2} spacing={2}>
      <Grid item xs={12} display="flex" justifyContent="space-around">
        <Autocomplete
          disablePortal
          id="service-catalog-selection"
          value={value}
          onChange={async (event, newValue) => {
            if (newValue !== null && !serviceCatalogs.find((s) => s.name === newValue!.name)) {
              console.log(`add new service catalog ${inputValue}`);
              const response = await API.post<ServiceCatlog>("/api/service-catalogs", { name: inputValue });
              console.log(response.data);
              onChange(response.data);
              return;
            } else {
              onChange(newValue);
            }
          }}
          filterOptions={(options, params) => {
            const filtered = filter(options, params);

            if (params.inputValue !== "") {
              filtered.push({
                name: `${params.inputValue} hinzufügen`,
              });
            }

            return filtered;
          }}
          inputValue={inputValue}
          onInputChange={(_e, v) => setInputValue(v)}
          options={serviceCatalogs}
          getOptionLabel={(s) => s.name}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Service Katalog" />}
        />
      </Grid>
    </Grid>
  );
};

export default ServiceCatalogSelection;
