import Employee from "./Employee";
import * as React from "react";
import {Button, Placeholder} from "semantic-ui-react";

interface EmployeeListProps {
    onAddEmployee: () => void,
    onSelectEmployee: (selectedEmployee: Employee) => void,
    employees: Employee[]
    isLoading: boolean
}

export default class EmployeeList extends React.Component<EmployeeListProps> {

    render() {
        return (
            <React.Fragment>
                <Button floated={"right"}
                        primary
                        icon={{name: "user icon"}}
                        label={"Mitarbeiter hinzufügen"}
                        onClick={this.props.onAddEmployee}
                        className={"add"}
                />
                <table className="ui compact celled table selectable employee-list">
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
                    {this.renderRows()}
                    </tbody>
                </table>
            </React.Fragment>
        )
    }

    private renderRow(employee: Employee) {
        return <tr onClick={() => {
            this.props.onSelectEmployee(employee)
        }} key={employee.technicianId} className={"row-" + employee.technicianId}>
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

    private renderRows() {

        if (this.props.isLoading) {
            return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(numer => this.placeHolderRow())
        }
        return this.props.employees.map(employee => this.renderRow(employee))
    }

    private placeHolderRow() {
        return <tr>
            <td>
                <Placeholder>
                    <Placeholder.Paragraph>
                        <Placeholder.Line/>
                    </Placeholder.Paragraph>
                </Placeholder>
            </td>
            <td>
                <Placeholder>
                    <Placeholder.Paragraph>
                        <Placeholder.Line/>
                    </Placeholder.Paragraph>
                </Placeholder>
            </td>
            <td>
                <Placeholder>
                    <Placeholder.Paragraph>
                        <Placeholder.Line/>
                    </Placeholder.Paragraph>
                </Placeholder>
            </td>
            <td>
                <Placeholder>
                    <Placeholder.Paragraph>
                        <Placeholder.Line/>
                    </Placeholder.Paragraph>
                </Placeholder>
            </td>
            <td>
                <Placeholder>
                    <Placeholder.Paragraph>
                        <Placeholder.Line/>
                        <Placeholder.Line/>
                    </Placeholder.Paragraph>
                </Placeholder>
            </td>
        </tr>;
    }
}
