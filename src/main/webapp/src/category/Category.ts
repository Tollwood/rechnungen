import Link from "../common/Links";
import Service from "../order/Service";

export default class Category {
    name: string = "";
    active: boolean = true;
    services: Service[] = [];
    _links: { self?: Link, services?: Link } = {};
}