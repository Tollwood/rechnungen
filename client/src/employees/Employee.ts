import { Address } from "../common/Address";
import BankDetails from "./BankDetails";

export default class Employee {
  id?: number;
  firstName: string = "";
  lastName: string = "";
  taxIdent: string = "";
  email: string = "";
  phone: string = "";
  technicianId: string = "";
  address: Address = new Address();
  bankDetails: BankDetails = new BankDetails();
}
