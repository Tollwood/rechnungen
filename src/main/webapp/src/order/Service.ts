import Link from "../common/Links";

export default interface Service {
    articleNumber: string;
    title: string;
    _links: {self: Link}
}