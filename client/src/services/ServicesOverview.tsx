import * as React from "react";
import Service from "../order/Product";
import ServiceEdit from "./ServiceEdit";
import ServiceList from "./ServiceList";
import { useState } from "react";
import ServiceCatlog from "../order/ServiceCatalog";

import { Paper } from "@material-ui/core";
import { Container, Grid } from "semantic-ui-react";
import useStyles from "../useStyle";

interface Props {
  serviceCatalogs: ServiceCatlog[];
  selectedServiceCatalog?: ServiceCatlog;
  asPriceList: boolean;
}

const ServicesOverview: React.FC<Props> = ({ serviceCatalogs, selectedServiceCatalog, asPriceList }: Props) => {
  const classes = useStyles();
  const [selectedItem, setSelectedItem] = useState<Service>();
  const [selectedServiceCatlog, setSelectedServiceCatlog] = useState<ServiceCatlog | undefined>(
    selectedServiceCatalog || serviceCatalogs[0]
  );

  function handleAdd() {
    const service = new Service();
    const sc = selectedServiceCatalog ? selectedServiceCatalog : selectedServiceCatlog;
    service.serviceCatalogId = sc!.id;
    setSelectedItem(service);
  }

  function handleSelection(selectedItem: Service) {
    setSelectedItem(selectedItem);
  }

  function handleCancelEdit() {
    setSelectedItem(undefined);
  }
  return (
    <Container maxWidth="lg" className={classes.container}>
      <Grid container spacing={3}>
        <Paper className={classes.paper} style={{ height: "89vh", width: "100%" }}>
          {selectedItem ? (
            <ServiceEdit
              service={selectedItem}
              onCancelEdit={handleCancelEdit}
              onSave={handleCancelEdit}
              onDelete={handleCancelEdit}
            />
          ) : (
            <ServiceList
              asPriceList={asPriceList}
              serviceCatalogs={serviceCatalogs}
              onAdd={handleAdd}
              onSelect={(service: Service) => {
                handleSelection(service);
              }}
              onProductCatalogSelect={setSelectedServiceCatlog}
              selectedServiceCatalog={selectedServiceCatalog ? selectedServiceCatalog : selectedServiceCatlog}
            />
          )}
        </Paper>
      </Grid>
    </Container>
  );
};
export default ServicesOverview;
