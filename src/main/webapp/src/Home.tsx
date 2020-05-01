import * as React from "react";
import {Container} from "semantic-ui-react";
import Company from "./employees/Company";
import PublicOrder from "./PublicOrder";
import Order from "./order/Order";
import OrderCount from "./OrderCount";

interface Props {
    company: Company
    onOrderCompleted: (order: Order, orderCount: OrderCount[]) => void
}

export default function Home(props: Props) {
    return <Container text>
        <div dangerouslySetInnerHTML={{__html: props.company.homeHeader}} />
        {props.company.publicOrder && <PublicOrder company={props.company} onOrderCompleted={props.onOrderCompleted}/>}
        <div dangerouslySetInnerHTML={{__html: props.company.homeFooter}} />
    </Container>
}