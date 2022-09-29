import Company from "../models/Company";
import CompanySearchResult from "../models/CompanySearchResult";
import ICompaniesService from "./ICompaniesService";
import axios from 'axios';
import Cache from "../utils/Cache";
// import { moveSyntheticComments } from "typescript";
// import * as moment from 'moment';
import CompanyDirector from "../utils/builders/CompanyDirector";



export default class CompaniesFinnHubService implements ICompaniesService {

    private _apiKey: string
    private _baseUrl: string
    private _companyProfileUrl: string
    private _companyNewsUrl: string
    private _companyStatsUrl: string
    private _companyQuoteUrl: string
    private _companyFinancialsUrl: string


    constructor (){
        if (!process.env.FINNHUB_API_KEY) throw 'Finnhub API Key env variable not specified!'
        this._apiKey = <string> process.env.FINNHUB_API_KEY
        this._baseUrl = 'https://finnhub.io/api/v1'
        this._companyProfileUrl = this._baseUrl + '/stock/profile2'
        this._companyNewsUrl = this._baseUrl + '/company-news'
        this._companyStatsUrl = this._baseUrl + '/stock/metric'
        this._companyQuoteUrl = this._baseUrl + '/quote'
        this._companyFinancialsUrl = this._baseUrl + '/stock/financials-reported'
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

            //Get Company Financials
            url = this._companyFinancialsUrl + `?symbol=${ticker}&freq=annual&token=${this._apiKey}`
            console.log(`financials url = ${url}`)
            const { data: financials, status: financialsStatus } = await axios.get<any>(url)
            if (financialsStatus != 200) throw financialsStatus
            
            company = CompanyDirector.build(profile, quote, stats, news, financials)
  
            return company;
    
        }
        catch (error){
            // console.log(error);
            throw new Error(error);
        }

    }
    
}