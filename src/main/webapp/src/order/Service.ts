import Link from "../common/Links";

export default class Service {
    articleNumber: string = "";
    title: string = "";
    description: string = "";
    price: number = 0;
    selectable: boolean =true;
    image: String = "";
    _links: {self?: Link, categories?: Link} = {};
}