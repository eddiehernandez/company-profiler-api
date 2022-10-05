import Favorite from "../models/Favorite";
import IFavoritesRepo from "../repos/IFavoritesRepo";

export default class FavoritesController {

    private _favoritesRepo: IFavoritesRepo

    constructor (favoritesRepo: IFavoritesRepo){
        this._favoritesRepo = favoritesRepo
    }


    async getFavorites (email: string): Promise<Favorite[]> {
        return await this._favoritesRepo.getFavorites(email)
    }

    async addFavorite (email: string, ticker: string): Promise<Favorite> {
        return await this._favoritesRepo.addFavorite(email, ticker)
    }

    async deleteFavorite (email: string, ticker: string): Promise<undefined> {
        return await this._favoritesRepo.deleteFavorite(email, ticker)
    }


}