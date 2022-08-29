import Company from "../models/Company";
import CompanySearchResult from "../models/CompanySearchResult";
import ICompaniesService from "./ICompaniesService";

export default class CompaniesMockService implements ICompaniesService {
    
    getCompanies(): Promise<CompanySearchResult[] | undefined> {
        throw new Error("Method not implemented.");
    }
    async getCompany(ticker: string): Promise<Company | undefined> {
        let mockCompany: Company | undefined;
        if (ticker == 'abc')
            mockCompany = {
                name: 'ABC Company, Inc.',
                ticker: ticker
            };
        return mockCompany;
    }
    
}