"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
var Cache_1 = require("../utils/Cache");
var CompaniesFinnHubService = /** @class */ (function () {
    function CompaniesFinnHubService() {
        this._apiKey = 'cbt802iad3i8shh4oq6g';
        this._baseUrl = 'https://finnhub.io/api/v1';
        this._companyProfileUrl = this._baseUrl + '/stock/profile2';
        this._companyNewsUrl = this._baseUrl + '/company-news';
        this._newsArticleLimit = 10;
    }
    CompaniesFinnHubService.prototype.getCompanies = function () {
        return __awaiter(this, void 0, void 0, function () {
            var companySearchResults;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        companySearchResults = [];
                        return [4 /*yield*/, Cache_1.default.getList()];
                    case 1:
                        companySearchResults = _a.sent();
                        return [2 /*return*/, companySearchResults];
                }
            });
        });
    };
    CompaniesFinnHubService.prototype.getCompany = function (ticker) {
        return __awaiter(this, void 0, void 0, function () {
            var company, url, _a, profile, status, d, toDate, fromDate, _b, news, newsStatus, _i, news_1, article, error_1;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 3, , 4]);
                        url = this._companyProfileUrl + "?symbol=".concat(ticker, "&token=").concat(this._apiKey);
                        return [4 /*yield*/, axios_1.default.get(url)];
                    case 1:
                        _a = _c.sent(), profile = _a.data, status = _a.status;
                        if (status != 200)
                            throw profile;
                        // console.log(profile);
                        if (!(profile === null || profile === void 0 ? void 0 : profile.name))
                            return [2 /*return*/, company]; // if no name is returned then not found, return undefined
                        d = new Date();
                        toDate = d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2);
                        d.setMonth(d.getMonth() - 1);
                        fromDate = d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2);
                        url = this._companyNewsUrl + "?symbol=".concat(ticker, "&from=").concat(fromDate, "&to=").concat(toDate, "&token=").concat(this._apiKey);
                        return [4 /*yield*/, axios_1.default.get(url)];
                    case 2:
                        _b = _c.sent(), news = _b.data, newsStatus = _b.status;
                        if (newsStatus != 200)
                            throw news;
                        // console.log(news); 
                        //TODO: create company director and builder
                        company = {
                            name: profile === null || profile === void 0 ? void 0 : profile.name,
                            ticker: profile === null || profile === void 0 ? void 0 : profile.ticker,
                            country: profile === null || profile === void 0 ? void 0 : profile.country,
                            currency: profile === null || profile === void 0 ? void 0 : profile.currency,
                            exchange: profile === null || profile === void 0 ? void 0 : profile.exchange,
                            industry: profile === null || profile === void 0 ? void 0 : profile.finnhubIndustry,
                            logo: profile === null || profile === void 0 ? void 0 : profile.logo,
                            marketCapitalization: profile === null || profile === void 0 ? void 0 : profile.marketCapitalization,
                            sharesOutstanding: profile === null || profile === void 0 ? void 0 : profile.shareOutstanding,
                            website: profile === null || profile === void 0 ? void 0 : profile.weburl
                        };
                        if (news) {
                            company.companyNews = [];
                            console.log("orig news count ".concat(news.length));
                            if (news.length > 0)
                                news = news.slice(0, this._newsArticleLimit); //limit numbers of articles returned
                            console.log("post news count ".concat(news.length));
                            for (_i = 0, news_1 = news; _i < news_1.length; _i++) {
                                article = news_1[_i];
                                company.companyNews.push({
                                    datetime: new Date((article === null || article === void 0 ? void 0 : article.datetime) * 1000).toDateString(),
                                    headline: article === null || article === void 0 ? void 0 : article.headline,
                                    id: article === null || article === void 0 ? void 0 : article.id,
                                    image: article === null || article === void 0 ? void 0 : article.image,
                                    related: article === null || article === void 0 ? void 0 : article.related,
                                    summary: article === null || article === void 0 ? void 0 : article.summary,
                                    url: article === null || article === void 0 ? void 0 : article.url,
                                    source: article === null || article === void 0 ? void 0 : article.source
                                });
                            }
                        }
                        return [2 /*return*/, company];
                    case 3:
                        error_1 = _c.sent();
                        console.log(error_1);
                        throw new Error(error_1);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return CompaniesFinnHubService;
}());
exports.default = CompaniesFinnHubService;
//# sourceMappingURL=CompaniesFinnHubService.js.map