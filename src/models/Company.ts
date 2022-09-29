import CompanyNews from "./CompanyNews";
import CompanyStats from "./CompanyStats";
import Financials from "./Financials";
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
    financials?: Financials[];
    companyStats?: CompanyStats;
    timeSeries?: TimeSeries;
    companyNews?: CompanyNews[];
}