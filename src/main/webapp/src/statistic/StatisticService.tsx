import moment, {Moment} from "moment";
import Order from "../order/Order";
import Statistik from "./Statistics";
import OrderStatusStatistics from "./OrderStatusStatistics";

export default class StatisticService {

    public static  getSales(orders: Order[],startPeriod: Moment, endPeriod: Moment): Statistik[] {
        return orders
            .filter(value => value.paymentRecievedDate !== '')
            .filter(value => this.dateBetween(moment(value.paymentRecievedDate,"DD.MM.YYYY") ,startPeriod,endPeriod) )
            .map(value => {let s = new Statistik(); s.date = moment(value.paymentRecievedDate,"DD.MM.YYYY"); s.paid = value.sum; return s;});
    }

    public static getPendingBill(orders: Order[],startPeriod: Moment, endPeriod: Moment): Statistik[] {
        return orders
            .filter(value => value.billDate !== '' && value.status !=='PAYMENT_RECIEVED' )
            .filter(value => this.dateBetween(moment(value.billDate,"DD.MM.YYYY") ,startPeriod,endPeriod) )
            .map(value => {let s = new Statistik(); s.date = moment(value.billDate,"DD.MM.YYYY"); s.billed = value.sum; return s;});
    }

    public static byMonth(sales: Statistik[],startPeriod: Moment, endPeriod: Moment): Statistik[] {
        const salesByMonth: Map<string, Statistik> = new Map<string, Statistik>();

        let nextMonth =  startPeriod.clone();
        while(nextMonth <= endPeriod){
            const name = nextMonth.format("MM.YYYY");
            let statistik = new Statistik();
            statistik.name = name;
            salesByMonth.set(name,statistik);
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

        salesByMonth.set("total", new Statistik());

        sales.forEach(value => {

                let existingValue = salesByMonth.get("total")!;

                if(value.billed){
                    existingValue.billed! += value.billed;
                    existingValue.billedUi = existingValue.billed.toFixed(2);
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

    static getStatusStatistik(orders: Order[]): OrderStatusStatistics {
        let orderStatusStatistics = {
            orderEdit: 0,
            orderExceute: 0,
            orderBill: 0,
            orderBillRecieved: 0,
            paymentRecieved: 0
        };
        orders.forEach(value => {

            switch (value.status) {
                case 'ORDER_EDIT':
                    orderStatusStatistics.orderEdit += 1;
                    break;
                case 'ORDER_EXECUTE':
                    orderStatusStatistics.orderExceute += 1;
                    break;
                case 'ORDER_BILL':
                    orderStatusStatistics.orderBill += 1;
                    break;
                case 'ORDER_BILL_RECIEVED':
                    orderStatusStatistics.orderBillRecieved += 1;
                    break;
                case 'PAYMENT_RECIEVED':
                    orderStatusStatistics.paymentRecieved += 1;
                    break;

            }
        });
        return orderStatusStatistics;
    }
}