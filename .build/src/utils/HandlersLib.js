"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HandlersLib = /** @class */ (function () {
    function HandlersLib() {
    }
    HandlersLib.handlerReponse = function (statusCode, body) {
        return {
            headers: { 'content-type': 'application/json' },
            statusCode: statusCode,
            body: JSON.stringify(body)
        };
    };
    return HandlersLib;
}());
exports.default = HandlersLib;
//# sourceMappingURL=HandlersLib.js.map