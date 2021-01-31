import Order from "../order/Order";
import { Address } from "../common/Address";

export default class Bill {
  billNumber: String;
  billDate: String;
  order: Order;

  constructor(billNumber: String, billDate: String, order: Order) {
    this.billNumber = billNumber;
    this.billDate = billDate;
    this.order = order;
  }

  getRealEstateAddress(): Address {
    if (this.order.realEstateAddress != null) {
      return this.order.realEstateAddress;
    }
    if (this.order.realEstate?.address) {
      return this.order.realEstate.address;
    }
    return new Address();
  }
}
