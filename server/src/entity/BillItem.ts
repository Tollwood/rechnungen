export default class BillItem {
  constructor(
    public id: number,
    public code: String,
    public orderId: number,
    public serviceName: String,
    public price: number,
    public amount: number
  ) {}
}
