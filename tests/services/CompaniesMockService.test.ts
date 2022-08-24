import CompaniesMockService from "../../src/services/CompaniesMockService"
import ICompaniesService from "../../src/services/ICompaniesService";

const companiesMockService : ICompaniesService = new CompaniesMockService();

test ('CompaniesMockService getCompany valid ticker', async () => {
    const company = await companiesMockService.getCompany('abc')
    expect(company?.name).toBe('ABC Company, Inc.');
})

test ('CompaniesMockService getCompany return undefined', async () => {
    const company = await companiesMockService.getCompany('test')
    expect(company).toBeUndefined()
})