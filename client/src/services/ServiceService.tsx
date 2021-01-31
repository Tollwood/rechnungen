import API from "../API";
import Service from "../order/Product";
import ErrorMapper from "../ErrorMapper";

export default class ServiceService {
  public static fetchServices(onSuccess: (result: Service[]) => void) {
    API.get("/api/products")
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        onSuccess(data.data);
      });
  }

  public static save(service: Service, onSuccess: () => void, onError: (errors: Map<string, string>) => void) {
    if (service.id === undefined) {
      API.post("/api/products", service)
        .then(onSuccess)
        .catch((error) => {
          ErrorMapper.map(error, onError);
        });
    } else {
      API.patch(`/api/products/${service.id}`, service)
        .then(onSuccess)
        .catch((error) => {
          ErrorMapper.map(error, onError);
        });
    }
  }

  public static delete(service: Service, onSuccess: () => void, onError: (errors: Map<string, string>) => void) {
    // @ts-ignore
    API.delete(`/api/products/${service.id}`)
      .then(onSuccess)
      .catch((error) => {
        ErrorMapper.map(error, onError);
      });
  }
}
