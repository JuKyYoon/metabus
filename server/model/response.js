export default class response {
    constructor(statusCode, status, message, result) {
        this.statusCode = statusCode;
        this.status = status;
        this.message = message;
        this.result = result;
    }
}
