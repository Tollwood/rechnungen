import Employee from "./Employee";
import * as React from "react";
import {Button} from "semantic-ui-react";

interface EmployeeListProps {
    onAddEmployee:()=>void,
    onSelectEmployee:(selectedEmployee: Employee)=>void,
    employees:Employee[]
}

export default class EmployeeList extends React.Component<EmployeeListProps> {

    render () {
         return (
            <table className="ui compact celled table selectable employee-list" >
                <thead>
                <tr>
                    <th>Monteur</th>
                    <th>Vorname</th>
                    <th>Nachname</th>
                    <th>Steuernummer</th>
                    <th>Adresse</th>
                </tr>
                </thead>
                <tbody>
                {this.props.employees.map(employee => this.renderRow(employee))}
                </tbody>
                <tfoot className="full-width">
                <tr>
                    <th colSpan={5}>
                        <Button floated={"right"} primary icon={{name:"user icon"}} label={"Add User"} onClick={this.props.onAddEmployee} className={"add"}/>
                    </th>
                </tr>
                </tfoot>
            </table>
        )
    }

    private renderRow(employee: Employee) {
        return <tr onClick={()=>{this.props.onSelectEmployee(employee)} } key={employee.technicianId} className={"row-"+employee.technicianId}>
            <td>{employee.technicianId}</td>
            <td>{employee.firstName}</td>
            <td>{employee.lastName}</td>
            <td>{employee.taxIdent}</td>
            <td>
                <div>
                    <div>{employee.address.street} {employee.address.houseNumber}</div>
                    <div>{employee.address.zipCode} {employee.address.city}</div>
                </div>
            </td>

        </tr>;
    }
}
