"use strict";
import CompaniesController from '../controllers/CompaniesController';
import CompaniesFinnHubService from '../services/CompaniesFinnHubService';
// import CompaniesMockService from '../services/CompaniesMockService';
import ICompaniesService from '../services/ICompaniesService';
import HandlersLib from '../utils/HandlersLib';

// const _companiesService: ICompaniesService = new CompaniesMockService();
const _companiesService: ICompaniesService = new CompaniesFinnHubService();
const _companiesController: CompaniesController = new CompaniesController(_companiesService);

module.exports.main = async (event) => {
  
    try {
        const companiesList = await _companiesController.getCompanies();
        return HandlersLib.sendResponse(200, companiesList)
    }
    catch (e){
        return HandlersLib.sendResponse(500, {
            message: `Internal Server Error:`,
            error: e
        })
    }

}
