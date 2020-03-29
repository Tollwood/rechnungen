import Service from "./order/Service";

export default interface OrderCount {
    amount: number,
    index: number,
    service: Service
}