import { Document, ObjectId } from "mongodb";
import { Address } from "./Address";

export default class RealEstate implements Document {
  constructor(public address: Address, public distance: number, public name: string, public _id?: ObjectId) {}
}
