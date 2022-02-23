import API from "../API";
import Contractor from "./Contractor";
import ErrorMapper from "../ErrorMapper";

export default class ContractorService {
  public static getContractors(onSuccess: (contractors: Contractor[]) => void) {
    API.get("/api/contractors")
      .then((res) => res.data)
      .then((data) => onSuccess(data.data));
  }

  public static save(contractor: Contractor, onSuccess: () => void, onError: (errors: Map<string, string>) => void) {
    if (contractor._id === undefined) {
      API.post("/api/contractors", contractor)
        .then(onSuccess)
        .catch((errors) => ErrorMapper.map(errors, onError));
    } else {
      API.patch(`/api/contrators/${contractor._id}`, contractor)
        .then(onSuccess)
        .catch((errors) => ErrorMapper.map(errors, onError));
    }
  }

  public static delete(contractor: Contractor, onSuccess: () => void, onError: (errors: Map<string, string>) => void) {
    API.delete(`/api/contractors/${contractor._id}`)
      .then(onSuccess)
      .catch((errors) => ErrorMapper.map(errors, onError));
  }
}
