import * as React from "react";
import { ChangeEvent } from "react";

interface OrderIdInputProps {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  orderId?: string;
  existing: boolean;
  errors: Map<string, string>;
}

interface OrderIdInputState {
  initialOrderId?: string;
}

export default class OrderIdInput extends React.Component<OrderIdInputProps, OrderIdInputState> {
  constructor(props: OrderIdInputProps) {
    super(props);
    this.state = {
      initialOrderId: this.props.orderId,
    };
  }

  render() {
    return (
      // <Form.Input className={"OrderIdInput"}
      //             id="orderId"
      //             placeholder='Auftrags-ID'
      //             value={this.props.orderId}
      //             name='orderId'
      //             onChange={this.props.onChange.bind(this)}
      //             error={this.props.errors.get('orderId') ? {content: this.props.errors.get('orderId')} : null}
      // />
      <div></div>
    );
  }
}
