import API from "../API";
import Company from "../employees/Company";

export default class CompanyService {


    public static get(onSuccess: (company: Company) => void):Promise<any>  {
        return API.get('/api/company/2')
            .then(result => result.data)
            .then(data => onSuccess( data));
    }
}