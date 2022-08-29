import Company from "../models/Company";
import CompanySearchResult from "../models/CompanySearchResult";

export default interface ICompaniesService {


    getCompany(ticker: string): Promise<Company | undefined>
    getCompanies(): Promise<CompanySearchResult[] | undefined> 


}