import Customer from '../models/Customer'
import ICustomerRepo from './ICustomerRepo';


export default class CustomerMockRepo implements ICustomerRepo {

    private _customers: Array<Customer> = [];


    constructor (){

        //load dummy data
        const customer: Customer = {
            id : 123,
            name : 'Johnny Man',
            email : 'johnny@me.com',
            company : 'ABC Healthcare System'    
        }
        this._customers.push(customer);
    }

    public getCustomer(id: number): Customer | undefined {
        return this._customers.find(x => {return x.id == id})
    }


}