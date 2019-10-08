import {AxiosRequestConfig} from "axios";

export class JwtTokenInterceptor{
    private token: string;

    constructor(jwtToken:string) {
    this.token = jwtToken;
    }

    public intercept(request: AxiosRequestConfig) {
        request.headers['Authorization'] = 'Bearer ' + this.token;
        return request
    }
}