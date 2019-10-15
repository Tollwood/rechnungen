import Link from "../common/Links";

export default class Service {
    articleNumber: string = "";
    title: string = "";
    price: number = 0;
    selectable: boolean =true;
    _links: {self?: Link} = {}
}