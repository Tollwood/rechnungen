import * as React from "react";
import {useEffect, useState} from "react";
import {Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {Grid} from "semantic-ui-react";
import OrderService from "../order/OrderService";
import Order from "../order/Order";
import StatisticService from "./StatisticService";

interface Sales {
    date: Date,
    amount: number
    name?: string
}

export default function StatisticOverview() {

    const [monthlySales, setMonthlySales] = useState<Sales[]>([]);
    const [monthlyBills, setMonthlyBills] = useState<Sales[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const orders: Order[] = await OrderService.getOrdersSync();
            const now = new Date();
            const endOfthisMonth = new Date(now.getFullYear(), now.getMonth() +1 ,1);
            const endOfthisMonthAYearAgo = new Date(now.getFullYear()-1, now.getMonth() +2  ,1);

            setMonthlySales(StatisticService.byMonth(StatisticService.getSales(orders,endOfthisMonthAYearAgo,endOfthisMonth),endOfthisMonthAYearAgo,endOfthisMonth));
            setMonthlyBills(StatisticService.byMonth(StatisticService.getPendingBill(orders,endOfthisMonthAYearAgo,endOfthisMonth),endOfthisMonthAYearAgo,endOfthisMonth));
        };
        fetchData();
    }, []);

    return <Grid>
        <Grid.Row>
            <Grid.Column width={16} textAlign={"center"}>
                <h1>Monatsumsatz</h1>
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
                            <YAxis/>
                            <Tooltip/>
                            <Legend/>
                            <Bar dataKey="amount" fill="#229ad6" name={"Umsatz"}/>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </Grid.Column>
            <Grid.Column width={16} textAlign={"center"}>
                <h1>Offene Rechungen</h1>
                <div style={{width: '100%', height: 300}}>
                    <ResponsiveContainer>
                        <BarChart
                            data={monthlyBills}
                            margin={{
                                top: 5, right: 30, left: 20, bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3"/>
                            <XAxis dataKey="name"/>
                            <YAxis/>
                            <Tooltip/>
                            <Legend/>
                            <Bar dataKey="amount" fill="#07355d" name={"offene Rechnungen"}/>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </Grid.Column>
        </Grid.Row>
    </Grid>
}