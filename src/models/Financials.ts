import FinancialUnit from "./FinancialUnit";

export default interface Financials {
    year: string;
    quarter: string;
    form: string;
    startDate: string;
    endDate: string;
    filedDate: string;
    acceptedDate: string;
    cik: string;
    balanceSheet: FinancialUnit[];
    incomeStatement: FinancialUnit[];
    cashFlowStatement: FinancialUnit[];
}