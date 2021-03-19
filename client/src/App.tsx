import "./App.css";
import React, { useState } from "react";
import EmployeeOverview from "./employees/EmployeeOverview";
import "semantic-ui/dist/semantic.min.css";
import Grid from "semantic-ui-react/dist/commonjs/collections/Grid";
import { ContentType } from "./start/ContentType";
import AppHeader from "./Header";
import OrderEdit from "./order/OrderEdit";
import { Menu } from "./start/Menu";
import RealEstateOverview from "./realestate/RealEstateOverview";
import OrderOverview from "./order/OrderOverview";
import API from "./API";
import Company from "./employees/Company";
import ServicesOverview from "./services/ServicesOverview";
import Link from "./common/Links";
import BackendAlerts from "./BackendAlerts";
import StatisticOverview from "./statistic/StatisticOverview";
import Client from "./clientTemplate/ClientTemplate";
import ProductCatalog from "./order/ServiceCatalog";
import Order from "./order/Order";

interface AppState {
  activeOrder?: Link;
  activeContent: ContentType;
  company: Company;
}

interface AppProps {}

const App: React.FC = () => {
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
      <React.Fragment>
        <Grid centered padded>
          <Grid.Row centered>
            <Grid.Column computer={12} tablet={12} mobile={16}>
              <AppHeader company={company} />
            </Grid.Column>
          </Grid.Row>
          <Menu onMenuChanges={setActiveContent} activeContent={activeContent} />
          <Grid.Column computer={12} tablet={12} mobile={16}>
            <div id={"content-container"}>
              {activeContent === ContentType.EMPLOYEE ? <EmployeeOverview /> : null}
              {activeContent === ContentType.ORDER ? (
                <OrderOverview company={company} clientTemplates={clients} serviceCatalogs={productCatalogs} />
              ) : null}
              {activeContent === ContentType.BILL ? <h1>Rechnungen</h1> : null}
              {activeContent === ContentType.STATISTICS ? <StatisticOverview /> : null}
              {activeContent === ContentType.REAL_ESTATE ? <RealEstateOverview /> : null}
              {activeContent === ContentType.SERVICES ? (
                <ServicesOverview asPriceList={false} serviceCatalogs={productCatalogs} />
              ) : null}
              {activeContent === ContentType.ORDER_DETAILS ? (
                <OrderEdit
                  serviceCatalogs={productCatalogs}
                  company={company}
                  clientTemplates={clients}
                  onSave={closeOrder}
                  onCancelEdit={closeOrder}
                  onDelete={closeOrder}
                  orderId={activeOrder?.id}
                />
              ) : null}
            </div>
          </Grid.Column>
        </Grid>
      </React.Fragment>
    </BackendAlerts>
  );
};

export default App;
