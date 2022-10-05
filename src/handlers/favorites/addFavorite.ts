import FavoritesController from "../../controllers/FavoritesController"
import FavoritesDynamoDbRepo from "../../repos/FavoritesDynamoDbRepo"
import HandlersLib from "../../utils/HandlersLib"

const favoritesRepo = new FavoritesDynamoDbRepo(<string> process.env.DYNAMODB_TABLE)
const favoritesController = new FavoritesController(favoritesRepo)

module.exports.main = async (event) => {

    const timestamp = new Date().getTime()

    try {
        const email = process.env.NODE_ENV === 'development' ? process.env.DEV_USER : event.requestContext.authorizer.jwt.claims.email
        if (!email) throw new Error ('email not available!')

        const { ticker } = JSON.parse(event?.body)
        if (!ticker)
            return HandlersLib.sendResponse(400, {
                message: `ticker missing in body`
            })

        const response = await favoritesController.addFavorite(email, ticker)
        return HandlersLib.sendResponse(201, response)

    }
    catch (e){
        return HandlersLib.sendResponse(500, {
            message: `Internal Server Error:`,
            error: e
        })
    }




}