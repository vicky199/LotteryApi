let Response = function (success, data, message, status) {
    this.data = data,
        this.message = message,
        this.status = status,
        this.success = success
}
module.exports = Response;