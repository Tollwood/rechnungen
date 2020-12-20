export class Page {
    "size": number;
    "totalElements": number = 0;
    "totalPages": number = 0;
    "number": number = 0;
    "sort": string = "";
    "direction": 'ascending' | 'descending' | undefined = 'ascending';

    constructor(sort: string, size: number = 200) {
        this.sort = sort;
        this.size = size;
    }
}