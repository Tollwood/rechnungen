import "./App.css";
import React, { useState } from "react";
import ContractorOverview from "./contractors/ContractorOverview";
import AppHeader from "./Header";
import RealEstateOverview from "./realestate/RealEstateOverview";
import API from "./API";
import Company from "./contractors/Company";
import ServicesOverview from "./services/ServicesOverview";
import Client from "./customers/Customer";
import ServiceCatalog from "./order/ServiceCatalog";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RealEstateEdit from "./realestate/RealEstateEdit";
import { SnackbarProvider } from "notistack";
import { Grid } from "@mui/material";
import OrderOverview from "./order/OrderOverview";

const App: React.FC = () => {
  const [company, setCompany] = useState<Company>();
  const [customers, setCustomers] = useState<Client[]>([]);
  const [serviceCatalogs, setServiceCatalogs] = useState<ServiceCatalog[]>([]);

  React.useEffect(() => {
    API.get("/api/companies/1")
      .then((result) => result.data)
      .then(setCompany);
  }, []);

  React.useEffect(() => {
    API.get("/api/customers")
      .then((res) => (res.data.data === undefined ? [] : res.data.data))
      .then(setCustomers);
  }, []);

  console.log(customers);
  React.useEffect(() => {
    API.get("/api/service-catalogs")

      .then((res) => (res.data.data === undefined ? [] : res.data.data))
      .then(setServiceCatalogs);
  }, []);

  if (!company || customers.length === 0) {
    return <div>Loading</div>;
  }
  return (
    <SnackbarProvider maxSnack={3}>
      <Router>
        <AppHeader company={company} />
        <Grid container pr={4} pl={4}>
          <Grid item xs={12}>
            <Routes>
              <Route path="/real-estates" element={<RealEstateOverview />}></Route>
              <Route path="/real-estates/:id" element={<RealEstateEdit />}></Route>

              <Route path="/contractors" element={<ContractorOverview />} />
              <Route
                path="/orders"
                element={<OrderOverview company={company} customers={customers} serviceCatalogs={serviceCatalogs} />}
              />
              <Route
                path="/services"
                element={<ServicesOverview asPriceList={false} serviceCatalogs={serviceCatalogs} />}
              />
            </Routes>
          </Grid>
        </Grid>
      </Router>
    </SnackbarProvider>
  );
};

export default App;
