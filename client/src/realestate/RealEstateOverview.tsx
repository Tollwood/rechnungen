import * as React from "react";
import RealEstate from "./RealEstate";
import RealEstateList from "./RealEstateList";
import RealEstateEdit from "./RealEstateEdit";

import { Paper } from "@material-ui/core";
import { Container, Grid } from "semantic-ui-react";
import useStyles from "../useStyle";

const RealEstateOverview: React.FC = () => {
  const classes = useStyles();
  const [edit, setEdit] = React.useState<boolean>(false);
  const [selectedItem, setSelectedItem] = React.useState<RealEstate>(new RealEstate());

  return (
    <Container maxWidth="xl" className={classes.container}>
      <Grid container spacing={3}>
        <Paper className={classes.paper} style={{ height: "89vh", width: "100%" }}>
          <div className={"realEstate-overview"}>
            {edit ? null : (
              <RealEstateList
                onAdd={() => setEdit(true)}
                onSelect={(realEstate: RealEstate) => {
                  setSelectedItem(realEstate);
                  setEdit(true);
                }}
              />
            )}
            {edit && (
              <RealEstateEdit
                realEstate={selectedItem}
                onChange={() => {
                  setSelectedItem(new RealEstate());
                  setEdit(false);
                }}
              />
            )}
          </div>
        </Paper>
      </Grid>
    </Container>
  );
};

export default RealEstateOverview;
