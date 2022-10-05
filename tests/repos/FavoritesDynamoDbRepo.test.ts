import FavoritesDynamoDbRepo from "../../src/repos/FavoritesDynamoDbRepo"


test ('Get Dynamo Db favorites', async () => {
    const tableName = 'CompanyProfilerFavorites-dev'
    const dbRepo = new FavoritesDynamoDbRepo(tableName)
    const results = dbRepo.getFavorites('eddie.hernandez.us@gmail.com')
    expect(results).toBeDefined()
})