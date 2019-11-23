import Order from "../order/Order";
import Employee from "../employees/Employee";
import RealEstate from "../realestate/RealEstate";
import Bill from "./Bill";
import Service from "../order/Service";

export default class BillService {

    static createNewBill(billNo: string, billDate: string, order: Order, services: Service[], realEstate?: RealEstate, technician?: Employee): Bill {

        return new Bill(billNo, billDate,
            order,
            realEstate,
            technician
        );
    }
}