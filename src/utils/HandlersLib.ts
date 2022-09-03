export default class HandlersLib {

    public static sendResponse(statusCode: number, body: any): any {
        return {
            headers: {                 	
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true,
                'content-type': 'application/json'
            },
            statusCode: statusCode,
            body: JSON.stringify(body)
        }
    }



}