"use strict";
import CompaniesController from '../controllers/CompaniesController';
import CompaniesMockService from '../services/CompaniesMockService';
import ICompaniesService from '../services/ICompaniesService';
import HandlersLib from '../utils/HandlersLib';

const _companiesService: ICompaniesService = new CompaniesMockService();
const _companiesController: CompaniesController = new CompaniesController(_companiesService);

module.exports.main = async (event) => {

    const ticker: string = event.pathParameters?.ticker
    if (!ticker) 
        return HandlersLib.handlerReponse(400, {
            message: `Company ticker is missing in path parameter. (i.e. /companies/goog)`
        })
    
    try {
        const company = _companiesController.getCompany(ticker);

        if (!company)
            return HandlersLib.handlerReponse(404, {
                message: `Company not found with ticker ${ticker}`
            })
        
        return HandlersLib.handlerReponse(200, company)
    }
    catch (e){
        return HandlersLib.handlerReponse(500, {
            message: `Internal Server Error:`,
            error: e
        })
    }

}
