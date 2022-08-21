import Company from "../models/Company";

export default interface ICompaniesService {


    getCompany(ticker: string): Company


}