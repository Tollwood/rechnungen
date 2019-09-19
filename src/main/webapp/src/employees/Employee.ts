import Link from "../common/Links";
import {Address} from "../common/Address";

export default class Employee {
    id?: bigint;
    firstName: string = "";
    lastName: string = "";
    taxIdent: string = "";
    technicianId: string = "";
    address: Address = new Address();
    _links: {self?: Link} = {};
}