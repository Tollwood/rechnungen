import Order from "../order/Order";
import Bill from "./Bill";
import BillItem from "./BillItem";

export default class BillService {
  static createNewBill(billNo: string, billDate: string, order: Order): Bill {
    if (order.canceled) {
      order.billItems!.forEach((value) => (value.price > 0 ? (value.price *= -1) : null));
    } else {
      order.billItems!.forEach((value) => (value.price < 0 ? (value.price *= -1) : null));
    }

    return new Bill(billNo, billDate, order);
  }

  static computeBillItems(order: Order): BillItem[] {
    let billItems: BillItem[] = [];
    if (order.customer.name === "BRUNATA Wärmemesser Hagen GmbH & Co KG") {
      billItems.push(this.basePrice());
    }
    billItems.push(...this.addDistanceItem(order));
    if (order.smallOrder) {
      billItems.push(this.smallOrder());
    }

    const billItemsFromOrderItems = order.orderItems.map((serviceOrder) => {
      return {
        serviceName: serviceOrder.service.title,
        amount: serviceOrder.amount,
        code: serviceOrder.service.articleNumber,
        price: serviceOrder.service.price,
        custom: true,
      } as BillItem;
    });
    billItems.push(...billItemsFromOrderItems);

    return billItems;
  }

  static addDistanceItem(order: Order): BillItem[] {
    if (!order.includeKmFee || order.realEstate == null) {
      return [];
    }

    const distance = order.distance ? order.distance : order.realEstate.distance;
    if (distance >= 21 && distance <= 30) {
      return [
        {
          code: "1B",
          amount: 1,
          serviceName: "Anfahrt bis 30 km",
          price: 7.5,
          custom: true,
        },
      ];
    }
    if (distance >= 31 && distance <= 40) {
      return [
        {
          code: "1C",
          amount: 1,
          serviceName: "Anfahrt bis 40 km",
          price: 15.0,
          custom: true,
        },
      ];
    }
    if (distance >= 41 && distance <= 50) {
      return [
        {
          code: "1D",
          amount: 1,
          serviceName: "Anfahrt bis 50 km",
          price: 22.5,
          custom: true,
        },
      ];
    }
    if (distance > 50) {
      return [
        {
          code: "1D",
          amount: 1,
          serviceName: "Anfahrt bis 50 km",
          price: 22.5,
          custom: true,
        },
        {
          code: "1E",
          amount: 1 * distance - 50,
          serviceName: "Anfahrt über 50 km",
          price: 0.75,
          custom: true,
        },
      ];
    }

    return [];
  }

  static basePrice(): BillItem {
    return {
      code: "1A",
      amount: 1,
      serviceName: "Liegenschaftspauschale",
      price: 17.5,
      custom: true,
    } as BillItem;
  }

  static smallOrder(): BillItem {
    return {
      code: "1F",
      amount: 1,
      serviceName: "Zuschlag Kleinauftrag",
      price: 5,
      custom: true,
    } as BillItem;
  }
}
