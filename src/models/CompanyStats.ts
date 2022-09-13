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
    freeCashFlowTTM?: string;
    freeCashFlowPerShareTTM?: string;
    dividendYieldTTM?: string;
    dividendGrowthRate5Y?: string;
    payoutRatioTTM?: string;
    roicTTM?: CompanyMetric;
    roeTTM?: CompanyMetric;
}