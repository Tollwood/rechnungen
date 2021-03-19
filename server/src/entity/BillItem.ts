import { Column, Entity, ManyToOne } from "typeorm";
import { Order } from "./Order";

@Entity()
export default class BillItem {
  @Column({ primary: true })
  code: String;
  @Column({ primary: true })
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
