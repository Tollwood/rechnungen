import Link from "../common/Links";
import API from "../API";
import Employee from "./Employee";


export default class EmployeeService {

    public static fetchCurrentTechnician(technicianLink: Link, onSuccess: (employee: Employee) => void ) {
        API.get(technicianLink.href)
            .then(res => onSuccess(res.data))
    }

    public static getEmployees(onSuccess: (employees: Employee[]) => void) {
        API.get('/api/employee')
            .then(res => res.data)
            .then((data) => onSuccess(data._embedded.employee));
    }
}