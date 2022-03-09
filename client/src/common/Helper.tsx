import { OrderStatus } from "../order/OrderStatus";

export default class Helper {
  public static isEmpty(value?: string) {
    return value === null || value === undefined || value.length === 0 || value === "";
  }

  public static nextStatus(status: OrderStatus): OrderStatus {
    switch (status) {
      case "ORDER_EDIT":
        return "ORDER_EXECUTE";
      case "ORDER_EXECUTE":
        return "ORDER_BILL";
      case "ORDER_BILL":
        return "ORDER_BILL_RECIEVED";
      case "ORDER_BILL_RECIEVED":
        return "PAYMENT_RECIEVED";
      case "PAYMENT_RECIEVED":
        return "PAYMENT_RECIEVED";
    }
  }

  // public static  getStatusIcon(status:OrderStatus): SemanticICONS{
  //     switch (status) {
  //         case 'ORDER_EDIT': return 'edit';
  //         case 'ORDER_EXECUTE': return 'truck';
  //         case 'ORDER_BILL': return 'envelope open';
  //         case 'ORDER_BILL_RECIEVED': return 'eye';
  //         case 'PAYMENT_RECIEVED' : return 'check';
  //     }
  // }

  public static getStatusName(status: OrderStatus): string {
    switch (status) {
      case "ORDER_EDIT":
        return "Erfassen";
      case "ORDER_EXECUTE":
        return "Durchführen";
      case "ORDER_BILL":
        return "Rechnung";
      case "ORDER_BILL_RECIEVED":
        return "Zahlungseingang";
      case "PAYMENT_RECIEVED":
        return "Abgeschloßen";
    }
  }
}
