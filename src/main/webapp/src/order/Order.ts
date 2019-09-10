import {Links} from "../common/Links";
import OrderService from "./OrderService";
import Employee from "../employees/Employee";

export default class Order {

    orderId?: string;
    utilisationUnit?: string;
    name?: string;
    location?: string;
    phoneNumber?: string;
    technician?: Employee;
    services: OrderService[] = [];
    _links?: Links;
}