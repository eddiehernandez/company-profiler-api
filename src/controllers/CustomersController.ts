import Customer from "../models/Customer";
import ICustomerRepo from "../repos/ICustomerRepo";

export default class CustomersController {

    private _customersRepo: ICustomerRepo

    constructor (customersRepo: ICustomerRepo){
        this._customersRepo = customersRepo
    }

    getCustomer(id: number): Customer | undefined {
        return this._customersRepo.getCustomer(id)
    }


}