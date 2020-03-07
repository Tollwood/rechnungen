import moment from "moment";
import * as React from "react";
import {useEffect, useState} from "react";
import {Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {Dimmer, Dropdown, DropdownProps, Grid, Icon, Loader, Segment, Statistic} from "semantic-ui-react";
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
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [type, setType] = useState<string>( "paidUi");

    const options = [
        {
            key: 'billedUi',
            text: 'Offene Rechnungen',
            value: 'billedUi',
        },
        {
            key: 'paidUi',
            text: 'Umsätze',
            value: 'paidUi',
        }
    ];

    function updateValue(event: React.SyntheticEvent<HTMLElement>, data: DropdownProps) {
        setType(data.value as string);
    }

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const orders: Order[] = await OrderService.getOrdersSync();
            const endOfthisMonth = moment().add(1, "month").startOf("month");
            const endOfthisMonthAYearAgo = moment().subtract(1, "year").add(1, "month");

            var sales: Statistik[] = StatisticService.getSales(orders, endOfthisMonthAYearAgo, endOfthisMonth);
            var pendingBills: Statistik[] = StatisticService.getPendingBill(orders, endOfthisMonthAYearAgo, endOfthisMonth);
            let salesAndBills = sales.concat(pendingBills);
            setMonthlySales(StatisticService.byMonth(salesAndBills, endOfthisMonthAYearAgo, endOfthisMonth));
            setTotalOpenBills(StatisticService.total(salesAndBills));
            setOrderStatistics(StatisticService.getStatusStatistik(orders));
            setIsLoading(false);
        };
        fetchData();
    }, []);

    return <Segment>
        <Dimmer active={isLoading} inverted>
            <Loader inverted>Statistiken werden geladen</Loader>
        </Dimmer>
        <Grid>
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
                <Grid.Column width={16} textAlign={"center"}>
                <h1><Dropdown
                    fluid
                    selection
                    options={options}
                    value={type}
                    onChange={updateValue}
                /></h1>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column width={16} textAlign={"center"}>
                    <Statistic.Group color={"blue"} size={"small"} widths={2} >
                        <Statistic>
                            <Statistic.Value>
                                {type === "paidUi" ? totalOpenBills[0] && totalOpenBills[0].paidCount : totalOpenBills[0] && totalOpenBills[0].billedCount }
                            </Statistic.Value>
                            <Statistic.Label>{type === "paidUi" ? "abgeschloßene Aufträge": "offene Rechnugnen"}</Statistic.Label>
                        </Statistic>
                        <Statistic>
                            <Statistic.Value>
                                {type === "paidUi" ? totalOpenBills[0] && totalOpenBills[0].paid.toLocaleString('de', {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2
                                }) : totalOpenBills[0] && totalOpenBills[0].billed.toLocaleString('de', {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2
                                }) }
                            </Statistic.Value>
                            <Statistic.Label>{type === "paidUi" ? "Gesamtumsatz": "offene Rechnugnen in EUR"}</Statistic.Label>
                        </Statistic>
                    </Statistic.Group>
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
                                <YAxis/>
                                <Tooltip/>
                                <Legend/>
                                <Bar dataKey={type} fill="#229ad6" name={type === "paidUi" ? "Umsatz in EUR": "offene Rechnugnen in EUR"}/>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    </Segment>
}