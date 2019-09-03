import Employee from "./Employee";
import * as React from "react";
import EmployeeList from "./EmployeeList";
import EmployeeEdit from "./EmployeeEdit";
import API from "../API";

interface EmployeeOverviewState {
    employees: Employee[]
    selectedEmployee: Employee,
    editEmployee: boolean
}

export default class EmployeeOverview extends React.Component<{},EmployeeOverviewState> {

    constructor(props: {}) {
        super(props);
        this.state = {employees:[], editEmployee: false, selectedEmployee: new Employee()};
    }

    componentDidMount(): void {
        this.refresh();
    }

    render () {
        return (
            <div>
                <EmployeeList employees={this.state.employees}
                              onAddEmployee={this.handleAddEmployee.bind(this)}
                              onSelectEmployee={(employee: Employee) =>{this.handleSelectedEmployee(employee)}}/>
                {!this.state.editEmployee? null:
                    <EmployeeEdit employee={this.state.selectedEmployee}
                                  onCancelEdit={this.handleCancelEdit.bind(this)}
                                  onSave={this.handleSavedEmployee.bind(this)}
                    /> }
            </div>

        );
    }

    private handleAddEmployee(){
        this.setState(Object.assign(this.state, {editEmployee:true, selectedEmployee: new Employee()}))
    }

    private handleSelectedEmployee(selectedEmployee: Employee){
        this.setState(Object.assign(this.state, {editEmployee:true, selectedEmployee: selectedEmployee}))
    }

    private handleCancelEdit(){
        this.setState(Object.assign(this.state, {editEmployee:false, selectedEmployee: new Employee()}))
    }

    private handleSavedEmployee(){
        this.setState(Object.assign(this.state, {editEmployee:false, selectedEmployee: new Employee()}));
        this.refresh();

    }

    private refresh() {
        API.get(`/employee`)
            .then(res => {
                console.log(res);
                console.log(res.data);
                return res.data;
            })
            .then(data => this.setState({ employees: data._embedded.employee}));
    }
}

