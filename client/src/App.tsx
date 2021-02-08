import "./App.css";
import React, { useState } from "react";
import EmployeeOverview from "./employees/EmployeeOverview";
import "semantic-ui/dist/semantic.min.css";

import { ContentType } from "./start/ContentType";

import API from "./API";
import Company from "./employees/Company";
import ServicesOverview from "./services/ServicesOverview";
import Link from "./common/Links";
import BackendAlerts from "./BackendAlerts";
import StatisticOverview from "./statistic/StatisticOverview";
import Client from "./clientTemplate/ClientTemplate";
import ProductCatalog from "./order/ServiceCatalog";
import Order from "./order/Order";
import useStyles from "./useStyle";
import { Box, CssBaseline } from "@material-ui/core";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Copyright from "./Copyright";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import OrderOverview from "./order/OrderOverview";
import RealEstateOverview from "./realestate/RealEstateOverview";
import Orders from "./order/Orders";

interface AppState {
  activeOrder?: Link;
  activeContent: ContentType;
  company: Company;
}

interface AppProps {}

const App: React.FC = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [activeContent, setActiveContent] = useState<ContentType>(ContentType.NONE);
  const [activeOrder, setActiveOrder] = useState<Order>();
  const [company, setCompany] = useState<Company>();
  const [clients, setClients] = useState<Client[]>([]);
  const [productCatalogs, setProductCatalogs] = useState<ProductCatalog[]>([]);

  React.useEffect(() => {
    API.get("/api/company/1")
      .then((result) => result.data)
      .then(setCompany);
  }, []);

  React.useEffect(() => {
    API.get("/api/clients")

      .then((res) => (res.data.data === undefined ? [] : res.data.data))
      .then(setClients);
  }, []);
  React.useEffect(() => {
    API.get("/api/product-catalogs")

      .then((res) => (res.data.data === undefined ? [] : res.data.data))
      .then(setProductCatalogs);
  }, []);

  const closeOrder = () => {
    setActiveContent(ContentType.NONE);
    setActiveOrder(undefined);
  };

  if (!company || clients.length === 0) {
    return <div>Loading</div>;
  }
  return (
    <BackendAlerts>
      <div className={classes.root}>
        <CssBaseline />
        <Router>
          <Header company={company} open={open} handleDrawerOpen={handleDrawerOpen} />
          <Sidebar open={open} handleDrawerClose={handleDrawerClose} />
          <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            <Switch>
              <Route path="/orders">
                <OrderOverview company={company} clientTemplates={clients} serviceCatalogs={productCatalogs} />
              </Route>
              <Route path="/employees">
                <EmployeeOverview />
              </Route>
              <Route path="/statistics">
                <StatisticOverview />
              </Route>
              <Route path="/realestates">
                <RealEstateOverview />
              </Route>
              <Route path="/products">
                <ServicesOverview asPriceList={false} serviceCatalogs={productCatalogs} />
              </Route>
              <Route path="/">
                <Dashboard />
              </Route>
            </Switch>
          </main>
        </Router>
      </div>
    </BackendAlerts>
  );
};

export default App;
