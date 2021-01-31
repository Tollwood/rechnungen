import Order from "./Order";
import Helper from "../common/Helper";
import API from "../API";
import ErrorMapper from "../ErrorMapper";
import Link from "../common/Links";
import BillService from "../billing/BillService";

export default class OrderService {
  public static save(
    order: Order,
    continueToNextStep: boolean,
    onSuccess: (order: Order) => void,
    onError: (errors: Map<string, string>) => void
  ): void {
    console.log(order);
    let orderToSave: Order = { ...order };
    let currentRealEstate = order.realEstate;
    orderToSave.distance =
      order.distance === undefined && currentRealEstate !== undefined ? currentRealEstate.distance : order.distance;
    if (continueToNextStep) {
      orderToSave.prevStatus = orderToSave.status;
      orderToSave.status = Helper.nextStatus(order.status);
    }
    orderToSave.billItems = BillService.computeBillItems(orderToSave);
    if (order.id === undefined) {
      console.log(orderToSave);
      API.post("/api/orders", orderToSave)
        .then((result) => result.data)
        .then(onSuccess)
        .catch((error) => ErrorMapper.map(error, onError));
    } else {
      console.log(orderToSave);
      API.put(`/api/orders/${order.id}`, orderToSave)
        .then((result) => result.data)
        .then(onSuccess)
        .catch((error) => ErrorMapper.map(error, onError));
    }
  }

  public static delete(order: Order, onSuccess: () => void) {
    API.delete(`/api/orders/${order.id}`).then(onSuccess);
  }

  public static getOrder(orderLink: Link, onSuccess: (order: Order) => void) {
    API.get(orderLink.href).then((res) => onSuccess(res.data));
  }

  public static getOrdersSync(): Promise<Order[]> {
    return API.get(`api/orders??term=&page=0&size=${100000}&sort=orderId,ASC`).then((res) =>
      res.data.data === undefined ? [] : res.data.data
    );
  }
}
