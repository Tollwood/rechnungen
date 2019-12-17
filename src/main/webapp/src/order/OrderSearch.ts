import OrderService from "./OrderService";
import Link from "../common/Links";
import {OrderStatus} from "./OrderStatus";
import BillItem from "../billing/BillItem";
import Employee from "../employees/Employee";
import RealEstate from "../realestate/RealEstate";
import {Address} from "../common/Address";

export default class OrderSearch {

    orderId?: string;
    utilisationUnit?: string;
    name?: string;
    location?: string;
    phoneNumber?: string;
    technician?: Employee;
    realEstate?: RealEstate;
    distance?: number;
    firstAppointment?: string;
    secondAppointment?: string;
    smallOrder: boolean = false;
    includeKmFee: boolean = true;
    status: OrderStatus = "ORDER_EDIT";
    prevStatus?: OrderStatus;
    services: OrderService[] = [];
    billItems: BillItem[] = [];
    billDate: string = '';
    billNo: string = '';
    paymentRecievedDate: string = '';
    sum: number = 0;
    realEstateAddress?: Address;
    _links: { self?: Link, technician?: Link, realEstate?: Link } = {};

    public getRealEstateAddress(): Address {
        if (this.realEstateAddress != null) {
            return this.realEstateAddress;
        }
        if(this.realEstate != null && this.realEstate.address != null){
            return this.realEstate.address;
        }
        return new Address();
    }
}