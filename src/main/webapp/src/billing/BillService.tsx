import Order from "../order/Order";
import Employee from "../employees/Employee";
import RealEstate from "../realestate/RealEstate";
import BillItem from "./BillItem";
import Bill from "./Bill";
import OrderService from "../order/OrderService";
import Service from "../order/Service";

export default class BillService {

    static createBillItems(order:Order, services: Service[], realEstate?: RealEstate):BillItem[]{

        let billItems: BillItem[] = order.services.map((orderServices: OrderService) => {
            let service: Service | undefined = services.find((service: Service) => service._links.self!.href === orderServices._links.service.href);
            return {
                code: service ? service.articleNumber : "",
                amount: orderServices.amount,
                serviceName: service ? service.title : "",
                price: service ? service.price : 0.00,
                custom: false,
                order: order._links.self ? order._links.self.href : null
            }
        });

        return Array.of(...this.addBasePrice(services),
            ...this.addDistanceItem(services, order, realEstate),
            ...this.addSmallOrder(services, order),
            ...billItems);
    }

    static createNewBill(billNo: string, billDate: string, order: Order, services: Service[], realEstate?: RealEstate, technician?: Employee): Bill {

        return new Bill(billNo, billDate,
            order,
            realEstate,
            technician
        );
    }

    static addBasePrice(services: Service[]): BillItem[] {
        let service: Service | undefined = services.find((services: Service) => services.articleNumber === '1A');
        if (service !== undefined) {
            return [new BillItem(service.articleNumber, 1, service.title, service.price, false)];
        }
        return [];
    }

    static addSmallOrder(services: Service[], order: Order): BillItem[] {
        if (!order.smallOrder) {
            return [];
        }
        let service: Service | undefined = services.find((services: Service) => services.articleNumber === '1F');
        if (service !== undefined) {
            return [new BillItem(service.articleNumber, 1, service.title, service.price,false)];
        }
        return [];
    }

    static addDistanceItem(services: Service[], order: Order, realEstate?: RealEstate): BillItem[] {

        if (realEstate === undefined || !order.includeKmFee) {
            return [];
        }

        let distance = realEstate.distance;
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
            return this.getDistanceItem(services, '1E', distance);
        }
        return [];
    }

    private static getDistanceItem(services: Service[], code: string, distance: number = 1) {
        let service: Service | undefined = services.find((services: Service) => services.articleNumber === code);
        if (service === undefined) {
            return [];
        }
        return [new BillItem(service.articleNumber, 1, service.title, service.price * distance, false)];
    }
}