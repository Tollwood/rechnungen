import * as React from "react";
import Company from "./employees/Company";

import clsx from "clsx";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

import Typography from "@material-ui/core/Typography";

import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";

import MenuIcon from "@material-ui/icons/Menu";

import NotificationsIcon from "@material-ui/icons/Notifications";
import logo from "./logo_timm.png";
import useStyles from "./useStyle";
import { useTheme } from "@material-ui/core";
interface Props {
  company: Company;
  handleDrawerOpen: () => void;
  open: boolean;
}

const Header: React.FC<Props> = ({ company, handleDrawerOpen, open }: Props) => {
  const classes = useStyles();
  const theme = useTheme();
  return (
    <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
      <Toolbar className={classes.toolbar}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
        >
          <MenuIcon />
        </IconButton>
        <Typography component="h1" variant="h5" color="inherit" noWrap className={classes.title}>
          <img src={logo} alt="Logo" style={{ height: "50px", marginRight: theme.spacing(2) }} />
          {company.name}
        </Typography>
        <IconButton color="inherit">
          <Badge badgeContent={4} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  );

  //             <Header as='h1' textAlign={"center"} className="header-title"  content={this.props.company.name}/>
};

export default Header;
