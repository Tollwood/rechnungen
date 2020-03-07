import moment from "moment";
import * as React from "react";
import {useEffect, useState} from "react";
import {Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {Grid, Icon, Statistic} from "semantic-ui-react";
import OrderService from "../order/OrderService";
import Order from "../order/Order";
import StatisticService from "./StatisticService";
import Statistik from "./Statistics";
import Helper from "../common/Helper";
import OrderStatusStatistics from "./OrderStatusStatistics";

export default function StatisticOverview() {
    const [monthlySales, setMonthlySales] = useState<Statistik[]>([]);
    const [totalOpenBills, setTotalOpenBills] = useState<Statistik[]>([]);
    const [orderStatistics, setOrderStatistics] = useState<OrderStatusStatistics>(StatisticService.getStatusStatistik([]));

    useEffect(() => {
        const fetchData = async () => {
            const orders: Order[] = await OrderService.getOrdersSync();
            const endOfthisMonth = moment().add(1, "month").startOf("month");
            const endOfthisMonthAYearAgo = moment().subtract(1, "year").add(1, "month");

            var sales: Statistik[] = StatisticService.getSales(orders, endOfthisMonthAYearAgo, endOfthisMonth);
            var pendingBills: Statistik[] = StatisticService.getPendingBill(orders, endOfthisMonthAYearAgo, endOfthisMonth);
            let salesAndBills = sales.concat(pendingBills);
            setMonthlySales(StatisticService.byMonth(salesAndBills, endOfthisMonthAYearAgo, endOfthisMonth));
            setTotalOpenBills(StatisticService.total(salesAndBills));
            setOrderStatistics(StatisticService.getStatusStatistik(orders))
        };
        fetchData();
    }, []);

    return <Grid>
        <Grid.Row>
            <Grid.Column width={16} textAlign={"center"}>
                <h1>Aufträge</h1>
                <Statistic.Group color={"blue"} size={"small"} widths={5}>
                    <Statistic>
                        <Statistic.Value>
                            <Icon name={Helper.getStatusIcon('ORDER_EDIT')}/>{orderStatistics.orderEdit}
                        </Statistic.Value>
                        <Statistic.Label>{Helper.getStatusName('ORDER_EDIT')}</Statistic.Label>
                    </Statistic>
                    <Statistic>
                        <Statistic.Value>
                            <Icon name={Helper.getStatusIcon('ORDER_EXECUTE')}/>{orderStatistics.orderExceute}
                        </Statistic.Value>
                        <Statistic.Label>{Helper.getStatusName('ORDER_EXECUTE')}</Statistic.Label>
                    </Statistic>
                    <Statistic>
                        <Statistic.Value>
                            <Icon name={Helper.getStatusIcon('ORDER_BILL')}/>{orderStatistics.orderBill}
                        </Statistic.Value>
                        <Statistic.Label>{Helper.getStatusName('ORDER_BILL')}</Statistic.Label>
                    </Statistic>
                    <Statistic>
                        <Statistic.Value>
                            <Icon name={Helper.getStatusIcon('ORDER_BILL_RECIEVED')}/>{orderStatistics.orderBillRecieved}
                        </Statistic.Value>
                        <Statistic.Label>{Helper.getStatusName('ORDER_BILL_RECIEVED')}</Statistic.Label>
                    </Statistic>
                    <Statistic>
                        <Statistic.Value>
                            <Icon name={Helper.getStatusIcon('PAYMENT_RECIEVED')}/>{orderStatistics.paymentRecieved}
                        </Statistic.Value>
                        <Statistic.Label>{Helper.getStatusName('PAYMENT_RECIEVED')}</Statistic.Label>
                    </Statistic>
                </Statistic.Group>
            </Grid.Column>
        </Grid.Row>
        <Grid.Row>
            <Grid.Column width={8} textAlign={"center"}>
                <h1>Offene Rechnungen Total</h1>
            </Grid.Column>
            <Grid.Column width={8} textAlign={"center"}>
                <h1>Umsatz Total</h1>
            </Grid.Column>
        </Grid.Row>
        <Grid.Row>
            <Grid.Column width={4} textAlign={"center"}>
                <div style={{width: '100%', height: 300}}>
                    <ResponsiveContainer>
                        <BarChart
                            data={totalOpenBills}
                            margin={{
                                top: 5, right: 30, left: 20, bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3"/>
                            <XAxis dataKey="name"/>
                            <YAxis/>
                            <Tooltip/>
                            <Legend/>
                            <Bar dataKey="billedCount" fill="#07355d" name={"Anzahl"}/>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </Grid.Column>
            <Grid.Column width={4} textAlign={"center"}>
                <div style={{width: '100%', height: 300}}>
                    <ResponsiveContainer>
                        <BarChart
                            data={totalOpenBills}
                            margin={{
                                top: 5, right: 30, left: 20, bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3"/>
                            <XAxis dataKey="name"/>
                            <YAxis/>
                            <Tooltip/>
                            <Legend/>
                            <Bar dataKey="billedUi" fill="#07355d" name={"in Euro"}/>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </Grid.Column>
            <Grid.Column width={4} textAlign={"center"}>
                <div style={{width: '100%', height: 300}}>
                    <ResponsiveContainer>
                        <BarChart
                            data={totalOpenBills}
                            margin={{
                                top: 5, right: 30, left: 20, bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3"/>
                            <XAxis dataKey="name"/>
                            <YAxis/>
                            <Tooltip/>
                            <Legend/>
                            <Bar dataKey="paidCount" fill="#229ad6" name={"Anzahl"}/>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </Grid.Column>
            <Grid.Column width={4} textAlign={"center"}>
                <div style={{width: '100%', height: 300}}>
                    <ResponsiveContainer>
                        <BarChart
                            data={totalOpenBills}
                            margin={{
                                top: 5, right: 30, left: 20, bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3"/>
                            <XAxis dataKey="name"/>
                            <YAxis/>
                            <Tooltip/>
                            <Legend/>
                            <Bar dataKey="paidUi" fill="#229ad6" name={"in Euro"}/>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </Grid.Column>

        </Grid.Row>
        <Grid.Row>
            <Grid.Column width={16} textAlign={"center"}>
                <h1>Jahresrückblick</h1>
                <div style={{width: '100%', height: 300}}>
                    <ResponsiveContainer>
                        <BarChart
                            data={monthlySales}
                            margin={{
                                top: 5, right: 30, left: 20, bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3"/>
                            <XAxis dataKey="name"/>
                            <YAxis height={10000}/>
                            <Tooltip/>
                            <Legend/>
                            <Bar dataKey="billedUi" fill="#07355d" name={"Offener Betrag in Euro "}/>
                            <Bar dataKey="paidUi" fill="#229ad6" name={"Umsatz in Euro"}/>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </Grid.Column>
        </Grid.Row>
        <Grid.Row>
            <Grid.Column width={16} textAlign={"center"}>
                <div style={{width: '100%', height: 300}}>
                    <ResponsiveContainer>
                        <BarChart
                            data={monthlySales}
                            margin={{
                                top: 5, right: 30, left: 20, bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3"/>
                            <XAxis dataKey="name"/>
                            <YAxis height={10000}/>
                            <Tooltip/>
                            <Legend/>
                            <Bar dataKey="billedCount" fill="#07355d" name={"Offene Rechnugnen"}/>
                            <Bar dataKey="paidCount" fill="#229ad6" name={"Zahlungseingänge"}/>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </Grid.Column>
        </Grid.Row>
    </Grid>
}