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
    status: OrderStatus = "ORDER_EDIT";
    services: OrderService[] = [];
    _links: {self?: Link, technician?: Link, realEstate?: Link} = {};
}