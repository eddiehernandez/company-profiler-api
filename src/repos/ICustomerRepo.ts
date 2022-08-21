import Customer from "../models/Customer";

export default interface ICustomerRepo {

    getCustomer (id: number): Customer | undefined;

}