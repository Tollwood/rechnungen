export default class BillItem {
    code: String;
    amount: number;
    serviceName: String;
    price: number;

    constructor(code: String, amount: number, serviceName: String, price: number) {
        this.code = code;
        this.amount = amount;
        this.serviceName = serviceName;
        this.price = price
    }
}