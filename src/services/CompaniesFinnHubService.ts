import Company from "../models/Company";
import ICompaniesService from "./ICompaniesService";
import axios from 'axios';

export default class CompaniesFinnHubService implements ICompaniesService {

    private _apiKey: string;
    private _baseUrl: string;

    constructor (){
        this._apiKey = 'cbt802iad3i8shh4oq6g';
        this._baseUrl = 'https://finnhub.io/api/v1/';
    }

    async getCompany(ticker: string): Promise<Company | undefined> {

        let company : Company | undefined;

        try {
            let url = this._baseUrl + `stock/profile2?symbol=${ticker}&token=${this._apiKey}`;
            const { data, status } = await axios.get<any>(url);

            if (status != 200) throw data;
            console.log(data);
            if (!data?.name) return company; // if no name is returned then not found, return undefined

            //TODO: create company director and builder
            company = {
                name: data?.name,
                ticker: data?.ticker
            }
  
            return company;
    
        }
        catch (error){
            console.log(error);
            throw new Error(error);
        }

    }
    
}