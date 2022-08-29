import Company from '../models/Company';
import CompanySearchResult from '../models/CompanySearchResult';
import ICompaniesService from '../services/ICompaniesService';

export default class CustomersController {

    private _companiesService: ICompaniesService;

    constructor (companiesService: ICompaniesService){
        this._companiesService = companiesService;
    }

    async getCompany(ticker: string): Promise<Company | undefined> {
        return await this._companiesService.getCompany(ticker);
    }

    async getCompanies(): Promise<CompanySearchResult[] | undefined> {
        return await this._companiesService.getCompanies();
    }

}