export default class ErrorMapper {
    static map(error: any, state: any) {
        if (error.response && error.response.status === 400) {
            state.setState({errors: new Map(Object.entries(error.response.data))});
        }
    }

    static childError(map: Map<string, string>): Map<string, string> {
        let newMap = new Map<string, string>();
        map.forEach((value, key) => {
            let newKey = key.substr(key.indexOf(".") + 1);
            newMap.set(newKey, value);
        });
        return newMap;
    }

    static removeError(errors: Map<string,string>, field:string): Map<string,string>{
        errors.delete(field);
        return errors;
    }
}