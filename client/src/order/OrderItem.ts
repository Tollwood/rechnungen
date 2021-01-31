import Link from "../common/Links";
import Service from "./Product";

export default interface OrderItem {
  id?: number;
  amount: number;
  product: Service;
}
