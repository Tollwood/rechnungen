import OrderService from "./OrderService";
import Link from "../common/Links";
import {OrderStatus} from "./OrderStatus";
import BillItem from "../billing/BillItem";

export default class Order {

    orderId?: string;
    utilisationUnit?: string;
    name?: string;
    location?: string;
    phoneNumber?: string;
    technician?: string;
    realEstate?: string;
    distance?: number;
    firstAppointment?: string;
    secondAppointment?: string;
    smallOrder: boolean = false;
    includeKmFee: boolean = true;
    status: OrderStatus = "ORDER_EDIT";
    prevStatus?: OrderStatus ;
    services: OrderService[] = [];
    billItems: BillItem[] = [];
    billDate: string = '';
    billNo: string = '';
    paymentRecievedDate: string = '';
    sum: number = 0;
    _links: {self?: Link, technician?: Link, realEstate?: Link} = {};
}