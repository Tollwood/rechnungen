import { Divider, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import React from "react";

import DashboardIcon from "@material-ui/icons/Dashboard";
import DescriptionIcon from "@material-ui/icons/Description";
import BuildIcon from "@material-ui/icons/Build";
import BarChartIcon from "@material-ui/icons/BarChart";
import ApartmentIcon from "@material-ui/icons/Apartment";

import { useHistory } from "react-router-dom";
import useStyles from "./useStyle";
import clsx from "clsx";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";

interface Props {
  open: boolean;
  handleDrawerClose: () => void;
}

const Sidebar: React.FC<Props> = ({ open, handleDrawerClose }: Props) => {
  const classes = useStyles();
  const history = useHistory();
  return (
    <Drawer
      variant="permanent"
      classes={{
        paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
      }}
      open={open}
    >
      <div className={classes.toolbarIcon}>
        <IconButton onClick={handleDrawerClose}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />
      <List>
        <ListItem button onClick={() => history.push("/")}>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button onClick={() => history.push("/orders")}>
          <ListItemIcon>
            <DescriptionIcon />
          </ListItemIcon>
          <ListItemText primary="Aufträge" />
        </ListItem>
        <ListItem button onClick={() => history.push("/products")}>
          <ListItemIcon>
            <BuildIcon />
          </ListItemIcon>
          <ListItemText primary="Produkte" />
        </ListItem>
        <ListItem button onClick={() => history.push("/statistics")}>
          <ListItemIcon>
            <BarChartIcon />
          </ListItemIcon>
          <ListItemText primary="Statistiken" />
        </ListItem>
        <ListItem button onClick={() => history.push("/realestates")}>
          <ListItemIcon>
            <ApartmentIcon />
          </ListItemIcon>
          <ListItemText primary="Liegenschaften" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
