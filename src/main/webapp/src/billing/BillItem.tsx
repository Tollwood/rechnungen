export default class BillItem {
    code: String;
    amount: number;
    serviceName: String;
    price: number;
    custom: boolean;

    constructor(code: String, amount: number, serviceName: String, price: number, custom: boolean) {
        this.code = code;
        this.amount = amount;
        this.serviceName = serviceName;
        this.price = price;
        this.custom = custom;
    }
}