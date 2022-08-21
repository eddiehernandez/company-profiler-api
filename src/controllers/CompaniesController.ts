import Company from '../models/Company';
import ICompaniesService from '../services/ICompaniesService';

export default class CustomersController {

    private _companiesService: ICompaniesService;

    constructor (companiesService: ICompaniesService){
        this._companiesService = companiesService;
    }

    getCompany(ticker: string): Company | undefined {
        const company: Company = this._companiesService.getCompany(ticker);
        return company;
    }


}