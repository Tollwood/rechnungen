import * as React from "react";
import Order from "./Order";
import API from "../API";
import {ChangeEvent} from "react";
import {Form} from "semantic-ui-react";

interface OrderIdInputProps {
    onChange: (event: ChangeEvent<HTMLInputElement>) => void
    orderId?: string
    isValid: (valid: boolean) => void
}

interface OrderIdInputState {
    orderIdVerified: OrderIdValidationState;
}

export default class OrderIdInput extends React.Component<OrderIdInputProps, OrderIdInputState> {

    private validIcon = {name:"check", color:"green"};

    constructor(props: OrderIdInputProps) {
        super(props);
        this.state = {
            orderIdVerified: "unknown"
        }
    }

    render() {
        return (
            <Form.Input id="orderId"

                        placeholder='Auftrags-ID'
                        value={this.props.orderId}
                        name='orderId'
                        onChange={this.props.onChange.bind(this)}
                        onBlur={this.onBlur.bind(this)}
                        onFocus={this.setUnknown.bind(this)}
                        loading={this.state.orderIdVerified === "checking"}
                        icon = {this.state.orderIdVerified === "valid"? this.validIcon: null}
                        error={ this.state.orderIdVerified === "invalid"?
                            {
                                content: 'Auftrags-ID bereits erfasst',
                            }: null}
            />
        );
    }

    onBlur(event: ChangeEvent<HTMLInputElement>) {
        if(!this.nullOrEmpty(event.target.value)){
            this.checkUniqueOrderId(event.target.value);
        }
    }

    private checkUniqueOrderId(orderId: string) {
        API.get('/order/search/findByOrderId?orderId='+ orderId)
            .then(res => {
                return res.data._embedded.order;
            })
            .then ((orders: Order[]) => orders.length)
            .then(count => {
                if(count === 0){
                    this.setState({ orderIdVerified:"valid"});
                    this.props.isValid(true);
                } else {
                    this.setState({ orderIdVerified:"invalid"});
                    this.props.isValid(false);
                }
            });
    }
    private setUnknown(){
        this.props.isValid(false);
        this.setState({ orderIdVerified:"unknown"})
    }

    private nullOrEmpty(value?: string) {
        return value === undefined || value.length === 0;
    }

}
type OrderIdValidationState = 'unknown' | 'valid' | 'invalid' | 'checking'