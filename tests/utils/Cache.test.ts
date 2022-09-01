import Cache from '../../src/utils/Cache';

test ('Get list from cache, sanity test', async () => {
    const companyList = Cache.getList();
    expect(companyList).toBeDefined;
})

