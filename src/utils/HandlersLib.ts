export default class HandlersLib {

    public static sendResponse(statusCode: number, body: any): any {
        return {
            headers: { 'content-type': 'application/json'},
            statusCode: statusCode,
            body: JSON.stringify(body)
        }
    }



}