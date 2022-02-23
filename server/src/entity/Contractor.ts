import { ObjectId } from "mongodb";
import { Address } from "./Address";
import BankDetails from "./BankDetails";

export default class Contractor {
  constructor(
    public id: Number,
    public firstName: String,
    public lastName: String,
    public address: Address,
    public taxIdent: String,
    public technicianId: String,
    public phone: String,
    public bankDetails: BankDetails,
    public _id?: ObjectId
  ) {}
}
