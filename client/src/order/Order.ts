import OrderItem from "./OrderItem";
import { OrderStatus } from "./OrderStatus";
import BillItem from "../billing/BillItem";
import { Address } from "../common/Address";
import Contractor from "../contractors/Contractor";
import RealEstate from "../realestate/RealEstate";
import Customer from "../customers/Customer";

export default interface Order {
  _id?: string;
  orderId?: string;
  contractor?: Contractor;
  realEstate?: RealEstate;
  smallOrder: boolean;
  contactDetails?: ContactDetails;
  firstAppointment?: Date | null;
  secondAppointment?: Date | null;
  taxRate: number;
  includeKmFee: boolean;
  distance?: number;
  canceled: boolean;
  status: OrderStatus;
  prevStatus?: OrderStatus;
  orderItems: OrderItem[];
  billItems?: BillItem[];
  billDate: string;
  billNo: string;
  paymentRecievedDate: string;
  sum?: number;
  customer: Customer;
  serviceCatalogId?: string;
}

interface ContactDetails {
  utilisationUnit?: string;
  name?: string;
  location?: string;
  phoneNumber?: string;
}
