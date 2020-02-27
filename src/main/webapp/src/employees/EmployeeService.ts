import Link from "../common/Links";
import API from "../API";
import Employee from "./Employee";
import ErrorMapper from "../ErrorMapper";


export default class EmployeeService {

    public static fetchCurrentTechnician(technicianLink: Link, onSuccess: (employee: Employee) => void) {
        API.get(technicianLink.href)
            .then(res => onSuccess(res.data))
    }

    public static getEmployees(onSuccess: (employees: Employee[]) => void) {
        API.get('/api/employee')
            .then(res => res.data)
            .then((data) => onSuccess(data._embedded.employee));
    }

    public static save(employee: Employee, onSuccess: () => void, onError: (errors: Map<string, string>) => void) {
        if (employee._links.self === undefined) {
            API.post("/api/employee", employee)
                .then(onSuccess)
                .catch(errors => ErrorMapper.map(errors, onError))
        } else {
            API.patch(employee._links.self.href, employee)
                .then( onSuccess)
                .catch(errors => ErrorMapper.map(errors, onError))
        }
    }

    public static delete(employee: Employee, onSuccess: () => void, onError: (errors: Map<string, string>) => void) {
        // @ts-ignore
        API.delete(employee._links.self.href)
            .then(onSuccess)
            .catch(errors => ErrorMapper.map(errors, onError))
    }
}