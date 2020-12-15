import * as React from "react";
import {Button, Input,  Table} from "semantic-ui-react";
import { useDebounceCallback} from '@react-hook/debounce'
import { useState } from "react";

interface Props {
    onSearchChanged: (searchTerm: string) => void
    currentValue: string
    onAdd: () => void
    labelAdd : string
    searchFieldWidth: number
    addButtondWidth: number
}

const Search: React.FC<Props> = (props:Props) => {

    const [value,setValue] = useState<string>(props.currentValue);
    const debounce = useDebounceCallback((value)=> props.onSearchChanged(value),500,false)

    React.useEffect(()=>{
        debounce(value);
    },[value,debounce]);
    
    
        return <React.Fragment>
            <Table.Row>
                <Table.HeaderCell colSpan={props.searchFieldWidth}>
                    <Input className="search"
                           icon='search'
                           placeholder='Suchen ...'
                           fluid
                           value={value}
                           onChange={(e,data) => setValue(data.value)}
                    />
                </Table.HeaderCell>
                <Table.HeaderCell colSpan={props.addButtondWidth}>
                    <Button floated={"right"} primary icon={{name: "add"}} label={props.labelAdd}
                                          onClick={props.onAdd}
                                          className={"add"}/>
                </Table.HeaderCell>
            </Table.Row>
        </React.Fragment>;
    

    

}

export default Search;