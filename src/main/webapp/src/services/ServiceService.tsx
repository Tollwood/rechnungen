import API from "../API";
import Service from "../order/Service";
import ErrorMapper from "../ErrorMapper";

export default class ServiceService {

    public static fetchServices(onSuccess: (result: Service[])=> void)  {
        API.get('/api/service')
            .then(res => {
                return res.data;
            })
            .then(data => {
                onSuccess(data._embedded.service);
            });
    }

    public static save(service: Service, onSuccess: () => void, onError: (errors: Map<string, string>) => void) {
        if (service._links.self === undefined) {
            API.post("/api/service", service)
                .then(onSuccess)
                .catch(error => {
                    ErrorMapper.map(error, onError)
                });
        } else {
            API.patch(service._links.self.href, service)
                .then(() => onSuccess)
                .catch(error => {ErrorMapper.map(error, onError)});
        }
    }

    public static delete(service: Service, onSuccess: () => void, onError: (errors: Map<string, string>) => void) {
        // @ts-ignore
        API.delete(service._links.self.href)
            .then(onSuccess)
            .catch(error => {ErrorMapper.map(error, onError)});
    }

}