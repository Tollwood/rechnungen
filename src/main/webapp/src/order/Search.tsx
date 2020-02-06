import * as React from "react";
import {Button, Input, InputOnChangeData, Table} from "semantic-ui-react";


interface Props {
    onSearchChanged: (searchTerm: string) => void
    currentValue: string
    onAdd: () => void
    labelAdd : string
    searchFieldWidth: number
    addButtondWidth: number
}

export default class Search extends React.Component<Props> {

    render() {
        return <React.Fragment>
            <Table.Row>
                <Table.HeaderCell colSpan={this.props.searchFieldWidth}>
                    <Input className="search"
                           icon='search'
                           placeholder='Suchen ...'
                           fluid
                           value={this.props.currentValue}
                           onChange={this.handleSearchChange.bind(this)}
                    />
                </Table.HeaderCell>
                <Table.HeaderCell colSpan={this.props.addButtondWidth}>
                    <Button floated={"right"} primary icon={{name: "add"}} label={this.props.labelAdd}
                                          onClick={this.props.onAdd}
                                          className={"add"}/>
                </Table.HeaderCell>
            </Table.Row>
        </React.Fragment>;
    }

    private handleSearchChange(event: React.ChangeEvent<HTMLInputElement>, data: InputOnChangeData) {
        this.props.onSearchChanged(data.value)
    }

}