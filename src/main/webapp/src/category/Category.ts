import Link from "../common/Links";
import Company from "../employees/Company";
import Service from "../order/Service";

export default class Category {
    name: string = "";
    company: String | Company;
    active: boolean = true;
    services: Service[] = [];
    _links: { self?: Link, services?: Link } = {};

    constructor(company: String) {
        this.company = company;
    }
}