import Employee from "./Employee";
import * as React from "react";

export default class EmployeeList extends React.Component<{},EmployeeListState> {

    constructor(props: EmployeeListState) {
        super(props);
        this.state = { employees: [] };
    }

    render () {
        return (<h1>Mitarbeiter</h1>);
    }
}

interface EmployeeListState {
    employees:Employee[]
}