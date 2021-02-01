import { privateDecrypt } from "crypto";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { Address } from "./Address";
import { Order } from "./Order";

@Entity()
export class RealEstate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column((type) => Address, { prefix: "" })
  address: Address;

  @Column()
  distance: number;

  @Column()
  name: string;

  @OneToMany(() => Order, (order) => order.realEstate, { eager: false })
  orders: Promise<Order[]>;
}
