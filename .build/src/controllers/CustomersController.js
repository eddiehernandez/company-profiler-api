"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CustomersController = /** @class */ (function () {
    function CustomersController(customersRepo) {
        this._customersRepo = customersRepo;
    }
    CustomersController.prototype.getCustomer = function (id) {
        return this._customersRepo.getCustomer(id);
    };
    return CustomersController;
}());
exports.default = CustomersController;
//# sourceMappingURL=CustomersController.js.map