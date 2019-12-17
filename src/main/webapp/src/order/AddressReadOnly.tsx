import * as React from "react";
import {Address} from "../common/Address";

interface Props {
    address: Address;
}

export default class AddressReadOnly extends React.Component<Props, {}> {

    render() {
        return (
            <div >
                <div>{this.props.address.street} {this.props.address.houseNumber}</div>
                <label>{this.props.address.zipCode} {this.props.address.city}</label>
            </div>
        );
    }
}
