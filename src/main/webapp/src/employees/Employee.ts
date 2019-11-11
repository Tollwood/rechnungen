import Link from "../common/Links";
import {Address} from "../common/Address";
import BankDetails from "./BankDetails";

export default class Employee {
    id?: bigint;
    firstName: string = "";
    lastName: string = "";
    taxIdent: string = "";
    email: string = "";
    phone: string = "";
    technicianId: string = "";
    address: Address = new Address();
    bankDetails: BankDetails = new BankDetails();
    _links: {self?: Link} = {};
}