import API from "../API";
import Service from "../order/Service";

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

}