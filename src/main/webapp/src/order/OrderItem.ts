import Link from "../common/Links";

export default interface OrderItem {
    amount: number;
    service: string;
    _links: {service: Link}
}