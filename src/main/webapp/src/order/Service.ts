import Link from "../common/Links";

export default class Service {
    articleNumber: string = "";
    title: string = "";
    description: string = "";
    price: number = 0;
    selectable: boolean =true;
    company: String;
    image: String = "/products/placeholder.jpg";
    _links: {self?: Link} = {};

    constructor(company: String) {
        this.company = company;
    }
}