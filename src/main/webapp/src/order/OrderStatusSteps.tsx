import * as React from "react";
import Icon from "semantic-ui-react/dist/commonjs/elements/Icon";
import {OrderStatus} from "./OrderStatus";
import {Step} from "semantic-ui-react";
import Helper from "../common/Helper";

interface OrderStatusStepsProps {
    status: OrderStatus
    statusChanged:(newStatus: OrderStatus) => void
}


export default class OrderStatusSteps extends React.Component<OrderStatusStepsProps, {}> {

    render() {
        return (
            <Step.Group stackable={"tablet"}>
                <Step active={this.props.status === 'ORDER_EDIT'} onClick={()=>this.props.statusChanged('ORDER_EDIT')}>
                    <Icon name={Helper.getStatusIcon('ORDER_EDIT')}/>
                    <Step.Content>
                        <Step.Title>Erfassen</Step.Title>
                    </Step.Content>
                </Step>
                <Step active={this.props.status === 'ORDER_EXECUTE'}
                      disabled={this.props.status === 'ORDER_EDIT'}
                      onClick={()=>this.props.statusChanged('ORDER_EXECUTE')}>
                    <Icon name={Helper.getStatusIcon('ORDER_EXECUTE')}/>
                    <Step.Content>
                        <Step.Title>Durchführen</Step.Title>
                    </Step.Content>
                </Step>
                <Step active={this.props.status === 'ORDER_BILL'}
                      onClick={()=>this.props.statusChanged('ORDER_BILL')}
                      disabled={this.props.status === 'ORDER_EDIT' || this.props.status === 'ORDER_EXECUTE'}>
                    <Icon name={Helper.getStatusIcon('ORDER_BILL')}/>
                    <Step.Content>
                        <Step.Title>Rechnung</Step.Title>
                    </Step.Content>
                </Step>
                <Step active={this.props.status === 'ORDER_BILL_RECIEVED'}
                      onClick={()=>this.props.statusChanged('ORDER_BILL_RECIEVED')}
                      disabled={this.props.status === 'ORDER_EDIT' || this.props.status === 'ORDER_EXECUTE' || this.props.status === 'ORDER_BILL'}>
                    <Icon name={Helper.getStatusIcon('ORDER_BILL_RECIEVED')}/>
                    <Step.Content>
                        <Step.Title>Zahlungseingang</Step.Title>
                    </Step.Content>
                </Step>
                <Step active={this.props.status === 'PAYMENT_RECIEVED'}
                      disabled={this.props.status === 'ORDER_EDIT' || this.props.status === 'ORDER_EXECUTE' || this.props.status === 'ORDER_BILL' || this.props.status === 'ORDER_BILL_RECIEVED'}>
                    <Icon name={Helper.getStatusIcon('PAYMENT_RECIEVED')}/>
                    <Step.Content>
                    </Step.Content>
                </Step>

            </Step.Group>
        );
    }


}