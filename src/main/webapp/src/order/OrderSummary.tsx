import {Grid} from "semantic-ui-react";
import * as React from "react";
import OrderCount from "../OrderCount";
import Customer from "../customer/Customer";
import CustomerDetails from "../customer/CustomerDetails";

interface Props {
    orderCounts: OrderCount[]
    customer: Customer
    wishDate: string
    onOrder?: () => void
}

export function OrderSummary(props: Props) {
    function renderItems(orderCount: OrderCount) {
        return <Grid.Row>
            <Grid.Column width={12}>
                {orderCount.amount} x {orderCount.service.title}
            </Grid.Column>
            <Grid.Column width={4} textAlign={"right"}>
                {(orderCount.amount * orderCount.service.price).toLocaleString('de', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                })} €
            </Grid.Column>
        </Grid.Row>
    }

    return <Grid>
            <Grid.Row>
                <Grid.Column width={16}>
                    <h4>Bestellung für</h4>
                </Grid.Column>
            </Grid.Row>
            <Grid.Row>
                <Grid.Column>
                    <CustomerDetails customer={props.customer} onChange={()=>{}} errors={new Map()} readonly={true}/>
                </Grid.Column>
            </Grid.Row>

            <Grid.Row>
                <Grid.Column width={16}>
                    <h4>Abholtermin: {props.wishDate}</h4>
                </Grid.Column>
            </Grid.Row>

            {props.orderCounts.map(orderCount => renderItems(orderCount))}
            <Grid.Row style={{borderTop: "solid", borderColor: "#d4d4d5", borderWidth: "1px"}}>
                <Grid.Column width={16} textAlign={"right"}>
                    Total: {props.orderCounts.map(value => value.amount * value.service.price).reduce((a, b) => a + b, 0).toLocaleString('de', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    })} €
                </Grid.Column>
            </Grid.Row>
        </Grid>
}