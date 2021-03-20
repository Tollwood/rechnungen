import API from "../API";
import Employee from "./Employee";
import ErrorMapper from "../ErrorMapper";

export default class EmployeeService {
  public static getEmployees(onSuccess: (employees: Employee[]) => void) {
    API.get("/api/employees")
      .then((res) => res.data)
      .then((data) => onSuccess(data.data));
  }

  public static save(employee: Employee, onSuccess: () => void, onError: (errors: Map<string, string>) => void) {
    if (employee.id === undefined) {
      API.post("/api/employees", employee)
        .then(onSuccess)
        .catch((errors) => ErrorMapper.map(errors, onError));
    } else {
      API.patch(`/api/employees/${employee.id}`, employee)
        .then(onSuccess)
        .catch((errors) => ErrorMapper.map(errors, onError));
    }
  }

  public static delete(employee: Employee, onSuccess: () => void, onError: (errors: Map<string, string>) => void) {
    API.delete(`/api/employees/${employee.id}`)
      .then(onSuccess)
      .catch((errors) => ErrorMapper.map(errors, onError));
  }
}
