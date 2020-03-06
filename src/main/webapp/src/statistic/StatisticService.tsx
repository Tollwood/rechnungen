import moment from "moment";
import * as React from "react";
import Order from "../order/Order";
import {Moment} from "moment";

interface Sales {
    date: Moment,
    amount: number
    amountUi?: string
    name?: string
}

export default class StatisticService {

    public static  getSales(orders: Order[],startPeriod: Moment, endPeriod: Moment): Sales[] {
        return orders
            .filter(value => value.paymentRecievedDate !== '')
            .filter(value => this.dateBetween(moment(value.paymentRecievedDate,"DD.MM.YYYY") ,startPeriod,endPeriod) )
            .map(value => ({date: moment(value.paymentRecievedDate,"DD.MM.YYYY"), amount: value.sum }));
    }

    public static getPendingBill(orders: Order[],startPeriod: Moment, endPeriod: Moment): Sales[] {
        return orders
            .filter(value => value.billDate !== '' && value.status !=='PAYMENT_RECIEVED' )
            .filter(value => this.dateBetween(moment(value.billDate,"DD.MM.YYYY") ,startPeriod,endPeriod) )
            .map(value => ({date: moment(value.billDate,"DD.MM.YYYY"), amount: value.sum}));
    }

    public static byMonth(sales: Sales[],startPeriod: Moment, endPeriod: Moment): Sales[] {
        const salesByMonth: Map<string, Sales> = new Map<string, Sales>();

        let nextMonth =  startPeriod.clone();
        while(nextMonth <= endPeriod){
            const name = nextMonth.format("MM.YYYY");
            salesByMonth.set(name,{name: name, amount: 0, date: nextMonth, amountUi: "0.00"});
            nextMonth.add(1,"month");
        }

        sales.forEach(value => {
            value.name = value.date.format("MM.YYYY");
            if (!salesByMonth.get(value.name)) {
                value.amountUi = value.amount.toFixed(2);
                salesByMonth.set(value.name, value)
            } else {
                let existingValue = salesByMonth.get(value.name)!;
                existingValue.amount += value.amount;
                existingValue.amountUi = value.amount.toFixed(2);
                salesByMonth.set(value.name, existingValue);
            }
        });
        return Array.from(salesByMonth.values()).sort((a, b) => a.date.milliseconds() - b.date.milliseconds());
    }

    public static  byYear(sales: Sales[]): Sales[] {
        const salesByYear: Map<number, Sales> = new Map<number, Sales>();
        sales.forEach(value => {
            if (!salesByYear.get(value.date.get("year"))) {
                value.name = value.date.format("YYYY");
                salesByYear.set(value.date.get("year"), value)
            } else {
                let existingValue = salesByYear.get(value.date.get("year"))!;
                existingValue.amount += value.amount;
                salesByYear.set(value.date.get("year"), existingValue);
            }
        });
        return Array.from(salesByYear.values()).sort((a, b) => a.date.milliseconds()! - b.date.milliseconds()!);
    }

    public static  dateBetween(value: Moment, startPeriod: Moment, endPeriod: Moment): boolean {
        return value.isBetween(startPeriod,endPeriod,"month","()");
    }

}