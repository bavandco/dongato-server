module.exports = class {
    constructor(
        status,
        statusCode,
        data = null
    ) {
        this.status = status;
        this.statusCode = statusCode;
        this.data = data
    }
}