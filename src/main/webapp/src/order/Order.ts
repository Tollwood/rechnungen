import OrderItem from "./OrderItem";
import Link from "../common/Links";
import {OrderStatus} from "./OrderStatus";
import BillItem from "../billing/BillItem";
import {Address} from "../common/Address";

export default class Order {

    orderId?: string;
    utilisationUnit?: string;
    name?: string;
    location?: string;
    phoneNumber?: string;
    technician?: string;
    realEstate?: string;
    distance?: number;
    taxRate: number = 0.19;
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
    realEstateAddress: Address= new Address();
    _links: {self?: Link, technician?: Link, realEstate?: Link} = {};
}