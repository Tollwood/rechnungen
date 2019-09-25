import Link from "../common/Links";

export default interface Service {
    articleNumber: string;
    title: string;
    price: number;
    _links: {self: Link}
}