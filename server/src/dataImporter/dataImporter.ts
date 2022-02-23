var ObjectID = require("mongodb").ObjectID;
var serviceCatalogFile = require("./service-catalogs.json");
var servicesFile = require("./services.json");
var realEstateFile = require("./realEstates.json");
var customersFile = require("./customers.json");
var contractorsFile = require("./contractors.json");
var ordersFile = require("./orders.json");

import { connectToDatabase, collections } from "../services/database.service";

// create connection with database
// note that it's not active database connection
// TypeORM creates connection pools and uses them for your requests

connectToDatabase().then(async (connection) => {
  console.log(`importing service catalogs`);
  const serviceCatalogs = serviceCatalogFile.map((elem) => {
    elem._id = ObjectID(elem._id);
    collections.serviceCatalogs.insertOne(elem, function (err, res) {
      //collection
      if (err) throw err;
      console.log(`${elem.name} imported`);
    });
    return elem;
  });
  console.log(`importing service catalogs completed`);
  console.log(`importing services`);
  const services = await servicesFile.map((elem) => {
    elem._id = ObjectID(elem._id);
    elem.serviceCatalogId = serviceCatalogs.find((s) => s.id === elem.serviceCatalogId)._id;
    collections.services.insertOne(elem, function (err, res) {
      //collection
      if (err) throw err;
      console.log(`${elem.title} imported`);
    });
  });
  console.log(`importing services completed`);
  console.log(`importing realEstates`);
  const realEstates = await realEstateFile.map((elem) => {
    elem._id = ObjectID(elem._id);

    collections.realEstates.insertOne(elem, function (err, res) {
      //collection
      if (err) throw err;
      console.log(`${elem.name} imported`);
    });
  });
  console.log(`importing realEstates completed`);

  console.log(`importing customers`);
  const customers = await customersFile.map((elem) => {
    elem._id = ObjectID(elem._id);
    elem.serviceCatalogId = serviceCatalogs.find((s) => s.id === elem.serviceCatalogId)._id;
    collections.customers.insertOne(elem, function (err, res) {
      //collection
      if (err) throw err;
      console.log(`${elem.name} imported`);
    });
  });
  console.log(`importing customers completed`);

  console.log(`importing contractors`);
  const contractors = await contractorsFile.map((elem) => {
    elem._id = ObjectID(elem._id);

    collections.contractors.insertOne(elem, function (err, res) {
      //collection
      if (err) throw err;
      console.log(`${elem.name} imported`);
    });
  });
  console.log(`importing contractors completed`);

  console.log(`importing orders`);
  const orders = await ordersFile.map((elem) => {
    elem._id = ObjectID(elem._id);

    collections.orders.insertOne(elem, function (err, res) {
      //collection
      if (err) throw err;
      console.log(`${elem.name} imported`);
    });
  });
  console.log(`importing orders completed`);
});
