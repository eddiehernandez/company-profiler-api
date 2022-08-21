"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CustomerMockRepo = /** @class */ (function () {
    function CustomerMockRepo() {
        this._customers = [];
        //load dummy data
        var customer = {
            id: 123,
            name: 'Johnny Man',
            email: 'johnny@me.com',
            company: 'ABC Healthcare System'
        };
        this._customers.push(customer);
    }
    CustomerMockRepo.prototype.getCustomer = function (id) {
        return this._customers.find(function (x) { return x.id == id; });
    };
    return CustomerMockRepo;
}());
exports.default = CustomerMockRepo;
//# sourceMappingURL=CustomerMockRepo.js.map