import { table } from "console";

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import OrderItem from "./OrderItem";

@Entity({ name: "service" })
export class Product {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  serviceCatalogId: Number;

  @Column()
  articleNumber: String;

  @Column()
  title: String;

  @Column({ type: "float" })
  price: number;

  @Column()
  selectable: boolean;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.product, { lazy: true })
  orderItem: Promise<OrderItem[]>;
}
