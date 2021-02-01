import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Address } from "./Address";
import BankDetails from "./BankDetails";
import { Order } from "./Order";

@Entity()
export default class Employee {
  @PrimaryGeneratedColumn()
  id: Number;

  @Column()
  firstName: String;

  @Column()
  lastName: String;
  @Column((type) => Address, { prefix: "" })
  address: Address;
  @Column()
  taxIdent: String;
  @Column()
  technicianId: String;
  @Column()
  email: String;
  @Column()
  phone: String;
  @Column((type) => BankDetails, { prefix: "" })
  bankDetails: BankDetails;

  @OneToMany(() => Order, (order) => order.realEstate, { eager: false })
  orders: Promise<Order[]>;
}
