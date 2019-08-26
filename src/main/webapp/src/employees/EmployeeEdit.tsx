import Employee from "./Employee";
import * as React from "react";

export default class EmployeeEdit extends React.Component<{},EmployeeListEdit> {

    constructor(props: EmployeeListEdit) {
        super(props);
        this.state = { employee: new Employee() };
    }

    render () {
        if( this.state.employee.id === undefined){
            return (<h1>Neuer Mitarbeiter</h1>);
        }
        return (<h1>Mitarbeiter Bearbeiten</h1>);
    }
}

interface EmployeeListEdit {
    employee:Employee
}