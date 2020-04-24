import * as React from "react";
import {Container, Image, Message} from "semantic-ui-react";
import OrderCount from "./OrderCount";
import Company from "./employees/Company";
import {OrderSummary} from "./order/OrderSummary";
import Customer from "./customer/Customer";

interface Props {
    company: Company
    services: OrderCount[]
    customer: Customer
    wishdate: string
}

export default function OrderConfirm(props: Props) {
    return <Container text>
        <Image src={props.company.logo} style={{width: "600px"}} centered/>
        <h1>Vielen Dank für Ihre Bestellung</h1>
        <Message
            warning
            header='Aktuell sind noch keine Bestellungen möglich'
            content='Diese Seite befindet sich noch in der Entwicklung. Aktuell werden keine Bestellungen bearbeitet.'
        />
        <OrderSummary wishDate={props.wishdate} customer={props.customer} orderCounts={props.services} completed={true}/>
        <p style={{padding: "5px"}}>
        {props.company.thankYouImage && <Image src={props.company.thankYouImage} centered style={{marginTop: "30px"}}/>}
        </p>
    </Container>


}