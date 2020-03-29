import {Address} from "../common/Address";

export default class Customer{
    salutation?: string;
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
    address: Address = new Address();
}