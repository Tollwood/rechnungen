import { ObjectId } from "mongodb";

export default class Service {
  constructor(
    public serviceCatalogId: String, 
    public articleNumber: String, 
    public title: String,  
    public price: number,
    public selectable: boolean,
    public id?: ObjectId) {}
}


}
