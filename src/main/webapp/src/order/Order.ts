import OrderService from "./OrderService";
import Link from "../common/Links";

export default class Order {

    orderId?: string;
    utilisationUnit?: string;
    name?: string;
    location?: string;
    phoneNumber?: string;
    technician?: string;
    realEstate?: string;
    services: OrderService[] = [];
    _links: {self?: Link, technician?: Link, realEstate?: Link} = {};
}