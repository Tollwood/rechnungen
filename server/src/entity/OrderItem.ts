import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./Order";
import { Product } from "./Product";

@Entity()
export default class OrderItem {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  amount: number;

  @ManyToOne(() => Product, (product) => product.orderItem, { eager: true })
  product: Product;

  @ManyToOne(() => Order, (order) => order.orderItems, {
    eager: false,
  })
  order: Promise<Order>;

  @Column()
  orderId: number;
}
