import Company from "../models/Company";
import ICompaniesService from "./ICompaniesService";

export default class CompaniesMockService implements ICompaniesService {
    getCompany(ticker: string): Company {
        const mockCompany: Company = {
            name: 'ABC Company, Inc.',
            ticker: ticker
        }
        return mockCompany;
    }
    
}