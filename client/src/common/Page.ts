export class Page {
  size: number;
  totalElements: number = 0;
  totalPages: number = 0;
  number: number = 0;
  sort?: string;
  direction?: string = undefined;

  constructor(sort: string, size: number = 20) {
    this.sort = sort;
    this.size = size;
  }
}
