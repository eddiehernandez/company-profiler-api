import IFavoritesRepo from "./IFavoritesRepo";
import Favorite from "../models/Favorite";

import { DynamoDBClient, QueryCommand, DeleteItemCommand } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand, QueryCommandInput, DeleteCommand } from "@aws-sdk/lib-dynamodb";


export default class FavoritesDynamoDbRepo implements IFavoritesRepo {

    private _tableName: string

    // Dynamo Client params
    private _region = process.env.AWS_REGION
    private _ddbClient: DynamoDBClient
    private _ddbDocClient: DynamoDBDocumentClient


    constructor (tableName: string) {
        this._tableName = tableName
        this._ddbClient = new DynamoDBClient({ region: this._region})

        const marshallOptions = {
            convertEmptyValues: false,
            removeUndefinedValues: false,
            convertClassInstanceToMap: false
        }

        const unmarshallOptions = {
            wrapNumbers: false
        }

        const translateConfig = { marshallOptions, unmarshallOptions }

        this._ddbDocClient = DynamoDBDocumentClient.from(this._ddbClient, translateConfig)
    }


    async getFavorites(email: string): Promise<Favorite[]> {
        
        let results: Favorite[] = []

        try {

            const params: QueryCommandInput = {
                TableName: this._tableName,
                KeyConditionExpression: "email = :e",
                ExpressionAttributeValues: {
                    ":e": {S: email}
                },
                ProjectionExpression: "email, ticker"
            }

            const data = await this._ddbClient.send(new QueryCommand(params))

            if (data?.Items)
                for (let item of data.Items){
                    const email: string = <string> item.email.S
                    const ticker: string = <string> item.ticker.S

                    results.push({
                        email: email,
                        ticker: ticker
                    })
                }

            return results
        }
        catch (error){
            console.error(error)
            throw new Error(error.message)
        }

    }

    async addFavorite(email: string, ticker: string): Promise<Favorite> {

        const favorite: Favorite = {
            email: email,
            ticker: ticker
        }

        const params = {
            TableName: this._tableName,
            Item: favorite
        }

        try {
            const data = await this._ddbDocClient.send(new PutCommand(params))
            return favorite

        }
        catch (error){
            throw new Error(error.message)
        }

    }

    async deleteFavorite(email: string, ticker: string): Promise<undefined> {
        
        const params = {
            TableName: this._tableName,
            Key: {
                email: { S: email },
                ticker: { S: ticker }

            }
        }
        try {
            await this._ddbDocClient.send(new DeleteItemCommand(params))
            return
        }
        catch (error){
            console.error(error.message)
            throw new Error(error)
        }
        
    }

}