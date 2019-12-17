import Order from "../order/Order";
import Employee from "../employees/Employee";
import RealEstate from "../realestate/RealEstate";
import {Address} from "../common/Address";

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

    getRealEstateAddress():Address{
        if(this.order.realEstateAddress != null){
            return this.order.realEstateAddress;
        }
        if(this.realEstate != null && this.realEstate.address != null){
            return this.realEstate.address;
        }
        return new Address();
    }
}