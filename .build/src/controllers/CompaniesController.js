"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CustomersController = /** @class */ (function () {
    function CustomersController(companiesService) {
        this._companiesService = companiesService;
    }
    CustomersController.prototype.getCompany = function (ticker) {
        var company = this._companiesService.getCompany(ticker);
        return company;
    };
    return CustomersController;
}());
exports.default = CustomersController;
//# sourceMappingURL=CompaniesController.js.map