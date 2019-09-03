import Employee from "./Employee";
import * as React from "react";

interface EmployeeListProps {
    onAddEmployee:()=>void,
    onSelectEmployee:(selectedEmployee: Employee)=>void,
    employees:Employee[]
}

export default class EmployeeList extends React.Component<EmployeeListProps> {

    render () {
         return (
            <table className="ui compact celled table selectable" >
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
                        <div className="ui right floated small primary labeled icon button" onClick={this.props.onAddEmployee}>
                            <i className="user icon"/> Add User
                        </div>
                    </th>
                </tr>
                </tfoot>
            </table>
        )

    }

    private renderRow(employee: Employee) {
        return <tr onClick={()=>{this.props.onSelectEmployee(employee)}}>
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
