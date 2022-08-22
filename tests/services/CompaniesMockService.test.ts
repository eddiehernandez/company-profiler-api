import CompaniesMockService from "../../src/services/CompaniesMockService"
import ICompaniesService from "../../src/services/ICompaniesService";

const companiesMockService : ICompaniesService = new CompaniesMockService();

test ('CompaniesMockService getCompany valid ticker', () => {
    expect(companiesMockService.getCompany('abc')?.name).toBe('ABC Company, Inc.');
})

test ('CompaniesMockService getCompany return undefined', () => {
    expect(companiesMockService.getCompany('dummyticker')).toBeUndefined()
})