export class Page {
    "size": number = 20;
    "totalElements": number = 0;
    "totalPages": number = 0;
    "number": number = 0;
    "sort": string = "";
    "direction": 'ascending' | 'descending' | undefined = 'ascending';

    constructor(sort: string) {
        this.sort = sort
    }
}