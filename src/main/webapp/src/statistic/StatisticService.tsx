import moment from "moment";
import * as React from "react";
import Order from "../order/Order";
import {Moment} from "moment";
import Statistik from "./Statistics";

export default class StatisticService {

    public static  getSales(orders: Order[],startPeriod: Moment, endPeriod: Moment): Statistik[] {
        return orders
            .filter(value => value.paymentRecievedDate !== '')
            .filter(value => this.dateBetween(moment(value.paymentRecievedDate,"DD.MM.YYYY") ,startPeriod,endPeriod) )
            .map(value => ({date: moment(value.paymentRecievedDate,"DD.MM.YYYY"), paid: value.sum }));
    }

    public static getPendingBill(orders: Order[],startPeriod: Moment, endPeriod: Moment): Statistik[] {
        return orders
            .filter(value => value.billDate !== '' && value.status !=='PAYMENT_RECIEVED' )
            .filter(value => this.dateBetween(moment(value.billDate,"DD.MM.YYYY") ,startPeriod,endPeriod) )
            .map(value => ({date: moment(value.billDate,"DD.MM.YYYY"), billed: value.sum}));
    }

    public static byMonth(sales: Statistik[],startPeriod: Moment, endPeriod: Moment): Statistik[] {
        const salesByMonth: Map<string, Statistik> = new Map<string, Statistik>();

        let nextMonth =  startPeriod.clone();
        while(nextMonth <= endPeriod){
            const name = nextMonth.format("MM.YYYY");
            salesByMonth.set(name,{name: name, billed: 0, billedCount: 0, date: nextMonth, billedUi: "0.00", paid: 0, paidCount: 0});
            nextMonth.add(1,"month");
        }

        sales.forEach(value => {
            value.name = value.date.format("MM.YYYY");
            if (!salesByMonth.get(value.name)) {
                if(value.billed){
                    value.billedUi = value.billed.toFixed(2);
                    value.billedCount! += 1;
                }
                if(value.paid){
                    value.paidUi = value.paid.toFixed(2);
                    value.paidCount! += 1;
                }
                salesByMonth.set(value.name, value)
            } else {
                let existingValue = salesByMonth.get(value.name)!;

                if(value.billed){
                    existingValue.billed! += value.billed;
                    existingValue.billedUi = value.billed.toFixed(2);
                    existingValue.billedCount! += 1;
                }
                if(value.paid){
                    existingValue.paid! += value.paid;
                    existingValue.paidCount! += 1;
                    existingValue.paidUi = value.paid.toFixed(2);
                }
                salesByMonth.set(value.name, existingValue);
            }
        });
        return Array.from(salesByMonth.values()).sort((a, b) => a.date.milliseconds() - b.date.milliseconds());
    }

    public static total(sales: Statistik[]): Statistik[] {
        const salesByMonth: Map<string, Statistik> = new Map<string, Statistik>();

        salesByMonth.set("total", {billed:0, billedCount: 0 , billedUi:"", name: "", paid: 0, paidCount : 0, paidUi :"", date: moment()});

        sales.forEach(value => {

                let existingValue = salesByMonth.get("total")!;

                if(value.billed){
                    existingValue.billed! += value.billed;
                    existingValue.billedUi = value.billed.toFixed(2);
                    existingValue.billedCount! += 1;
                }
                if(value.paid){
                    existingValue.paid! += value.paid;
                    existingValue.paidCount! += 1;
                    existingValue.paidUi = value.paid.toFixed(2);
                }
                salesByMonth.set("total", existingValue);
        });
        return Array.from(salesByMonth.values()).sort((a, b) => a.date.milliseconds() - b.date.milliseconds());
    }

    public static  dateBetween(value: Moment, startPeriod: Moment, endPeriod: Moment): boolean {
        return value.isBetween(startPeriod,endPeriod,"month","()");
    }

}