(function () {
    var responseHandler = require('../helpers/responseHandler');
    var commonServices = require('../services/commonServices');

    module.exports.registerSport = function (req, res) {
        try{
            //var sessionId = req.headers['sessionid'];
            var email = req.headers['email'];
            var sportId = req.body.sportId;
            var param = {};
            param.email = email;
            param.sportId =  sportId;
            //console.log(sportId);
            if(sportId) {
                commonServices.checkAvailability(sportId,function (err, data) {
                    //console.log(data);
                    if(data[0].count > 15){
                        var err= {};
                        err.statusCode = 403;
                        err.message = "Registration full";
                        responseHandler.error(res,err);
                    }
                    else{
                        commonServices.checkRegistration(param,function (err, data) {
                            if(err){
                                responseHandler.error(res,err);
                            }
                            else{
                               // console.log(data);
                                if(data.length === 0){
                                    commonServices.registerSport(param,function (err, data) {
                                        if(err){
                                            responseHandler.error(res,err);
                                        }
                                        else{
                                            data = "Registration successful";
                                            responseHandler.response(res,data);
                                        }
                                    })
                                }
                                else {
                                    var err = {};
                                    err.statusCode = 420;
                                    err.message = 'Already Registered';
                                    responseHandler.error(res,err);
                                }
                            }
                        })
                    }
                });
            }
            else{
                var err ={};
                err.statusCode = 400;
                err.message = "Empty Body";
                responseHandler.error(res,err);
            }

        }
        catch (err){
            responseHandler.error(res,err);
        }
    };

    module.exports.getUsers = function (req, res) {
        try{
            commonServices.getUsers(function (err, data) {
                if(data.length === 0){
                    var err = {};
                    err.statusCode = 401;
                    err.message = "No users found";
                    responseHandler.error(res,err);
                }
                else{
                    responseHandler.response(res,data);
                }
            })
        }
        catch(err){
            responseHandler.error(res,err);
        }
    };

    module.exports.viewSport = function (req,res) {
        try {
            var param = req.body.sportId;
            //console.log(param);
            commonServices.viewSport(param,function (err, data) {
                if(err){
                    responseHandler.error(res,err);
                }
                else{
                    if(data.length === 0){
                        var err = {};
                        err.statusCode = 401;
                        err.message = 'No users registered for selected sport.';
                        responseHandler.error(res,err);
                    }
                    else {
                        responseHandler.response(res, data);
                    }
                }
            })
        }
        catch (err){
            responseHandler.error(res,err);
        }
    }

})();