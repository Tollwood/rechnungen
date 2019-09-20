import Link from "../common/Links";

export default interface OrderService {
    amount: number;
    service: string;
    _links: {service: Link}
}