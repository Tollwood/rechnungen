import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios';

class API {

     public instance:  AxiosInstance= axios.create({});
     tenant = "";

     constructor(){

         this.instance.interceptors.request.use(
             request => this.requestHandler(request)
         );

         this.instance.interceptors.response.use(
             response => this.successHandler(response),
             error => this.errorHandler(error)
         );
    }


    requestHandler = (request: AxiosRequestConfig) => {
        if(this.tenant !== undefined && this.tenant !== "" ){
            request.headers['X-tenant'] = this.tenant;
        }

        return request
    };

     errorHandler = (error: Error) => {
        return Promise.reject({ ...error });
    };

    successHandler = (response: AxiosResponse) => {
        this.tenant = response.headers['X-tenant'];
        return response
    };
}

export default new API().instance