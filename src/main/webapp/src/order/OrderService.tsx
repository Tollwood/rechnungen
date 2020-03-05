import Order from "./Order";
import Helper from "../common/Helper";
import API from "../API";
import ErrorMapper from "../ErrorMapper";
import RealEstate from "../realestate/RealEstate";
import Link from "../common/Links";

export default class OrderService {

    public static save(order: Order, realEstates: RealEstate[], continueToNextStep: boolean, onSuccess: (order: Order) => void, onError:(errors: Map<string,string>)=>void): void {
        let orderToSave: Order = Object.assign({}, order);
        let currentRealEstate = this.getCurrentRealEstate(order, realEstates);
        orderToSave.distance = order.distance === undefined && currentRealEstate !== undefined ? currentRealEstate.distance : order.distance;
        if (continueToNextStep) {
            orderToSave.prevStatus = orderToSave.status;
            orderToSave.status = Helper.nextStatus(order.status);
        }
        if (order._links.self === undefined) {
            API.post("/api/order", orderToSave)
                .then(result => result.data)
                .then((data: any) => Object.assign(new Order(), data))
                .then(onSuccess)
                .catch(error => ErrorMapper.map(error, onError));
        } else {
            API.patch(order._links.self.href, orderToSave)
                .then(result => result.data)
                .then((data: any) => Object.assign(new Order(), data))
                .then(onSuccess)
                .catch(error => ErrorMapper.map(error, onError));
        }
    }

    public static delete(order: Order, onSuccess: () => void) {
        API.delete(order._links.self!.href).then(onSuccess);
    }

    public static getCurrentRealEstate(order: Order, realEstates: RealEstate[]) {
        return realEstates.find((realEstate: RealEstate) => realEstate._links.self!.href === order.realEstate);
    }

    public static getOrder(orderLink: Link, onSuccess: (order: Order) => void) {
        API.get(orderLink.href).then(res => onSuccess(res.data))
    }

    public static getOrdersSync(): Promise<Order[]> {
         return API.get("api/order")
            .then(res => res.data._embedded === undefined ? [] : res.data._embedded.order)
    }
}