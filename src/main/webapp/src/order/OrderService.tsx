import Order from "./Order";
import API from "../API";
import ErrorMapper from "../ErrorMapper";
import RealEstate from "../realestate/RealEstate";
import Link from "../common/Links";
import Company from "../employees/Company";

export default class OrderService {

    public static save(order: Order, onSuccess: (order: Order) => void, onError: (errors: Map<string, string>) => void): void {

        function companyAsString(company: String | Company): string {
             if ("string" !== typeof  company){
                return  (company as Company)._links.self!.href;
            }else {
                 return company;
             }
        }

        order.company = companyAsString(order.company);
        if (order._links.self === undefined) {
            API.post("/api/order", order)
                .then(result => result.data)
                .then((data: any) => Object.assign(new Order(companyAsString(order.company)), data))
                .then(onSuccess)
                .catch(error => ErrorMapper.map(error, onError));
        } else {
            order.services = [];
            order.billItems = [];
            API.patch(order._links.self.href, order)
                .then(() => {
                    order.services = order.services.map(value => { value.service  = value.service !== ""? value._links.service.href :  value.service ;return value;});
                    API.patch(order._links.self!.href, order)
                        .then(result => result.data)
                        .then((data: any) => Object.assign(new Order(order.company as string), data))
                        .then(onSuccess)
                        .catch(error => ErrorMapper.map(error, onError));
                })
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