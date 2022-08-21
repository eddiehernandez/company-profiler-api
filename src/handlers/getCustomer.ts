"use strict";
import CustomersController from '../controllers/CustomersController';
import Customer from '../models/Customer'
import CustomerMockRepo from '../repos/CustomerMockRepo';
import ICustomerRepo from '../repos/ICustomerRepo';
import HandlersLib from '../utils/HandlersLib';

// Eventually this can be replaced by a factory.  For now just directly instantiating for testing purposes.
const _customersRepo: ICustomerRepo = new CustomerMockRepo()
const _customersController: CustomersController = new CustomersController(_customersRepo)

module.exports.main = async (event) => {

    const id: number = event.pathParameters?.id
    if (!id) 
        return HandlersLib.handlerReponse(404, {
            message: `Customer id is missing in path parameter. (i.e. /customers/123)`
        })

    const response = _customersController.getCustomer(id)

    if (!response)
        return HandlersLib.handlerReponse(404, {
            message: `Customer not found for id of ${id}`
        })
    
    return HandlersLib.handlerReponse(200, response)
}
