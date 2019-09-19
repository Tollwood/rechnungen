import {Address} from "../common/Address";
import Link from "../common/Links";

export default class RealEstate {
    id?: bigint;
    name: string = "";
    address: Address = new Address();
    _links: {self?: Link} = {};
}