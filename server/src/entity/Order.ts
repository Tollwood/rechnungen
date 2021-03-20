import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, PrimaryColumn, Tree } from "typeorm";
import { Address } from "./Address";
import BillItem from "./BillItem";
import Employee from "./Employee";
import OrderItem from "./OrderItem";
import { RealEstate } from "./RealEstate";

export enum OrderStatus {
  ORDER_EDIT = "ORDER_EDIT",
  ORDER_EXECUTE = "ORDER_EXECUTE",
  ORDER_BILL = "ORDER_BILL",
  ORDER_BILL_RECIEVED = "ORDER_BILL_RECIEVED",
  PAYMENT_RECIEVED = "PAYMENT_RECIEVED",
}

@Entity({ name: "order_table" })
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  orderId: String;

  @ManyToOne(() => RealEstate, (realEstate) => realEstate.orders, { eager: true })
  realEstate: RealEstate;

  @ManyToOne(() => Employee, (employee) => employee.orders, { eager: true })
  employee: Employee;

  @Column()
  firstAppointment: String;

  @Column({ nullable: true })
  secondAppointment?: String;

  @Column({ nullable: true })
  utilisationUnit?: String;
  @Column({ nullable: true })
  name?: String;
  @Column({ nullable: true })
  location?: String;

  @Column({ nullable: true })
  phoneNumber?: String;
  @Column()
  smallOrder: Boolean = false;
  @Column()
  clientName: String;

  @Column((type) => Address)
  client: Address;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order, {
    eager: true,
  })
  orderItems: OrderItem[];

  @OneToMany(() => BillItem, (billItem) => billItem.order, {
    eager: true,
  })
  billItems: BillItem[];

  @Column()
  serviceCatalogId: number;

  @Column({
    type: "enum",
    enum: OrderStatus,
    default: OrderStatus.ORDER_EDIT,
  })
  status: OrderStatus = OrderStatus.ORDER_EDIT;

  @Column({
    type: "enum",
    enum: OrderStatus,
    nullable: true,
  })
  prevStatus?: OrderStatus;

  @Column()
  includeKmFee: Boolean = true;

  @Column({ nullable: true })
  billNo?: String;
  @Column({ nullable: true })
  billDate?: String;
  @Column({ nullable: true })
  paymentRecievedDate?: String;
  @Column()
  distance: number = 0;
  @Column({ type: "float" })
  taxRate: number;
  @Column()
  canceled: Boolean = false;

  @Column((type) => Address, { prefix: "realEstate" })
  realEstateAddress?: Address;
}
