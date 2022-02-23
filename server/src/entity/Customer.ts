import { ObjectId } from "mongodb";
import { Address } from "./Address";

export default class Customer {
  constructor(public name: string, public address: Address, public serviceCatalogId: number, public _id?: ObjectId) {}
}
