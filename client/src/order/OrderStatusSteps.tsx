import * as React from "react";
import { OrderStatus } from "./OrderStatus";
import Helper from "../common/Helper";

interface OrderStatusStepsProps {
  status: OrderStatus;
  statusChanged: (newStatus: OrderStatus) => void;
}

export default class OrderStatusSteps extends React.Component<OrderStatusStepsProps, {}> {
  render() {
    return (
      <div></div> // <Grid.Row textAlign={"center"}>
      //     <Grid.Column width={16}>
      //         <Step.Group stackable={"tablet"} fluid>
      //             <Step active={this.props.status === 'ORDER_EDIT'} onClick={() => this.props.statusChanged('ORDER_EDIT')}>
      //                 <Icon name={Helper.getStatusIcon('ORDER_EDIT')}/>
      //                 <Step.Content>
      //                     <Step.Title>Erfassen</Step.Title>
      //                 </Step.Content>
      //             </Step>
      //             <Step active={this.props.status === 'ORDER_EXECUTE'}
      //                   disabled={this.props.status === 'ORDER_EDIT'}
      //                   onClick={() => this.props.statusChanged('ORDER_EXECUTE')}>
      //                 <Icon name={Helper.getStatusIcon('ORDER_EXECUTE')}/>
      //                 <Step.Content>
      //                     <Step.Title>Durchführen</Step.Title>
      //                 </Step.Content>
      //             </Step>
      //             <Step active={this.props.status === 'ORDER_BILL'}
      //                   onClick={() => this.props.statusChanged('ORDER_BILL')}
      //                   disabled={this.props.status === 'ORDER_EDIT' || this.props.status === 'ORDER_EXECUTE'}>
      //                 <Icon name={Helper.getStatusIcon('ORDER_BILL')}/>
      //                 <Step.Content>
      //                     <Step.Title>Rechnung</Step.Title>
      //                 </Step.Content>
      //             </Step>
      //             <Step active={this.props.status === 'ORDER_BILL_RECIEVED'}
      //                   onClick={() => this.props.statusChanged('ORDER_BILL_RECIEVED')}
      //                   disabled={this.props.status === 'ORDER_EDIT' || this.props.status === 'ORDER_EXECUTE' || this.props.status === 'ORDER_BILL'}>
      //                 <Icon name={Helper.getStatusIcon('ORDER_BILL_RECIEVED')}/>
      //                 <Step.Content>
      //                     <Step.Title>Bezahlt?</Step.Title>
      //                 </Step.Content>
      //             </Step>
      //             <Step active={this.props.status === 'PAYMENT_RECIEVED'}
      //                   disabled={this.orderComplete()}>
      //                 <Icon name={Helper.getStatusIcon('PAYMENT_RECIEVED')} color={this.orderComplete()? "green": "grey"} disabled={!this.orderComplete()}/>
      //                 <Step.Content>
      //                 </Step.Content>
      //             </Step>

      //         </Step.Group>
      //     </Grid.Column>
      // </Grid.Row>
    );
  }

  private orderComplete() {
    return !(
      this.props.status === "ORDER_EDIT" ||
      this.props.status === "ORDER_EXECUTE" ||
      this.props.status === "ORDER_BILL" ||
      this.props.status === "ORDER_BILL_RECIEVED"
    );
  }
}
