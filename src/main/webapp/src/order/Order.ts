import {Links} from "../common/Links";
import OrderService from "./OrderService";

export default class Order {

    orderId?: string;
    utilisationUnit?: string;
    name?: string;
    location?: string;
    phoneNumber?: string;
    technician?: string;
    orderServices: OrderService[] = [];
    _links?: Links;
}