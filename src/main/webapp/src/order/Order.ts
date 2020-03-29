import OrderItem from "./OrderItem";
import Link from "../common/Links";
import {OrderStatus} from "./OrderStatus";
import BillItem from "../billing/BillItem";
import {Address} from "../common/Address";
import Customer from "../customer/Customer";

export default class Order {

    orderId?: string;
    utilisationUnit?: string;
    name?: string;
    location?: string;
    phoneNumber?: string;
    technician?: string;
    realEstate?: string;
    distance: number = 0;
    firstAppointment?: string;
    secondAppointment?: string;
    smallOrder: boolean = false;
    includeKmFee: boolean = true;
    canceled: boolean = false;
    status: OrderStatus = "ORDER_EDIT";
    prevStatus?: OrderStatus ;
    services: OrderItem[] = [];
    billItems: BillItem[] = [];
    billDate: string = '';
    billNo: string = '';
    paymentRecievedDate: string = '';
    sum: number = 0;
    company: String;
    customer: Customer = new Customer();
    realEstateAddress: Address= new Address();
    _links: {self?: Link, technician?: Link, realEstate?: Link} = {};

    constructor(company: String) {
        this.company = company;

    }

}