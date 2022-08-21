"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CompaniesMockService = /** @class */ (function () {
    function CompaniesMockService() {
    }
    CompaniesMockService.prototype.getCompany = function (ticker) {
        var mockCompany = {
            name: 'ABC Company, Inc.',
            ticker: ticker
        };
        return mockCompany;
    };
    return CompaniesMockService;
}());
exports.default = CompaniesMockService;
//# sourceMappingURL=CompaniesMockService.js.map