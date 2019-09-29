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
        let now = new Date();
        var options = { year: 'numeric', month: 'numeric', day: 'numeric' };

        console.log(now.toLocaleDateString('de-DE', options));

        return new Bill("Bill-1234", now.toLocaleDateString('de-DE', options),
            order,
            allItems,
            realEstate,
            technician
        );
    }

    static addBasePrice(services: Service[]): BillItem[] {
        let service: Service | undefined = services.find((services: Service) => services.articleNumber === '1A');
        if (service !== undefined) {
            return [new BillItem(service.articleNumber, 1, service.title, service.price)];
        }
        return [];
    }

    static addDistanceItem(services: Service[], realEstate?: RealEstate): BillItem[] {

        if (realEstate === undefined) {
            return [];
        }

        let distance = realEstate.distance;
        let price = 0;
        if (distance > 20 && distance <= 30) {
            return this.getDistanceItem(services, '1B');
        }
        if (distance > 30 && distance <= 40) {
            return this.getDistanceItem(services, '1C');
        }
        if (distance > 40 && distance <= 50) {
            return this.getDistanceItem(services, '1D');
        }
        if (distance > 50) {
            return this.getDistanceItem(services, '1E', distance * 0.75);
        }
        return [];
    }

    private static getDistanceItem(services: Service[],  code: string, distance :number = 1) {
        let service: Service | undefined = services.find((services: Service) => services.articleNumber === code);
        if(service === undefined){
            return [];
        }
        return [new BillItem(service.articleNumber, 1, service.title, service.price * distance)];
    }
}