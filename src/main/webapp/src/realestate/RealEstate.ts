import {Links} from "../common/Links";
import {Address} from "../common/Address";

export default class RealEstate {
    id?: bigint;
    name: string = "";
    address: Address = new Address();
    _links?: Links;
}