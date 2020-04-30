import * as React from "react";
import {Container, Image, Segment} from "semantic-ui-react";
import Company from "./employees/Company";
import HomeFooter from "./HomeFooter";
import PublicOrder from "./PublicOrder";
import Order from "./order/Order";
import OrderCount from "./OrderCount";

interface Props {
    company: Company
    onOrderCompleted: (order: Order, orderCount: OrderCount[]) => void
}

export default function Home(props: Props) {
    return <Container text>
        <Image src={props.company.logo} wrapped centered/>
        <Segment>Am Vortag bis 16 Uhr<sup>*</sup> bestellen und ganz gemütlich am nächsten Tag abholen.</Segment>
        {props.company.publicOrder && <PublicOrder company={props.company} onOrderCompleted={props.onOrderCompleted}/>}
        <HomeFooter></HomeFooter>
    </Container>


}