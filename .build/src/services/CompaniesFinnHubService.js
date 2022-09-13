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
// import { moveSyntheticComments } from "typescript";
// import * as moment from 'moment';
var CompanyDirector_1 = require("../utils/builders/CompanyDirector");
var CompaniesFinnHubService = /** @class */ (function () {
    function CompaniesFinnHubService() {
        if (!process.env.FINNHUB_API_KEY)
            throw 'Finnhub API Key env variable not specified!';
        this._apiKey = process.env.FINNHUB_API_KEY;
        this._baseUrl = 'https://finnhub.io/api/v1';
        this._companyProfileUrl = this._baseUrl + '/stock/profile2';
        this._companyNewsUrl = this._baseUrl + '/company-news';
        this._companyStatsUrl = this._baseUrl + '/stock/metric';
        this._companyQuoteUrl = this._baseUrl + '/quote';
        this._newsArticleLimit = 10;
    }
    CompaniesFinnHubService.prototype.getCompanies = function () {
        return __awaiter(this, void 0, void 0, function () {
            var companySearchResults, url, _a, data, status, _i, data_1, c, err_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        companySearchResults = [];
                        return [4 /*yield*/, Cache_1.default.getList()];
                    case 1:
                        companySearchResults = _b.sent();
                        if (companySearchResults)
                            return [2 /*return*/, companySearchResults];
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 4, , 5]);
                        companySearchResults = []; //reinitialize
                        url = this._baseUrl + "stock/symbol?exchange=US&token=".concat(this._apiKey);
                        return [4 /*yield*/, axios_1.default.get(url)];
                    case 3:
                        _a = _b.sent(), data = _a.data, status = _a.status;
                        if (status != 200)
                            throw data;
                        for (_i = 0, data_1 = data; _i < data_1.length; _i++) {
                            c = data_1[_i];
                            companySearchResults.push({
                                name: c === null || c === void 0 ? void 0 : c.description,
                                ticker: c === null || c === void 0 ? void 0 : c.displaySymbol
                            });
                        }
                        return [2 /*return*/, companySearchResults];
                    case 4:
                        err_1 = _b.sent();
                        console.log(err_1);
                        throw new Error(err_1);
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    CompaniesFinnHubService.prototype.getCompany = function (ticker) {
        return __awaiter(this, void 0, void 0, function () {
            var company, url, _a, profile, status, d, toDate, fromDate, _b, news, newsStatus, _c, stats, statsStatus, _d, quote, quoteStatus, error_1;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        _e.trys.push([0, 5, , 6]);
                        url = this._companyProfileUrl + "?symbol=".concat(ticker, "&token=").concat(this._apiKey);
                        return [4 /*yield*/, axios_1.default.get(url)];
                    case 1:
                        _a = _e.sent(), profile = _a.data, status = _a.status;
                        if (status != 200)
                            throw profile;
                        if (!(profile === null || profile === void 0 ? void 0 : profile.name))
                            return [2 /*return*/, company]; // if no name is returned then not found, return undefined
                        d = new Date();
                        toDate = d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2);
                        d.setMonth(d.getMonth() - 1);
                        fromDate = d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2);
                        url = this._companyNewsUrl + "?symbol=".concat(ticker, "&from=").concat(fromDate, "&to=").concat(toDate, "&token=").concat(this._apiKey);
                        return [4 /*yield*/, axios_1.default.get(url)];
                    case 2:
                        _b = _e.sent(), news = _b.data, newsStatus = _b.status;
                        if (newsStatus != 200)
                            throw news;
                        //Get Company Statistics
                        url = this._companyStatsUrl + "?symbol=".concat(ticker, "&metric=all&token=").concat(this._apiKey);
                        return [4 /*yield*/, axios_1.default.get(url)];
                    case 3:
                        _c = _e.sent(), stats = _c.data, statsStatus = _c.status;
                        if (statsStatus != 200)
                            throw stats;
                        //Get Company Quote
                        url = this._companyQuoteUrl + "?symbol=".concat(ticker, "&token=").concat(this._apiKey);
                        return [4 /*yield*/, axios_1.default.get(url)];
                    case 4:
                        _d = _e.sent(), quote = _d.data, quoteStatus = _d.status;
                        if (quoteStatus != 200)
                            throw quote;
                        console.log(quote);
                        company = CompanyDirector_1.default.build(profile, quote, stats, news);
                        //TODO: create company director and builder
                        // company = {
                        //     name: profile?.name,
                        //     ticker: profile?.ticker,
                        //     country: profile?.country,
                        //     currency: profile?.currency,
                        //     exchange: profile?.exchange,
                        //     industry: profile?.finnhubIndustry,
                        //     logo: profile?.logo,
                        //     marketCapitalization: profile?.marketCapitalization,
                        //     sharesOutstanding: profile?.shareOutstanding,
                        //     website: profile?.weburl,
                        //     stockPrice: quote?.c,
                        //     stockPriceAsOfDateTime: moment().format('MM/DD/YYYY h:mm a'),
                        //     companyStats : {
                        //         revenueGrowthOneYearTTM: stats?.metric?.revenueGrowthTTMYoy,
                        //         revenueGrowthThreeYear: stats?.metric?.revenueGrowth3Y,
                        //         revenueGrowthFiveYear: stats?.metric?.revenueGrowth5Y,
                        //         quickRatioQuarterly: {
                        //             value: stats?.series?.quarterly?.quickRatio[0]?.v,
                        //             period: stats?.series?.quarterly?.quickRatio[0]?.period                    
                        //         },
                        //         currentRatioQuarterly: {
                        //             value: stats?.series?.quarterly?.currentRatio[0]?.v,
                        //             period: stats?.series?.quarterly?.currentRatio[0]?.period
                        //         },
                        //         longTermDebtToEquityQuarterly: {
                        //             value: stats?.series?.quarterly?.longtermDebtTotalEquity[0]?.v,
                        //             period: stats?.series?.quarterly?.longtermDebtTotalEquity[0]?.period 
                        //         },
                        //         totalDebtToEquityQuarterly: {
                        //             value: stats?.series?.quarterly?.totalDebtToEquity[0]?.v,
                        //             period: stats?.series?.quarterly?.totalDebtToEquity[0]?.period
                        //         },
                        //         freeCashFlowTTM: stats?.metric?.freeCashFlowTTM,
                        //         freeCashFlowPerShareTTM: stats?.metric.freeCashFlowPerShareTTM,
                        //         dividendYieldTTM: stats?.metric.currentDividendYieldTTM,
                        //         dividendGrowthRate5Y: stats?.metric.dividendGrowthRate5Y,
                        //         payoutRatioTTM: stats?.metric.payoutRatioTTM,
                        //         roicTTM: {
                        //             value: stats?.series?.quarterly?.roicTTM[0]?.v,
                        //             period: stats?.series?.quarterly?.roicTTM[0]?.period
                        //         },
                        //         roeTTM: {
                        //             value: stats?.series?.quarterly?.roeTTM[0].v,
                        //             period: stats?.series?.quarterly?.roeTTM[0].period
                        //         } 
                        //     }
                        // }
                        // if (news){
                        //     company.companyNews = [];
                        //     console.log(`orig news count ${news.length}`);
                        //     if (news.length > 0)
                        //         news = news.slice(0,this._newsArticleLimit); //limit numbers of articles returned
                        //     for (let article of news){
                        //         company.companyNews.push({                        
                        //             datetime: new Date(article?.datetime * 1000).toDateString(),
                        //             headline: article?.headline,
                        //             id: article?.id,
                        //             image: article?.image,
                        //             related: article?.related,
                        //             summary: article?.summary,
                        //             url: article?.url,
                        //             source: article?.source
                        //         });
                        //     }
                        // }
                        return [2 /*return*/, company];
                    case 5:
                        error_1 = _e.sent();
                        console.log(error_1);
                        throw new Error(error_1);
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    return CompaniesFinnHubService;
}());
exports.default = CompaniesFinnHubService;
//# sourceMappingURL=CompaniesFinnHubService.js.map