import FinancialUnit from "./FinancialUnit";

export default interface Financials {
    year: string;
    quarter: string;
    form: string;
    startDate: string;
    endDate: string;
    filedDate: string;
    acceptedDate: string;
    balanceSheets: FinancialUnit[];
    incomeStatements: FinancialUnit[];
    cashFlowStatements: FinancialUnit[];
}