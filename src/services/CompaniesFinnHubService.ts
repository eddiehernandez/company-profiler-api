import Company from "../models/Company";
import CompanySearchResult from "../models/CompanySearchResult";
import ICompaniesService from "./ICompaniesService";
import axios from 'axios';
import Cache from "../utils/Cache";
import { moveSyntheticComments } from "typescript";
import * as moment from 'moment';



export default class CompaniesFinnHubService implements ICompaniesService {

    private _apiKey: string
    private _baseUrl: string
    private _companyProfileUrl: string
    private _companyNewsUrl: string
    private _companyStatsUrl: string
    private _companyQuoteUrl: string
    private _newsArticleLimit: number

    constructor (){
        if (!process.env.FINNHUB_API_KEY) throw 'Finnhub API Key env variable not specified!'
        this._apiKey = <string> process.env.FINNHUB_API_KEY
        this._baseUrl = 'https://finnhub.io/api/v1'
        this._companyProfileUrl = this._baseUrl + '/stock/profile2'
        this._companyNewsUrl = this._baseUrl + '/company-news'
        this._companyStatsUrl = this._baseUrl + '/stock/metric'
        this._companyQuoteUrl = this._baseUrl + '/quote'
        this._newsArticleLimit = 10
    }

    async getCompanies(): Promise<CompanySearchResult[] | undefined> {
        let companySearchResults: Array<CompanySearchResult> | undefined = [];
        companySearchResults = await Cache.getList();
        if (companySearchResults) return companySearchResults;

        // TODO create a factory for cache.  If dev pull from local, if prod pull from S3
        // create abstract class for cache
        // create concrete class for local (file), dev/prod (s3)

        try {
            companySearchResults = []; //reinitialize
            let url = this._baseUrl + `stock/symbol?exchange=US&token=${this._apiKey}`;
            const { data, status } = await axios.get<any>(url);

            if (status != 200) throw data;
            for (let c of data){
                companySearchResults.push({
                    name: c?.description,
                    ticker: c?.displaySymbol
                })
            }

            return companySearchResults;
        }
        catch (err){
            console.log(err);
            throw new Error(err);
        }
    }

    async getCompany(ticker: string): Promise<Company | undefined> {

        let company : Company | undefined;

        try {
            //Get Profile
            let url = this._companyProfileUrl + `?symbol=${ticker}&token=${this._apiKey}`;
            const { data: profile, status } = await axios.get<any>(url);
            if (status != 200) throw profile;
            if (!profile?.name) return company; // if no name is returned then not found, return undefined

            //Get Company News
            const d: Date = new Date();
            const toDate: string = d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2);
            d.setMonth(d.getMonth() - 1)
            const fromDate: string = d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2);
            url = this._companyNewsUrl + `?symbol=${ticker}&from=${fromDate}&to=${toDate}&token=${this._apiKey}`
            let { data: news, status: newsStatus } = await axios.get<any>(url)
            if (newsStatus != 200) throw news
            
            //Get Company Statistics
            url = this._companyStatsUrl + `?symbol=${ticker}&metric=all&token=${this._apiKey}`
            const { data: stats, status: statsStatus } = await axios.get<any>(url)
            if (statsStatus != 200) throw stats

            //Get Company Quote
            url = this._companyQuoteUrl + `?symbol=${ticker}&token=${this._apiKey}`
            const { data: quote, status: quoteStatus } = await axios.get<any>(url)
            if (quoteStatus != 200) throw quote
            console.log(quote);
  




            //TODO: create company director and builder
            company = {
                name: profile?.name,
                ticker: profile?.ticker,
                country: profile?.country,
                currency: profile?.currency,
                exchange: profile?.exchange,
                industry: profile?.finnhubIndustry,
                logo: profile?.logo,
                marketCapitalization: profile?.marketCapitalization,
                sharesOutstanding: profile?.shareOutstanding,
                website: profile?.weburl,
                stockPrice: quote?.c,
                stockPriceAsOfDateTime: moment().format('MM/DD/YYYY h:mm a'),
                companyStats : {
                    revenueGrowthOneYearTTM: stats?.metric?.revenueGrowthTTMYoy,
                    revenueGrowthThreeYear: stats?.metric?.revenueGrowth3Y,
                    revenueGrowthFiveYear: stats?.metric?.revenueGrowth5Y,
                    quickRatioQuarterly: stats?.series?.quarterly?.quickRatio[0]?.v,
                    quickRatioQuarterlyPeriod: stats?.series?.quarterly?.quickRatio[0]?.period,                    
                    currentRatioQuarterly: stats?.series?.quarterly?.currentRatio[0]?.v,
                    currentRatioQuarterlyPeriod: stats?.series?.quarterly?.currentRatio[0]?.period,
                    longTermDebtToEquityQuarterly: stats?.series?.quarterly?.longtermDebtTotalEquity[0]?.v,
                    longTermDebtToEquityQuarterlyPeriod: stats?.series?.quarterly?.longtermDebtTotalEquity[0]?.period,
                    totalDebtToEquityQuarterly: stats?.series?.quarterly?.totalDebtToEquity[0]?.v,
                    totalDebtToEquityQuarterlyPeriod: stats?.series?.quarterly?.totalDebtToEquity[0]?.period,
                    freeCashFlowTTM: stats?.metric?.freeCashFlowTTM,
                    freeCashFlowPerShareTTM: stats?.metric.freeCashFlowPerShareTTM,
                    dividendYieldTTM: stats?.metric.currentDividendYieldTTM,
                    dividendGrowthRate5Y: stats?.metric.dividendGrowthRate5Y,
                    payoutRatioTTM: stats?.metric.payoutRatioTTM,
                    roicTTM: stats?.series?.quarterly?.roicTTM[0]?.v,
                    roicTTMPeriod: stats?.series?.quarterly?.roicTTM[0]?.period,
                    roeTTM: stats?.series?.quarterly?.roeTTM[0].v,
                    roeTTMPeriod: stats?.series?.quarterly?.roeTTM[0].period
                }
            }

            if (news){
                company.companyNews = [];
                console.log(`orig news count ${news.length}`);
                if (news.length > 0)
                    news = news.slice(0,this._newsArticleLimit); //limit numbers of articles returned

                for (let article of news){
                    company.companyNews.push({                        
                        datetime: new Date(article?.datetime * 1000).toDateString(),
                        headline: article?.headline,
                        id: article?.id,
                        image: article?.image,
                        related: article?.related,
                        summary: article?.summary,
                        url: article?.url,
                        source: article?.source
                    });
                }
            }
  
            return company;
    
        }
        catch (error){
            console.log(error);
            throw new Error(error);
        }

    }
    
}