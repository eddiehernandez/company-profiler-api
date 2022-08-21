import CustomersController from '../../src/controllers/CustomersController'
import CustomerMockRepo from '../../src/repos/CustomerMockRepo';
import ICustomerRepo from '../../src/repos/ICustomerRepo';

const customersRepo: ICustomerRepo = new CustomerMockRepo()

test ('customers controller get valid customer', () => {
    const customersController = new CustomersController(customersRepo);
    const id: number = 123;
    expect(customersController.getCustomer(id)?.name).toBe('Johnny Man');
})