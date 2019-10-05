import OrderService from "./OrderService";
import Link from "../common/Links";
import {OrderStatus} from "./OrderStatus";

export default class Order {

    orderId?: string;
    utilisationUnit?: string;
    name?: string;
    location?: string;
    phoneNumber?: string;
    technician?: string;
    realEstate?: string;
    firstAppointment?: string;
    secondAppointment?: string;
    smallOrder: boolean = false;
    includeKmFee: boolean = true;
    status: OrderStatus = "ORDER_EDIT";
    services: OrderService[] = [];
    billDate: string = '';
    billNo: string = '';
    paymentRecievedDate: string = '';
    _links: {self?: Link, technician?: Link, realEstate?: Link} = {};
}