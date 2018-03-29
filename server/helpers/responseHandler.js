(function () {
    var responseHandler = {
        error : function (res,err) {
            var statusCode = err.statusCode ? err.statusCode : 500;
            var stack = err.stack ? err.stack : "unknown stack";
            var message = err.message ? err.message : "unknown error occured";
            var errCode = err.code ? err.code : "Unknown code";
            var json = {};
            json.statusCode = statusCode;
            json.stack = stack;
            json.message = message;
            json.errorCode = errCode;
            res.status(statusCode).json(json);
        },
        response : function (res,data) {
            var json = {};
            json.statusCode = 200;
            json.message = 'success';
            json.response = data;
            res.status(200).json(json);
        }
    };
    module.exports = responseHandler;
})();