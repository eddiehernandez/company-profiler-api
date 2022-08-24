import CompaniesController from '../../src/controllers/CompaniesController';
import Company from '../../src/models/Company';
import CompaniesMockService from '../../src/services/CompaniesMockService';
import ICompaniesService from '../../src/services/ICompaniesService';

const companiesService: ICompaniesService = new CompaniesMockService();
const companiesController: CompaniesController = new CompaniesController(companiesService);

test ('companies controller sanity tests', async () => {
    let company;

    company = await companiesController.getCompany('abc');
    expect(company).toBeDefined();

    company = await companiesController.getCompany('test');  
    expect(company).toBeUndefined();

})