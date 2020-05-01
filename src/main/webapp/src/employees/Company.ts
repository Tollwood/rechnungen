import Link from "../common/Links";
import {Address} from "../common/Address";
import BankDetails from "./BankDetails";

export default class Company {
    name: string = "";
    shortName: string = "";
    address: Address = new Address();
    billNo: number = 0;
    logo: string = "";
    thankYouImage: string = "";
    phone: string = "";
    email: string = "";
    bankDetails: BankDetails = new BankDetails();
    realEstateSupport: boolean = false;
    employeeSupport: boolean = false;
    statisticSupport: boolean = false;
    billingSupport: boolean = false;
    customerSupport: boolean = false;
    publicOrder : boolean = false;
    homeHeader: string = "";
    homeFooter: string = "";
    _links: {self?: Link} = {};
}