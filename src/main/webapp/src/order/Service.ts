import Link from "../common/Links";

export default class Service {
    articleNumber: string = "";
    title: string = "";
    price: number = 0;
    selectable: boolean =true;
    serviceCatalogId:number= -1;
    _links: {self?: Link} = {}
}