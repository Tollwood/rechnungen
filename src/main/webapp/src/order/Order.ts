import OrderService from "./OrderService";
import Employee from "../employees/Employee";
import Link from "../common/Links";
import RealEstate from "../realestate/RealEstate";

export default class Order {

    orderId?: string;
    utilisationUnit?: string;
    name?: string;
    location?: string;
    phoneNumber?: string;
    technician?: Employee;
    realEstate?: string;
    services: OrderService[] = [];
    _links: {self?: Link, technician?: Link, realEstate?: Link} = {};
}