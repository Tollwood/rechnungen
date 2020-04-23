import API from "../API";
import Category from "./Category";
import Company from "../employees/Company";
import ErrorMapper from "../ErrorMapper";

export default class CategoryService {

    public static get(onSuccess: (categories: Category[]) => void)  {
        API.get('/api/category')
            .then(res => onSuccess( res.data._embedded.category));
    }

    public static getFromUrl(url:string, onSuccess: (categories: Category[]) => void)  {
        API.get(url)
            .then(res => onSuccess( res.data._embedded.category));
    }

    static delete(category: Category, onSuccess: () => void, onError: (errors: Map<string, string>) => void) {
        // @ts-ignore
        API.delete(category._links.self.href)
            .then(onSuccess)
            .catch(error => {
                ErrorMapper.map(error, onError)
            });
    }

    static save(category: Category, company: Company, onSuccess: () => void, onError: (errors: Map<string, string>) => void) {
        category.services = [];
        if (category._links.self === undefined) {
            API.post("/api/category", category)
                .then(result => result.data)
                .then((data: any) => Object.assign(new Category(), data))
                .then(onSuccess)
                .catch(error => {ErrorMapper.map(error, onError)
                });
        } else {
            API.patch(category._links.self.href, category)
                .then(result => result.data)
                .then((data: any) => Object.assign(new Category(), data))
                .then(onSuccess)
                .catch(error => ErrorMapper.map(error, onError));
        }
    }
}