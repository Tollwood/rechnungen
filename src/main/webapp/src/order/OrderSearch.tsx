import * as React from "react";
import {Dropdown, DropdownOnSearchChangeData, DropdownProps} from "semantic-ui-react";
import {Order} from "./Order";

interface OrderSearchProps {
    onSelected: (selectedOrder: Order)=> void;
}
interface OrderSearchState {
        isFetching: boolean,
        currentValue: string
        minSearchLength: number
}

export default class OrderSearch extends React.Component<OrderSearchProps,OrderSearchState> {

    constructor(props: OrderSearchProps) {
        super(props);
        this.state = {isFetching: false, currentValue: "", minSearchLength: 3}
    }

    render () {
            return (
                <Dropdown icon='search'
                    placeholder='Auftrags-ID'
                    fluid
                    search
                    selection
                    options={countryOptions}
                    noResultsMessage='Neuen Auftrag anlegen'
                    loading={this.state.isFetching}

                    allowAdditions
                    onAddItem={this.handleAddition.bind(this)}
                    minCharacters={this.state.minSearchLength}
                    onSearchChange = {this.handleSearchChange.bind(this)}
                    size='massive'
                />
            );
    }

    private handleAddition(event: React.KeyboardEvent<HTMLElement>, data: DropdownProps) {
        this.props.onSelected({orderId: data.value as string});
    }

    private handleSearchChange(event: React.SyntheticEvent<HTMLElement>, data: DropdownOnSearchChangeData,) {
            console.log("current search query" + data.searchQuery);

            if(data.searchQuery.length > this.state.minSearchLength){
                this.setState(Object.assign(this.state,{isFetching: true}));
            }
    }
}

const countryOptions = [
    { key: '123', value: '123', text: '123' },
];