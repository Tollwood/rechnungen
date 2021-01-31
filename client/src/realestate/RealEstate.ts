import { Address } from "../common/Address";

export default class RealEstate {
  id?: number;
  name?: string;
  address: Address = new Address();
  distance: number = 0;
}
