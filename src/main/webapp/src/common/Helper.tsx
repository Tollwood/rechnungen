export default class Helper {
    public static isEmpty(value?: string) {
        return value === null || value === undefined || value.length > 0 ;
    }
}