import API from "../API";
import Link from "../common/Links";
import RealEstate from "./RealEstate";

export default class RealEstateService {

    public static  fetchRealEstates(onSuccess: (realEstates: RealEstate[]) => void) {
        API.get('/api/realestate')
            .then(res => res.data)
            .then((data) => {
                onSuccess(data._embedded.realestate)
            });
    }

    public static  fetchCurrentRealEstate(realEstateLink: Link, onSuccess: (realEstate: RealEstate) => void) {
        API.get(realEstateLink.href)
            .then(res => {
                onSuccess(res.data);
            });
    }

}