import Link from "../common/Links";
import Service from "./Service";

export default interface OrderItem {
  id?: number;
  amount: number;
  service: Service;
}
