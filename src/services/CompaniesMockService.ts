import Company from "../models/Company";
import ICompaniesService from "./ICompaniesService";

export default class CompaniesMockService implements ICompaniesService {
    getCompany(ticker: string): Company | undefined {
        let mockCompany: Company | undefined;
        if (ticker == 'abc')
            mockCompany = {
                name: 'ABC Company, Inc.',
                ticker: ticker
            };
        return mockCompany;
    }
    
}