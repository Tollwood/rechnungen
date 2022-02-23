import API from "../API";
import Service from "../order/Service";
import ErrorMapper from "../ErrorMapper";

export default class ServiceService {
  public static fetchServices(onSuccess: (result: Service[]) => void) {
    API.get("/api/services")
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        onSuccess(data.data);
      });
  }

  public static save(service: Service, onSuccess: () => void, onError: (errors: Map<string, string>) => void) {
    if (service.id === undefined) {
      API.post("/api/services", service)
        .then(onSuccess)
        .catch((error) => {
          ErrorMapper.map(error, onError);
        });
    } else {
      API.patch(`/api/services/${service.id}`, service)
        .then(onSuccess)
        .catch((error) => {
          ErrorMapper.map(error, onError);
        });
    }
  }

  public static delete(service: Service, onSuccess: () => void, onError: (errors: Map<string, string>) => void) {
    // @ts-ignore
    API.delete(`/api/services/${service.id}`)
      .then(onSuccess)
      .catch((error) => {
        ErrorMapper.map(error, onError);
      });
  }
}
