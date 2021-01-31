export default class Product {
  id?: number;
  articleNumber: string = "";
  title: string = "";
  price: number = 0;
  selectable: boolean = true;
  serviceCatalogId: number = -1;
}
