import Link from "../common/Links";
import Service from "../order/Service";

class CategoryServiceOrder {
    index: number = -1;
    href: string = "";
}

export default class Category {
    name: string = "";
    active: boolean = true;
    services: Service[] = [];
    categoryServiceOrder: CategoryServiceOrder[] = [];
    _links: { self?: Link, services?: Link } = {};
}