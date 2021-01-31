import Link from "../common/Links";
import { Address } from "../common/Address";
import BankDetails from "./BankDetails";

export default class Company {
  name: string = "";
  address: Address = new Address();
  billNo: number = 0;
  logo: string = "";
  phone: string = "";
  email: string = "";
  bankDetails: BankDetails = new BankDetails();
}
