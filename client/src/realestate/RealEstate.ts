import { Address } from "../common/Address";

export default class RealEstate {
  _id?: number;
  name?: string;
  address: Address = new Address();
  distance: number = 0;
}
