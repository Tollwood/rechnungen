import API from "../API";
import Link from "../common/Links";
import RealEstate from "./RealEstate";
import ErrorMapper from "../ErrorMapper";
import Order from "../order/Order";

export default class RealEstateService {

    public static fetchRealEstates(onSuccess: (realEstates: RealEstate[]) => void) {
        API.get('/api/realestate')
            .then(res => res.data)
            .then((data) => {
                onSuccess(data._embedded.realestate)
            });
    }

    public static fetchCurrentRealEstate(realEstateLink: Link, onSuccess: (realEstate: RealEstate) => void) {
        API.get(realEstateLink.href)
            .then(res => {
                onSuccess(res.data);
            });
    }

    public static save(realEstate: RealEstate, onSuccess: (realEstate: RealEstate) => void, onError: (errors: Map<string, string>) => void) {
        if (realEstate._links.self === undefined) {
            API.post("/api/realestate", realEstate)
                .then(result => result.data)
                .then((data: any) => Object.assign(new RealEstate(), data))
                .then(onSuccess)
                .catch(error => {ErrorMapper.map(error, onError)
                });
        } else {
            API.patch(realEstate._links.self.href, realEstate)
                .then(result => result.data)
                .then((data: any) => Object.assign(new Order(), data))
                .then(onSuccess)
                .catch(error => ErrorMapper.map(error, onError));
        }
    }

    public static delete(realEstate: RealEstate, onSuccess: () => void, onError: (errors: Map<string, string>) => void) {
        // @ts-ignore
        API.delete(realEstate._links.self.href)
            .then(onSuccess)
            .catch(error => {ErrorMapper.map(error, onError)});
    }
}