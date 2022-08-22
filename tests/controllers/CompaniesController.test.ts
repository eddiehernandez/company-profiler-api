import CompaniesController from '../../src/controllers/CompaniesController';
import CompaniesMockService from '../../src/services/CompaniesMockService';
import ICompaniesService from '../../src/services/ICompaniesService';

const companiesService: ICompaniesService = new CompaniesMockService();
const companiesController: CompaniesController = new CompaniesController(companiesService);

test ('companies controller sanity tests', () => {
    expect(companiesController.getCompany('abc')).toBeDefined();
    expect(companiesController.getCompany('test')).toBeUndefined();

})