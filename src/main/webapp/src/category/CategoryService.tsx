import API from "../API";
import Category from "./Category";

export default class CategoryService {

    public static get(onSuccess: (categories: Category[]) => void)  {
        API.get('/api/category')
            .then(res => onSuccess( res.data._embedded.category));
    }
}