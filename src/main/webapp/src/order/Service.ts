import Link from "../common/Links";
import Company from "../employees/Company";

export default class Service {
    articleNumber: string = "";
    title: string = "";
    description: string = "";
    price: number = 0;
    selectable: boolean =true;
    company: String | Company;
    image: String = "";
    _links: {self?: Link, categories?: Link} = {};

    constructor(company: String) {
        this.company = company;
    }
}