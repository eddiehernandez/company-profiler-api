import Company from '../models/Company';
import ICompaniesService from '../services/ICompaniesService';

export default class CustomersController {

    private _companiesService: ICompaniesService;

    constructor (companiesService: ICompaniesService){
        this._companiesService = companiesService;
    }

    async getCompany(ticker: string): Promise<Company | undefined> {
        return await this._companiesService.getCompany(ticker);
    }

}