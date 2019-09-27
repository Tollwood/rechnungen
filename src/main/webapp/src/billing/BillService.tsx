import Order from "../order/Order";
import Employee from "../employees/Employee";
import RealEstate from "../realestate/RealEstate";
import BillItem from "./BillItem";
import Bill from "./Bill";
import OrderService from "../order/OrderService";
import Service from "../order/Service";

export default class BillService {

    static createNewBill(order: Order, services: Service[], realEstate?: RealEstate, technician?: Employee): Bill {

        let billItems: BillItem[] = order.services.map((orderServices: OrderService) => {
            let service: Service | undefined = services.find((service: Service) => service._links.self.href === orderServices._links.service.href);
            return {
                code: service ? service.articleNumber : "",
                amount: orderServices.amount,
                serviceName: service ? service.title : "",
                price: service ? service.price : 0.00
            }
        });


        let allItems: BillItem[] = Array.of(...this.addBasePrice(services), ...this.addDistanceItem(services, realEstate), ...billItems);
        return new Bill("Bill-1234", Date(),
            order,
            allItems,
            realEstate,
            technician
        );
    }

    static addBasePrice(services: Service[]): BillItem[] {
        let service: Service | undefined = services.find((services: Service) => services.articleNumber === '1 A');
        if (service !== undefined) {
            return [new BillItem(service.articleNumber, 1, service.title, service.price)];
        }
        return [];
    }

    static addDistanceItem(services: Service[], realEstate?: RealEstate): BillItem[] {

        let service: Service | undefined = services.find((services: Service) => services.articleNumber === '1 B C D');
        if (service === undefined || realEstate === undefined) {
            return [];
        }
        //=0+WENN(B21<21;0;7,5)+WENN(B21<31;0;7,5)+WENN(B21<41;0;7,5)+WENN(B21>50;(B21-50)*0,75;0)
        let distance = realEstate.distance;
        let price = 0;
        if (distance < 21) {
            price += 7.5;
        }
        if (distance < 31) {
            price += 7.5;
        }
        if (distance < 41) {
            price += 7.5;
        }
        if (distance > 50) {
            price += (distance - 50) * 0.75;
        }
        return [new BillItem(service.articleNumber, 1, service.title, price)];
    }
}