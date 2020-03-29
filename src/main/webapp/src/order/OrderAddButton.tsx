import {Button} from "semantic-ui-react";
import * as React from "react";
import {useAlert} from "react-alert";
import RealEstate from "../realestate/RealEstate";
import Order from "./Order";
import OrderService from "./OrderService";
import Helper from "../common/Helper";
import Company from "../employees/Company";

interface Props {
    company: Company,
    order: Order,
    realEstates: RealEstate[],
    onSuccess: (order: Order) => void
    onError: (errors: Map<string, string>) => void
}

export function OrderAddButton(props: Props) {

    const alert = useAlert();

    function confirmSuccess(onSuccess: (order: Order) => void) {
        return (order: Order) => {
            alert.success("Auftrag gespeichert", {timeout: 2000});
            onSuccess(order);
        }
    }

    function confirmError(onError: (errors: Map<string, string>) => void) {
        return (errors: Map<string, string>) => {
            alert.error("Auftrag konnte nicht gepeichert werden");
            onError(errors);
        }
    }

    function saveAndConfimr(order: Order, realEstates: RealEstate[], continueToNextStep: boolean, onSuccess: (order: Order) => void, onError: (error: Map<string, string>) => void) {
        let orderToSave: Order = Object.assign({}, order);
        if (continueToNextStep) {
            orderToSave.prevStatus = orderToSave.status;
            orderToSave.status = Helper.nextStatus(order.status, props.company);
        }
        OrderService.save(orderToSave, confirmSuccess(onSuccess), confirmError(onError));
    }

    return <Button.Group>

        <Button.Group>
            <Button primary content='Speichern'
                    onClick={() => saveAndConfimr(props.order, props.realEstates, false, props.onSuccess, props.onError)}
                    className={"save-bttn"}/>
            <Button.Or text='&'/>
            <Button primary content='Weiter'
                    onClick={() => saveAndConfimr(props.order, props.realEstates, true, props.onSuccess, props.onError)}
                    className={"save-bttn"}
                    icon={Helper.getStatusIcon(Helper.nextStatus(props.order.status, props.company))}/>}
            labelPosition={"right"}/>
        </Button.Group>
    </Button.Group>
}