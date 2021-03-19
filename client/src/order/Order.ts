import OrderItem from "./OrderItem";
import { OrderStatus } from "./OrderStatus";
import BillItem from "../billing/BillItem";
import { Address } from "../common/Address";
import Employee from "../employees/Employee";
import RealEstate from "../realestate/RealEstate";

export default class Order {
  id?: number;
  orderId?: string;
  utilisationUnit?: string;
  name?: string;
  location?: string;
  phoneNumber?: string;
  employee?: Employee;
  realEstate?: RealEstate;
  distance?: number;
  taxRate: number = 0.16;
  firstAppointment?: string;
  secondAppointment?: string;
  smallOrder: boolean = false;
  includeKmFee: boolean = true;
  canceled: boolean = false;
  status: OrderStatus = "ORDER_EDIT";
  prevStatus?: OrderStatus;
  orderItems: OrderItem[] = [];
  billItems?: BillItem[] = [];
  billDate: string = "";
  billNo: string = "";
  paymentRecievedDate: string = "";
  sum: number = 0;
  realEstateAddress?: Address = new Address();
  clientName?: string;
  client: Address = new Address();
  serviceCatalogId?: number;
}
