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
var moment = require("moment");
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
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13;
        return __awaiter(this, void 0, void 0, function () {
            var company, url, _14, profile, status, d, toDate, fromDate, _15, news, newsStatus, _16, stats, statsStatus, _17, quote, quoteStatus, _i, news_1, article, error_1;
            return __generator(this, function (_18) {
                switch (_18.label) {
                    case 0:
                        _18.trys.push([0, 5, , 6]);
                        url = this._companyProfileUrl + "?symbol=".concat(ticker, "&token=").concat(this._apiKey);
                        return [4 /*yield*/, axios_1.default.get(url)];
                    case 1:
                        _14 = _18.sent(), profile = _14.data, status = _14.status;
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
                        _15 = _18.sent(), news = _15.data, newsStatus = _15.status;
                        if (newsStatus != 200)
                            throw news;
                        //Get Company Statistics
                        url = this._companyStatsUrl + "?symbol=".concat(ticker, "&metric=all&token=").concat(this._apiKey);
                        return [4 /*yield*/, axios_1.default.get(url)];
                    case 3:
                        _16 = _18.sent(), stats = _16.data, statsStatus = _16.status;
                        if (statsStatus != 200)
                            throw stats;
                        //Get Company Quote
                        url = this._companyQuoteUrl + "?symbol=".concat(ticker, "&token=").concat(this._apiKey);
                        return [4 /*yield*/, axios_1.default.get(url)];
                    case 4:
                        _17 = _18.sent(), quote = _17.data, quoteStatus = _17.status;
                        if (quoteStatus != 200)
                            throw quote;
                        console.log(quote);
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
                            website: profile === null || profile === void 0 ? void 0 : profile.weburl,
                            stockPrice: quote === null || quote === void 0 ? void 0 : quote.c,
                            stockPriceAsOfDateTime: moment().format('MM/DD/YYYY h:mm a'),
                            companyStats: {
                                revenueGrowthOneYearTTM: (_a = stats === null || stats === void 0 ? void 0 : stats.metric) === null || _a === void 0 ? void 0 : _a.revenueGrowthTTMYoy,
                                revenueGrowthThreeYear: (_b = stats === null || stats === void 0 ? void 0 : stats.metric) === null || _b === void 0 ? void 0 : _b.revenueGrowth3Y,
                                revenueGrowthFiveYear: (_c = stats === null || stats === void 0 ? void 0 : stats.metric) === null || _c === void 0 ? void 0 : _c.revenueGrowth5Y,
                                quickRatioQuarterly: (_f = (_e = (_d = stats === null || stats === void 0 ? void 0 : stats.series) === null || _d === void 0 ? void 0 : _d.quarterly) === null || _e === void 0 ? void 0 : _e.quickRatio[0]) === null || _f === void 0 ? void 0 : _f.v,
                                quickRatioQuarterlyPeriod: (_j = (_h = (_g = stats === null || stats === void 0 ? void 0 : stats.series) === null || _g === void 0 ? void 0 : _g.quarterly) === null || _h === void 0 ? void 0 : _h.quickRatio[0]) === null || _j === void 0 ? void 0 : _j.period,
                                currentRatioQuarterly: (_m = (_l = (_k = stats === null || stats === void 0 ? void 0 : stats.series) === null || _k === void 0 ? void 0 : _k.quarterly) === null || _l === void 0 ? void 0 : _l.currentRatio[0]) === null || _m === void 0 ? void 0 : _m.v,
                                currentRatioQuarterlyPeriod: (_q = (_p = (_o = stats === null || stats === void 0 ? void 0 : stats.series) === null || _o === void 0 ? void 0 : _o.quarterly) === null || _p === void 0 ? void 0 : _p.currentRatio[0]) === null || _q === void 0 ? void 0 : _q.period,
                                longTermDebtToEquityQuarterly: (_t = (_s = (_r = stats === null || stats === void 0 ? void 0 : stats.series) === null || _r === void 0 ? void 0 : _r.quarterly) === null || _s === void 0 ? void 0 : _s.longtermDebtTotalEquity[0]) === null || _t === void 0 ? void 0 : _t.v,
                                longTermDebtToEquityQuarterlyPeriod: (_w = (_v = (_u = stats === null || stats === void 0 ? void 0 : stats.series) === null || _u === void 0 ? void 0 : _u.quarterly) === null || _v === void 0 ? void 0 : _v.longtermDebtTotalEquity[0]) === null || _w === void 0 ? void 0 : _w.period,
                                totalDebtToEquityQuarterly: (_z = (_y = (_x = stats === null || stats === void 0 ? void 0 : stats.series) === null || _x === void 0 ? void 0 : _x.quarterly) === null || _y === void 0 ? void 0 : _y.totalDebtToEquity[0]) === null || _z === void 0 ? void 0 : _z.v,
                                totalDebtToEquityQuarterlyPeriod: (_2 = (_1 = (_0 = stats === null || stats === void 0 ? void 0 : stats.series) === null || _0 === void 0 ? void 0 : _0.quarterly) === null || _1 === void 0 ? void 0 : _1.totalDebtToEquity[0]) === null || _2 === void 0 ? void 0 : _2.period,
                                freeCashFlowTTM: (_3 = stats === null || stats === void 0 ? void 0 : stats.metric) === null || _3 === void 0 ? void 0 : _3.freeCashFlowTTM,
                                freeCashFlowPerShareTTM: stats === null || stats === void 0 ? void 0 : stats.metric.freeCashFlowPerShareTTM,
                                dividendYieldTTM: stats === null || stats === void 0 ? void 0 : stats.metric.currentDividendYieldTTM,
                                dividendGrowthRate5Y: stats === null || stats === void 0 ? void 0 : stats.metric.dividendGrowthRate5Y,
                                payoutRatioTTM: stats === null || stats === void 0 ? void 0 : stats.metric.payoutRatioTTM,
                                roicTTM: (_6 = (_5 = (_4 = stats === null || stats === void 0 ? void 0 : stats.series) === null || _4 === void 0 ? void 0 : _4.quarterly) === null || _5 === void 0 ? void 0 : _5.roicTTM[0]) === null || _6 === void 0 ? void 0 : _6.v,
                                roicTTMPeriod: (_9 = (_8 = (_7 = stats === null || stats === void 0 ? void 0 : stats.series) === null || _7 === void 0 ? void 0 : _7.quarterly) === null || _8 === void 0 ? void 0 : _8.roicTTM[0]) === null || _9 === void 0 ? void 0 : _9.period,
                                roeTTM: (_11 = (_10 = stats === null || stats === void 0 ? void 0 : stats.series) === null || _10 === void 0 ? void 0 : _10.quarterly) === null || _11 === void 0 ? void 0 : _11.roeTTM[0].v,
                                roeTTMPeriod: (_13 = (_12 = stats === null || stats === void 0 ? void 0 : stats.series) === null || _12 === void 0 ? void 0 : _12.quarterly) === null || _13 === void 0 ? void 0 : _13.roeTTM[0].period
                            }
                        };
                        if (news) {
                            company.companyNews = [];
                            console.log("orig news count ".concat(news.length));
                            if (news.length > 0)
                                news = news.slice(0, this._newsArticleLimit); //limit numbers of articles returned
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
                    case 5:
                        error_1 = _18.sent();
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