import "reflect-metadata";
import * as express from "express";
import * as path from "path";

import { collections, connectToDatabase } from "./services/database.service";

import { addServiceSubResource } from "./routes/serviceCatalog.router";
import { companyRouter } from "./routes/company.router";
import { RouterFactory } from "./routes/RouterFactory";
import RealEstate from "./entity/RealEstate";
import { Document, Filter } from "mongodb";
import Customer from "./entity/Order";
import Contractor from "./entity/Contractor";
import Order from "./entity/Order";
import ServiceCatalog from "./entity/ServiceCatalog";

const realEstateFilter = (term: string): Filter<RealEstate> => {
  const likeTermRegEx = new RegExp(`^${term}`, "i");
  return {
    $or: [
      { name: { $regex: likeTermRegEx } },
      { "address.street": { $regex: likeTermRegEx } },
      { "address.city": { $regex: likeTermRegEx } },
    ],
  } as Filter<RealEstate>;
};

const customerFilter = (term: string): Filter<Customer> => {
  return {};
};

const orderFilter = (term: string): Filter<Order> => {
  return {};
};

const contractorFilter = (term: string): Filter<Contractor> => {
  return {};
};

const serviceCatalogFilterFn = () => {
  return {} as Filter<ServiceCatalog>;
};

connectToDatabase()
  .then(async (connection) => {
    // create express app
    const app = express();

    const routerFactory = new RouterFactory();

    const serviceCatalogRouter = routerFactory.createCrudRouter<ServiceCatalog>(
      collections.serviceCatalogs,
      serviceCatalogFilterFn
    );
    addServiceSubResource(serviceCatalogRouter);
    app.use("/api/service-catalogs", serviceCatalogRouter);
    app.use("/api/companies", companyRouter);

    app.use("/api/real-estates", routerFactory.createCrudRouter(collections.realEstates, realEstateFilter));
    app.use("/api/customers", routerFactory.createCrudRouter(collections.customers, customerFilter));
    app.use("/api/contractors", routerFactory.createCrudRouter(collections.contractors, contractorFilter));
    app.use("/api/orders", routerFactory.createCrudRouter(collections.orders, orderFilter));

    app.use(express.static(path.join(__dirname, "public")));
    app.use((req, res, next) => {
      res.sendFile(path.join(__dirname, "public", "index.html"));
    });

    // run app
    app.listen(3001);

    console.log("Express application is up and running on port 3001");
  })
  .catch((error) => console.log("TypeORM connection error: ", error));
