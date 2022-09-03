import CompanySearchResult from "../models/CompanySearchResult";
import * as companies from '../data/companies.json';

export default class Cache {
    public static async getList(): Promise<CompanySearchResult[] | undefined> {
        // console.log(companies);

        if (!companies) return;

        let companySearchResults: CompanySearchResult[] = [];
        let importedCompanies: Array<any> = <any[]> companies; //cast to an array
        importedCompanies = importedCompanies.filter(c => {return (c.mic !== 'OOTC')}) // filter out over the counter symbols
        for (let c of importedCompanies){
            companySearchResults.push({
                name: c?.description,
                ticker: c?.displaySymbol
            })
        }
        companySearchResults.sort((x: CompanySearchResult, y: CompanySearchResult) => { return x.ticker < y.ticker ? -1: 1; })
        console.log(companySearchResults.length);
        return companySearchResults;
    }

    public static async setList(companySearchList: Array<CompanySearchResult>){
        
    }
}