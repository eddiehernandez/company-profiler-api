import CompaniesMockService from "../../src/services/CompaniesMockService"
import ICompaniesService from "../../src/services/ICompaniesService";

test ('CompaniesMockService getCompany sanity', () => {
    const companiesMockService : ICompaniesService = new CompaniesMockService();
    expect(companiesMockService.getCompany('test').ticker).toBe('test');
})