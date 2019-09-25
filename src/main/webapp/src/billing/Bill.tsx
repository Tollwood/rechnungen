import Order from "../order/Order";
import Employee from "../employees/Employee";
import RealEstate from "../realestate/RealEstate";
import BillItem from "./BillItem";

export default class Bill {
    billNumber: String;
    billDate: String;
    order: Order;
    technician: Employee;
    realEstate: RealEstate;
    billItems: BillItem[];

    constructor(billNumber: String, billDate: String, order: Order, technician: Employee, realEstate: RealEstate, billItems: BillItem[]) {
        this.billNumber = billNumber;
        this.billDate = billDate;
        this.order = order;
        this.technician = technician;
        this.realEstate = realEstate;
        this.billItems = billItems
    }
}