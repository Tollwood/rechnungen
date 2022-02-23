import "./App.css";
import React, { useState } from "react";
import ContractorOverview from "./contractors/ContractorOverview";
import "semantic-ui/dist/semantic.min.css";
import Grid from "semantic-ui-react/dist/commonjs/collections/Grid";
import { ContentType } from "./start/ContentType";
import AppHeader from "./Header";
import Menu from "./start/Menu";
import RealEstateOverview from "./realestate/RealEstateOverview";
import API from "./API";
import Company from "./contractors/Company";
import ServicesOverview from "./services/ServicesOverview";
import BackendAlerts from "./BackendAlerts";
import Client from "./clientTemplate/ClientTemplate";
import ServiceCatalog from "./order/ServiceCatalog";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RealEstateEdit from "./realestate/RealEstateEdit";
interface AppState {
  activeContent: ContentType;
  company: Company;
}

interface AppProps {}

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
    <BackendAlerts>
      <Router>
        <React.Fragment>
          <Grid centered padded>
            <Grid.Row centered>
              <Grid.Column computer={12} tablet={12} mobile={16}>
                <AppHeader company={company} />
              </Grid.Column>
            </Grid.Row>
            <Menu />
            <Grid.Row>
              <Grid.Column computer={12} tablet={12} mobile={16} textAlign={"center"}>
                <Routes>
                  <Route path="/real-estates" element={<RealEstateOverview />}></Route>
                  <Route path="/real-estates/:id" element={<RealEstateEdit />}></Route>

                  <Route path="/contractors" element={<ContractorOverview />} />
                  <Route
                    path="/services"
                    element={<ServicesOverview asPriceList={false} serviceCatalogs={serviceCatalogs} />}
                  />
                </Routes>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </React.Fragment>
      </Router>
    </BackendAlerts>
  );
};

export default App;
