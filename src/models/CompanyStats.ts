import Company from "./Company";
import CompanyMetric from "./CompanyMetric";

export default interface CompanyStats {
    revenueGrowthOneYearTTM?: string;
    revenueGrowthThreeYear?: string;
    revenueGrowthFiveYear?: string;
    quickRatioQuarterly?: CompanyMetric;
    currentRatioQuarterly?: CompanyMetric;
    longTermDebtToEquityQuarterly?: CompanyMetric;
    totalDebtToEquityQuarterly?: CompanyMetric;
    cashFlowPerShareTTM?: string;
    dividendYieldTTM?: string;
    dividendGrowthRate5Y?: string;
    payoutRatioTTM?: string;
    pfcfShareTTM?: string;
    roicTTM?: CompanyMetric;
    roeTTM?: CompanyMetric;
}