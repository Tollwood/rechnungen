import Order from "../order/Order";
import Employee from "../employees/Employee";
import RealEstate from "../realestate/RealEstate";

export default class Bill {
    billNumber: String;
    billDate: String;
    order: Order;
    technician?: Employee;
    realEstate?: RealEstate;

    constructor(billNumber: String, billDate: String, order: Order, realEstate?: RealEstate, technician?: Employee) {
        this.billNumber = billNumber;
        this.billDate = billDate;
        this.order = order;
        this.technician = technician;
        this.realEstate = realEstate;
    }
}