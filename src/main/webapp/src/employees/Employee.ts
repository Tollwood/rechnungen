
export default class Employee {
    id?: bigint;
    firstName: string = "";
    lastNname: string = "";
    address?: Address;
    taxIdent: string = ""
}

interface  Address {
    street: string,
    houseNumber: string,
    zipCode: string,
    city: string
}