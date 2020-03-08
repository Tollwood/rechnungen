import Order from "../order/Order";
import Employee from "../employees/Employee";
import RealEstate from "../realestate/RealEstate";
import Bill from "./Bill";
import Service from "../order/Service";

export default class BillService {

    static createNewBill(billNo: string, billDate: string, order: Order, services: Service[], realEstate?: RealEstate, technician?: Employee): Bill {
        if(order.canceled){
            order.billItems.forEach(value =>  value.price > 0 ? value.price *= -1: null);
        }
        else {
            order.billItems.forEach(value =>  value.price < 0 ? value.price *= -1: null);
        }

        return new Bill(billNo, billDate,
            order,
            realEstate,
            technician
        );
    }
}