import * as React from "react";
import {Button, Modal} from "semantic-ui-react";
import {OrderSummary} from "./order/OrderSummary";
import OrderCount from "./OrderCount";
import Customer from "./customer/Customer";

interface Props {
    onSuccess: () => void
    onClose: () => void
    show: boolean
    orderCounts: OrderCount[]
    customer: Customer
    wishdate: string
}

export default function OrderSummaryModal(props:Props) {
        return <Modal open={props.show} dimmer={'blurring'} size={"small"} name="OrderSummaryModal">
                <Modal.Header>
                    Bitte überprüfen Sie Ihre Bestellung
                </Modal.Header>
                <Modal.Content>
                    <OrderSummary orderCounts={props.orderCounts} customer={props.customer} wishDate={props.wishdate}/>
                </Modal.Content>
                <Modal.Actions>
                    <Button onClick={props.onClose}>Abbrechen</Button>
                    <Button primary content={"Jetzt bestellen"} floated={"right"} onClick={props.onSuccess}/>
                </Modal.Actions>
            </Modal>
}