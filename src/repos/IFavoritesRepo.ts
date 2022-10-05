import Favorite from "../models/Favorite"

export default interface IFavoritesRepo {

    getFavorites (email: string): Promise<Favorite[]>
    addFavorite (email: string, ticker: string): Promise<Favorite>
    deleteFavorite (email: string, ticker: string): Promise<undefined>

}