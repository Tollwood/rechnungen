import {Address} from "../common/Address";

export default class Customer{
    salutation: string = "Familie";
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
    address: Address = new Address();
}