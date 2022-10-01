import Company from "../../models/Company";
import * as moment from 'moment';
import FinancialUnit from "../../models/FinancialUnit";

export default class CompanyDirector {


    private static _newsArticleLimit: number = 10;
    private static _timeSeriesLimit: number = 6;


    static build (profile: any, quote: any, stats: any, news: any, financials: any): Company {

        let company: Company = {
            name: profile?.name,
            ticker: profile?.ticker,
            country: profile?.country,
            currency: profile?.currency,
            exchange: profile?.exchange,
            industry: profile?.finnhubIndustry,
            logo: profile?.logo,
            marketCapitalization: profile?.marketCapitalization,
            sharesOutstanding: profile?.shareOutstanding,
            website: profile?.weburl,
            stockPrice: quote?.c,
            stockPriceAsOfDateTime: moment().format('MM/DD/YYYY h:mm a'),
            
            companyStats : {
                revenueGrowthOneYearTTM: stats?.metric?.revenueGrowthTTMYoy,
                revenueGrowthThreeYear: stats?.metric?.revenueGrowth3Y,
                revenueGrowthFiveYear: stats?.metric?.revenueGrowth5Y,
                quickRatioQuarterly: {
                    value: stats?.series?.quarterly?.quickRatio[0]?.v,
                    period: stats?.series?.quarterly?.quickRatio[0]?.period                    
                },
                currentRatioQuarterly: {
                    value: stats?.series?.quarterly?.currentRatio[0]?.v,
                    period: stats?.series?.quarterly?.currentRatio[0]?.period
                },
                longTermDebtToEquityQuarterly: {
                    value: stats?.series?.quarterly?.longtermDebtTotalEquity[0]?.v,
                    period: stats?.series?.quarterly?.longtermDebtTotalEquity[0]?.period 
                },
                totalDebtToEquityQuarterly: {
                    value: stats?.series?.quarterly?.totalDebtToEquity[0]?.v,
                    period: stats?.series?.quarterly?.totalDebtToEquity[0]?.period
                },
                freeCashFlowTTM: stats?.metric?.freeCashFlowTTM,
                freeCashFlowPerShareTTM: stats?.metric.freeCashFlowPerShareTTM,
                dividendYieldTTM: stats?.metric.currentDividendYieldTTM,
                dividendGrowthRate5Y: stats?.metric.dividendGrowthRate5Y,
                payoutRatioTTM: stats?.metric.payoutRatioTTM,
                roicTTM: {
                    value: stats?.series?.quarterly?.roicTTM[0]?.v,
                    period: stats?.series?.quarterly?.roicTTM[0]?.period
                },
                roeTTM: {
                    value: stats?.series?.quarterly?.roeTTM[0].v,
                    period: stats?.series?.quarterly?.roeTTM[0].period
                } 
            }
        }

        //Build time series
        company.timeSeries = {
            currentRatio: [],
            totalDebtToEquity: []
        }

        //time series - current ratio
        company.timeSeries.currentRatio?.push({
            value: stats?.series?.quarterly?.currentRatio[0]?.v,
            period: stats?.series?.quarterly?.currentRatio[0]?.period
        });
        for (let currentRatio of stats?.series?.annual?.currentRatio){
            if (company?.timeSeries?.currentRatio?.length === this._timeSeriesLimit) break; 
            company?.timeSeries?.currentRatio?.push({
                value: currentRatio?.v,
                period: currentRatio?.period
            }); 
        }


        //time series - total debt to equity
        company.timeSeries.totalDebtToEquity?.push({
            value: stats?.series?.quarterly?.totalDebtToEquity[0]?.v,
            period: stats?.series?.quarterly?.totalDebtToEquity[0]?.period
        });
        for (let totalDebtToEquity of stats?.series?.annual?.totalDebtToEquity){
            if (company?.timeSeries?.totalDebtToEquity?.length === this._timeSeriesLimit) break; 
            company?.timeSeries?.totalDebtToEquity?.push({
                value: totalDebtToEquity?.v,
                period: totalDebtToEquity?.period
            }); 
        }

        //Build company news
        if (news){
            company.companyNews = [];
            console.log(`orig news count ${news.length}`);
            if (news.length > 0)
                news = news.slice(0, this._newsArticleLimit); //limit numbers of articles returned

            for (let article of news){
                company.companyNews.push({                        
                    datetime: new Date(article?.datetime * 1000).toDateString(),
                    headline: article?.headline,
                    id: article?.id,
                    image: article?.image,
                    related: article?.related,
                    summary: article?.summary,
                    url: article?.url,
                    source: article?.source
                });
            }
        }


        //Build financials
        if (financials){
            company.financials = []
            const cik = financials?.cik
            if (!cik) throw new Error('unable to find cik in financials')

            const financialsFiltered = financials?.data.filter(x => x.cik === cik)

            for (const financial of financialsFiltered){

                const balanceSheet: FinancialUnit[] = []
                for (const unit of financial?.report?.bs){
                    balanceSheet.push({
                        concept: unit?.concept,
                        unit: unit?.unit,
                        label: unit?.label,
                        value: unit?.value
                    })
                }

                const incomeStatement: FinancialUnit[] = []
                for (const unit of financial?.report?.ic){
                    incomeStatement.push({
                        concept: unit?.concept,
                        unit: unit?.unit,
                        label: unit?.label,
                        value: unit?.value
                    })
                }
                
                const cashFlowStatement: FinancialUnit[] = []
                for (const unit of financial?.report?.cf){
                    cashFlowStatement.push({
                        concept: unit?.concept,
                        unit: unit?.unit,
                        label: unit?.label,
                        value: unit?.value
                    })
                }

                company.financials.push({
                    year: financial?.year,
                    quarter: financial?.quarter,
                    form: financial?.form,
                    startDate: financial?.startDate,
                    endDate: financial?.endDate,
                    filedDate: financial?.filedDate,
                    acceptedDate: financial?.acceptedDate,
                    cik: financial?.cik,
                    balanceSheet: balanceSheet,
                    incomeStatement: incomeStatement,
                    cashFlowStatement: cashFlowStatement
                })
            }
        }

        return company;
    }





}