import API from "../API";
import Service from "../order/Service";
import ErrorMapper from "../ErrorMapper";
import Company from "../employees/Company";

export default class ServiceService {

    public static async fetchServicesFromUrl(url: string): Promise<Service[]> {
        let result: any =  await API.get(url);
        let services: Service[] = result.data._embedded.service;
        return new Promise<Service[]>((resolve, reject) => {
            resolve(services);
        });
    }

    public static fetchServices(onSuccess: (result: Service[]) => void) {
        API.get('/api/service')
            .then(res => {
                onSuccess(res.data._embedded.service);
            });
    }

    public static save(service: Service, company: Company, onSuccess: () => void, onError: (errors: Map<string, string>) => void) {
        service.image = service.image === "" ? '/products/' + company.name + '/placeholder.png' : service.image;

        service.company = company._links.self!.href;
        if (service._links.self === undefined) {
            API.post("/api/service", service)
                .then(onSuccess)
                .catch(error => {
                    ErrorMapper.map(error, onError)
                });
        } else {
            API.patch(service._links.self.href, service)
                .then(() => onSuccess)
                .catch(error => {
                    ErrorMapper.map(error, onError)
                });
        }
    }

    public static delete(service: Service, onSuccess: () => void, onError: (errors: Map<string, string>) => void) {
        // @ts-ignore
        API.delete(service._links.self.href)
            .then(onSuccess)
            .catch(error => {
                ErrorMapper.map(error, onError)
            });
    }

}