import CompanyNews from "./CompanyNews";

export default interface Company {
    ticker: string;
    name: string;
    country?: string;
    currency?: string;
    exchange?: string;
    industry?: string;
    logo?: string;
    marketCapitalization?: string;
    sharesOutstanding?: string;
    website?: string;
    companyNews?: CompanyNews[];
}