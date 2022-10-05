import FavoritesController from "../../controllers/FavoritesController"
import FavoritesDynamoDbRepo from "../../repos/FavoritesDynamoDbRepo"
import HandlersLib from "../../utils/HandlersLib"

const favoritesRepo = new FavoritesDynamoDbRepo(<string> process.env.DYNAMODB_TABLE)
const favoritesController = new FavoritesController(favoritesRepo)

module.exports.main = async (event) => {

    try {
        const email = process.env.NODE_ENV === 'development' ? process.env.DEV_USER : event.requestContext.authorizer.jwt.claims.email
        if (!email) throw new Error ('email not available!')

        const favs = await favoritesController.getFavorites(email)  
        return HandlersLib.sendResponse(200, favs)        
    }
    catch (e){
        return HandlersLib.sendResponse(500, {
            message: `Internal Server Error:`,
            error: e
        })
    }


}