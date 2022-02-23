import { ObjectId } from "mongodb";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, PrimaryColumn, Tree } from "typeorm";
import { Address } from "./Address";
import Bill from "./Bill";
import BillItem from "./BillItem";
import Contractor from "./Contractor";
import OrderItem from "./OrderItem";
import RealEstate from "./RealEstate";

export enum OrderStatus {
  ORDER_EDIT = "ORDER_EDIT",
  ORDER_EXECUTE = "ORDER_EXECUTE",
  ORDER_BILL = "ORDER_BILL",
  ORDER_BILL_RECIEVED = "ORDER_BILL_RECIEVED",
  PAYMENT_RECIEVED = "PAYMENT_RECIEVED",
}

export default class Customer {
  constructor(
    public id: number,
    public orderId: String,
    public firstAppointment: String,
    public secondAppointment?: String,
    public utilisationUnit?: String,
    public name?: String,
    public location?: String,
    public phoneNumber?: String,
    public smallOrder: Boolean = false,
    public status: OrderStatus = OrderStatus.ORDER_EDIT,
    public prevStatus?: OrderStatus,
    public serviceCatalogId: number,
    public includeKmFee: Boolean = true,
    public distance: number = 0,
    public taxRate: number,
    public canceled: Boolean = false,
    public paymentRecievedDate?: String,

    public realEstate: RealEstate,
    public contractor: Contractor,
    public customer: Customer,
    public bill: Bill,
    public _id?: ObjectId) {}
}

  

  orderItems: OrderItem[];
  
  
}
