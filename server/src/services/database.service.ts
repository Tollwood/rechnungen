import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";
import RealEstate from "../entity/RealEstate";
import Contractor from "../entity/Contractor";
import Customer from "../entity/Order";
import Service from "../entity/Service";
import Order from "../entity/Order";
import ServiceCatalog from "../entity/ServiceCatalog";

// Global Variables
export const collections: {
  realEstates?: mongoDB.Collection<RealEstate>;
  serviceCatalogs?: mongoDB.Collection<ServiceCatalog>;
  services?: mongoDB.Collection<Service>;
  customers?: mongoDB.Collection<Customer>;
  contractors?: mongoDB.Collection<Contractor>;
  orders?: mongoDB.Collection<Order>;
} = {};
export let client: mongoDB.MongoClient;
// Initialize Connection
export async function connectToDatabase() {
  dotenv.config();
  client = new mongoDB.MongoClient(process.env.DB_CONN_STRING);

  await client.connect();

  const db: mongoDB.Db = client.db(process.env.DB_NAME);

  const realEstatesCollection: mongoDB.Collection<RealEstate> = db.collection<RealEstate>("realEstates");
  const serviceCatalogsCollection: mongoDB.Collection<ServiceCatalog> = db.collection("serviceCatalogs");
  const servicesCollection: mongoDB.Collection<Service> = db.collection("services");
  const customerCollection: mongoDB.Collection<Customer> = db.collection("customers");
  const contractorsCollection: mongoDB.Collection<Contractor> = db.collection("contractors");
  const ordersCollection: mongoDB.Collection<Order> = db.collection("orders");

  collections.realEstates = realEstatesCollection;
  collections.serviceCatalogs = serviceCatalogsCollection;
  collections.services = servicesCollection;
  collections.customers = customerCollection;
  collections.contractors = contractorsCollection;
  collections.orders = ordersCollection;

  console.log(
    `Successfully connected to database: ${db.databaseName} and collections: ${realEstatesCollection.collectionName}, ${serviceCatalogsCollection.collectionName} , ${servicesCollection.collectionName}, ${customerCollection.collectionName}, ${contractorsCollection.collectionName}, ${ordersCollection.collectionName}`
  );
}
