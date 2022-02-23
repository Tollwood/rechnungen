import { Document, ObjectId } from "mongodb";

export default class ServiceCatalog implements Document {
  constructor(public name: string, public id: number, public _id?: ObjectId) {}
}
