import CompanyNews from "./CompanyNews";
import CompanyStats from "./CompanyStats";
import TimeSeries from "./TimeSeries";

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
    stockPrice?: string;
    stockPriceAsOfDateTime?: string;
    companyStats?: CompanyStats;
    timeSeries?: TimeSeries;
    companyNews?: CompanyNews[];
}