(function () {
    var moment = require('moment');
    var commonServices = require('../services/commonServices');
    var responseHandler = require('../helpers/responseHandler');

    module.exports = function (options) {
        var authHandler = function (req, res, next) {
            var sesssionId = req.headers['sessionid'];
            var token = req.headers['token'];
            //console.log(1);
            // console.log(sesssionId);
            // console.log(req.headers);
                if (sesssionId && token) {
                        //console.log(1);
                        commonServices.checksession(sesssionId,function (err, data) {
                            if(err){
                                return authHandler.authFailure('Authentication error ',res);
                            }
                            else{
                                if (data.length === 0){
                                return authHandler.authFailure('Noo such session exists',res);
                                }
                                else {
                                    var originalToken = data[0].token;
                                    if (originalToken === token) {
                                        var expiry = data[0].expiry;
                                        // console.log(expiry);
                                        // console.log(moment.now());
                                        if(expiry > moment.now()){
                                           // console.log(11);
                                            next();

                                        }
                                        else{
                                            commonServices.deletesession(data[0].email,function (err, data) {
                                                if(err){
                                                    console.log(err);
                                                    authHandler.authFailure('Something went wrong',res);
                                                }
                                                else{
                                                    authHandler.authFailure('Session expired',res);
                                                }
                                            })
                                        }
                                    }
                                    else{
                                        return authHandler.authFailure('Invalid token',res);
                                    }
                                }
                            }
                        })
                }
                else{
                    authHandler.authFailure('Empty header',res);
                }
        };
        authHandler.authFailure = function(msg,res){
            var error = {};
            error.message = msg;
            error.statusCode = 401;
            responseHandler.error(res,error);
        };
        return authHandler;
    }
})();