import * as React from "react";
import Order from "../order/Order";

interface Sales {
    date: Date,
    amount: number
    name?: string
}

export default class StatisticService {

    public static  getSales(orders: Order[],startPeriod: Date, endPeriod: Date): Sales[] {
        return orders
            .filter(value => value.paymentRecievedDate !== '')
            .filter(value => this.dateBetween(new Date(parseInt(value.paymentRecievedDate.substr(6,4)),parseInt(value.paymentRecievedDate.substr(3,2)),parseInt(value.paymentRecievedDate.substr(0,2))) ,startPeriod,endPeriod) )
            .map(value => ({date: new Date(parseInt(value.paymentRecievedDate.substr(6,4)),parseInt(value.paymentRecievedDate.substr(3,2)),parseInt(value.paymentRecievedDate.substr(0,2)) ), amount: value.sum}));
    }

    public static getPendingBill(orders: Order[],startPeriod: Date, endPeriod: Date): Sales[] {
        return orders
            .filter(value => value.billDate !== '' && value.status !=='PAYMENT_RECIEVED' )
            .filter(value => this.dateBetween(new Date(parseInt(value.billDate.substr(6,4)),parseInt(value.billDate.substr(3,2)),parseInt(value.billDate.substr(0,2))) ,startPeriod,endPeriod) )
            .map(value => ({date: new Date(parseInt(value.billDate.substr(6,4)),parseInt(value.billDate.substr(3,2)),parseInt(value.billDate.substr(0,2)) ), amount: value.sum}));
    }
    public static byMonth(sales: Sales[],startPeriod: Date, endPeriod: Date): Sales[] {
        const salesByMonth: Map<string, Sales> = new Map<string, Sales>();

        let nextMonth = new Date(startPeriod.getFullYear(),startPeriod.getMonth(),1);
        while(nextMonth <= endPeriod){
            const name = nextMonth.getMonth()+  "." + nextMonth.getFullYear();
            salesByMonth.set(name,{name: name, amount: 0, date: nextMonth});
            nextMonth = new Date(nextMonth.getFullYear(),nextMonth.getMonth() +1 ,1);
        }

        sales.forEach(value => {
            value.name = value.date.getMonth()+  "." + value.date.getFullYear();
            if (!salesByMonth.get(value.name)) {
                salesByMonth.set(value.name, value)
            } else {
                let existingValue = salesByMonth.get(value.name)!;
                existingValue.amount += value.amount;
                salesByMonth.set(value.name, existingValue);
            }
        });
        return Array.from(salesByMonth.values()).sort((a, b) => a.date.getMilliseconds() - b.date.getMilliseconds());
    }

    public static  byYear(sales: Sales[]): Sales[] {
        const salesByYear: Map<number, Sales> = new Map<number, Sales>();
        sales.forEach(value => {
            if (!salesByYear.get(value.date.getFullYear())) {
                value.name = value.date.getFullYear() +"";
                salesByYear.set(value.date.getFullYear(), value)
            } else {
                let existingValue = salesByYear.get(value.date.getFullYear())!;
                existingValue.amount += value.amount;
                salesByYear.set(value.date.getFullYear(), existingValue);
            }
        });
        return Array.from(salesByYear.values()).sort((a, b) => a.date.getMilliseconds()! - b.date.getMilliseconds()!);
    }

    public static  dateBetween(value: Date, startPeriod: Date, endPeriod: Date): boolean {
        return startPeriod <= value && new Date(endPeriod.getFullYear(),endPeriod.getMonth() +1, 0) >= value;
    }

}