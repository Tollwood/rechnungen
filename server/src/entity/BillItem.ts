import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./Order";

@Entity()
export default class BillItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: String;
  @Column()
  orderId: number;
  @Column()
  serviceName: String;

  @Column({ type: "float" })
  price: number;

  @Column()
  amount: number;

  @ManyToOne(() => Order, (order) => order.billItems, {
    eager: false,
  })
  order: Promise<Order>;
}
