import Employee from "./Employee";
import * as React from "react";
import EmployeeList from "./EmployeeList";
import EmployeeEdit from "./EmployeeEdit";
import API from "../API";
import Company from "./Company";

interface Props {
    company:Company
}

interface EmployeeOverviewState {
        employees: Employee[]
    selectedEmployee: Employee,
    editEmployee: boolean,
    isLoading: boolean
}

export default class EmployeeOverview extends React.Component<Props, EmployeeOverviewState> {

    constructor(props: Props) {
        super(props);
        this.state = {employees: [], editEmployee: false, selectedEmployee: new Employee(), isLoading: true};
    }

    componentDidMount(): void {
        this.refresh();
    }

    render() {
        return (
            <div className={"employee-overview"}>
                {this.state.editEmployee ? null :
                    <EmployeeList employees={this.state.employees}
                                  onAddEmployee={this.handleAddEmployee.bind(this)}
                                  onSelectEmployee={(employee: Employee) => {
                                      this.handleSelectedEmployee(employee)
                                  }}
                                  isLoading={this.state.isLoading}/>}
                {!this.state.editEmployee ? null :
                    <EmployeeEdit company={this.props.company} employee={this.state.selectedEmployee}
                                  onCancelEdit={this.handleCancelEdit.bind(this)}
                                  onSave={this.handleSavedEmployee.bind(this)}
                    />}
            </div>

        );
    }

    private handleAddEmployee() {
        this.setState(Object.assign(this.state, {editEmployee: true, selectedEmployee: new Employee()}))
    }

    private handleSelectedEmployee(selectedEmployee: Employee) {
        this.setState(Object.assign(this.state, {editEmployee: true, selectedEmployee: selectedEmployee}))
    }

    private handleCancelEdit() {
        this.setState(Object.assign(this.state, {editEmployee: false, selectedEmployee: new Employee()}))
    }

    private handleSavedEmployee() {
        this.setState(Object.assign(this.state, {editEmployee: false, selectedEmployee: new Employee()}));
        this.refresh();

    }

    private refresh() {
        this.setState({isLoading: true});
        API.get('/api/employee')
            .then(res => {
                console.log(res);
                console.log(res.data);
                return res.data;
            })
            .then(data => this.setState({employees: data._embedded.employee}))
            .finally(() => this.setState({isLoading: false}));
    }
}

