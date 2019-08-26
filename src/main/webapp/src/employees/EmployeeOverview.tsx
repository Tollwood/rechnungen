import Employee from "./Employee";
import * as React from "react";
import EmployeeList from "./EmployeeList";
import EmployeeEdit from "./EmployeeEdit";

export default class EmployeeOverview extends React.Component<{},EmployeeOverviewState> {

    constructor(props: EmployeeOverviewState) {
        super(props);
        this.state = { employees: [] };
    }

    render () {


        return (
            <div>
                <h1>Mitarbeiter Verwalten</h1>
                {this.state.selectedEmployee? (<EmployeeEdit />) : (<EmployeeList/>)}
            </div>

        );
    }
}

interface EmployeeOverviewState {
    employees:Employee[],
    selectedEmployee?: Employee
}