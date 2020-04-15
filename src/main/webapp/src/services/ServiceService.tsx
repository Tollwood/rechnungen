import API from "../API";
import Service from "../order/Service";
import ErrorMapper from "../ErrorMapper";
import Company from "../employees/Company";

export default class ServiceService {

    public static async fetchServicesFromUrl(url: string): Promise<Service[]> {
        let result: any = await API.get(url);
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

    public static save(service: Service, company: Company, onSuccess: () => void, onError: (errors: Map<string, string>) => void, categories?: string[], image?: File) {
        service.image = service.image === "" ? '/services/' + company.name + '/placeholder.png' : service.image;

        service.company = company._links.self!.href;
        if (service._links.self === undefined) {
            API.post("/api/service", service)
                .then(() => {
                    if(image && categories){
                        ServiceService.addImage(service._links.self!.href + "/image", image, ()=>{
                            ServiceService.addCategories(service._links.self!.href + "/categories", categories, onSuccess)
                        });
                    }else if(image && categories === undefined){
                        ServiceService.addImage(service._links.self!.href + "/image", image, onSuccess);
                    } else if (categories && image === undefined) {
                        ServiceService.addCategories(service._links.self!.href + "/categories", categories, onSuccess)
                    } else {
                        onSuccess()
                    }
                })
                .catch(error => {
                    ErrorMapper.map(error, onError)
                });
        } else {
            API.patch(service._links.self.href, service)
                .then(() => {
                    if(image && categories){
                        ServiceService.addImage(service._links.self!.href + "/image", image, ()=>{
                            ServiceService.addCategories(service._links.self!.href + "/categories", categories, onSuccess)
                        });
                    }else if(image && categories === undefined){
                        ServiceService.addImage(service._links.self!.href + "/image", image, onSuccess);
                    } else if (categories && image === undefined) {
                        ServiceService.addCategories(service._links.self!.href + "/categories", categories, onSuccess)
                    } else {
                        onSuccess()
                    }
                })
                .catch(error => {
                    ErrorMapper.map(error, onError)
                });
        }
    }

    public static addCategories(url: string, categories: string[], onSuccess: () => void) {
        let data: string = categories.join("\n");
        API.put(url, data, {
            headers: {
                'Content-Type': 'text/uri-list',
            }
        }).then(onSuccess)
    }

    public static delete(service: Service, onSuccess: () => void, onError: (errors: Map<string, string>) => void) {
        // @ts-ignore
        API.delete(service._links.self.href)
            .then(onSuccess)
            .catch(error => {
                ErrorMapper.map(error, onError)
            });
    }

    private static addImage(url: string, image: File, onSuccess: () => void) {
        const formData = new FormData();
        formData.append('file', image);
        API.post(url, formData)
            .then(res => {
                onSuccess()
            })
    }
}