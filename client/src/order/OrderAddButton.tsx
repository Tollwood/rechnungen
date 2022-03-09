import * as React from "react";
import { useSnackbar } from "notistack";
import RealEstate from "../realestate/RealEstate";
import Order from "./Order";
import OrderService from "./OrderService";
import Helper from "../common/Helper";

interface Props {
  order: Order;
  realEstates: RealEstate[];
  onSuccess: (order: Order) => void;
  onError: (errors: Map<string, string>) => void;
}

export function OrderAddButton(props: Props) {
  const { enqueueSnackbar } = useSnackbar();

  function confirmSuccess(onSuccess: (order: Order) => void) {
    return (order: Order) => {
      enqueueSnackbar("Auftrag gespeichert", { variant: "success" });
      onSuccess(order);
    };
  }

  function confirmError(onError: (errors: Map<string, string>) => void) {
    return (errors: Map<string, string>) => {
      enqueueSnackbar("Auftrag konnte nicht gepeichert werden", { variant: "error" });
      onError(errors);
    };
  }

  function saveAndConfimr(
    order: Order,
    continueToNextStep: boolean,
    onSuccess: (order: Order) => void,
    onError: (error: Map<string, string>) => void
  ) {
    OrderService.save(order, continueToNextStep, confirmSuccess(onSuccess), confirmError(onError));
  }

  return (
    // <Button.Group>
    //   <Button.Group>
    //     <Button
    //       primary
    //       content="Speichern"
    //       onClick={() => saveAndConfimr(props.order, false, props.onSuccess, props.onError)}
    //       className={"save-bttn"}
    //     />
    //     <Button.Or text="&" />
    //     <Button
    //       primary
    //       content="Weiter"
    //       onClick={() => saveAndConfimr(props.order, true, props.onSuccess, props.onError)}
    //       className={"save-bttn"}
    //       icon={Helper.getStatusIcon(Helper.nextStatus(props.order.status))}
    //     />
    //   </Button.Group>
    // </Button.Group>
    <div></div>
  );
}
