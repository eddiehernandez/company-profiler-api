import CompanyMetric from "./CompanyMetric";

export default interface TimeSeries {
    currentRatio?: CompanyMetric[];
    totalDebtToEquity?: CompanyMetric[];
}