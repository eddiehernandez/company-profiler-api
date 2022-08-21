import CustomerMockRepo from "../../src/repos/CustomerMockRepo"
import ICustomerRepo from "../../src/repos/ICustomerRepo"

const customerRepo: ICustomerRepo = new CustomerMockRepo()

test ('get valid mock customer test', () => {
    const customer = customerRepo.getCustomer(123)
    expect(customer?.name).toBe('Johnny Man')
})


test('get undefined mock customer test', () => {
    const customer = customerRepo.getCustomer(321)
    expect(customer).toBeUndefined()

})