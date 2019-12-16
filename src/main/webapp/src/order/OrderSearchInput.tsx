import * as React from "react";
import {Input, InputOnChangeData} from "semantic-ui-react";

interface OrderSearchProps {
    onSearchChanged: (searchTerm: string) => void
    currentValue: string
}

export default class OrderSearchInput extends React.Component<OrderSearchProps> {

    render() {
        return (
            <Input className="order-search"
                   icon='search'
                   placeholder='Suchen ...'
                   fluid
                   value={this.props.currentValue}
                   onChange={this.handleSearchChange.bind(this)}
            />
        );
    }

    private handleSearchChange(event: React.ChangeEvent<HTMLInputElement>, data: InputOnChangeData) {
        this.props.onSearchChanged(data.value);
    }
}