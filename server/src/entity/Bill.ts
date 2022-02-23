import BillItem from "./BillItem";

export default class Bill {
  constructor(public billNo: String, public billDate: String, public billItems: BillItem[]) {}
}
