(function () {
    var responseHandler = require('../helpers/responseHandler');
    var transactionHandler = require('../helpers/transactionHandler');
    var commonServices = require('../services/commonServices');
    var randtoken = require('rand-token');
    var randnumber = require('rand-token').generator({
        chars : '0-9'
    });
    var mailService = require('../services/sendMail');
    var Cryptr = require('cryptr');
    cryptr = new Cryptr('myTotalySecretKey');
    var moment = require('moment');


    module.exports.register = function (req,res) {
        try {
            if (req.body.user) {
                commonServices.beginTransaction(function (err) {
                    if (err) {
                        responseHandler.error(res, err);
                    }
                    else
                    {
                        var param = req.body.user;
                        var mail = param.email;
                        commonServices.checkUser(mail,function (err, data) {
                            if(err){
                                transactionHandler.rollBackHandler(res,err);
                            }
                            else{
                                if(data.length === 0) {
                                    param.password = cryptr.encrypt(param.password);
                                    commonServices.register(param, function (err, data) {
                                        if (err) {
                                            // console.log(err.code);
                                            transactionHandler.rollBackHandler(res,err);
                                        }
                                        else {
                                            var email = param.email;
                                            commonServices.checkOtp(email,function (err,data) {
                                                if(err){
                                                    transactionHandler.rollBackHandler(res,err);
                                                }
                                                else{
                                                    console.log(data.length);
                                                    if(data.length > 0){
                                                        //console.log(2);
                                                        commonServices.deleteOtp(email,function (err, data) {
                                                            if (err) {
                                                                transactionHandler.rollBackHandler(res, err);
                                                            }
                                                            else{
                                                                var para = {};
                                                                para.otp = randnumber.generate(8);
                                                                para.email = param.email;
                                                                para.expiry = (moment(moment.now()).add(300,'minutes'))*1;
                                                                //console.log(2);
                                                                commonServices.enterOtp(param,function (err,data) {
                                                                    if(err){
                                                                        transactionHandler.rollBackHandler(res,err);
                                                                    }
                                                                    else{
                                                                        //console.log(3);
                                                                        mailService.sendVerification(mail, otp, function (err, data) {
                                                                            if (err) {
                                                                                var err = {};
                                                                                err.statusCode = 406;
                                                                                err.message = "Unable to send mail";
                                                                                transactionHandler.rollBackHandler(res,err);
                                                                            }
                                                                            else{
                                                                                data = "Insertion success";
                                                                                transactionHandler.commitHandler(res,data);
                                                                            }
                                                                        });
                                                                    }
                                                                });
                                                            }
                                                        })
                                                    }
                                                    else{
                                                        var para = {};
                                                        var otp = randnumber.generate(8);
                                                        para.otp = otp;
                                                        para.email = param.email;
                                                        para.expiry = (moment(moment.now()).add(30,'minutes'))*1;
                                                        console.log(2);
                                                        commonServices.enterOtp(para,function (err,data) {
                                                            if(err){
                                                                transactionHandler.rollBackHandler(res,err);
                                                            }
                                                            else{
                                                                console.log(3);
                                                                mailService.sendVerification(mail, otp, function (err, data) {
                                                                    if (err) {
                                                                        var err = {};
                                                                        err.statusCode = 406;
                                                                        err.message = "Unable to send mail";
                                                                        transactionHandler.rollBackHandler(res,err);
                                                                    }
                                                                    else{
                                                                        data = "Insertion success";
                                                                        transactionHandler.commitHandler(res,data);
                                                                    }
                                                                });
                                                            }
                                                        });
                                                    }
                                                }
                                            });
                                        }
                                    });
                                }
                                else{
                                    var err= {};
                                    err.statusCode = 420;
                                    err.message = "User already exists";
                                    transactionHandler.rollBackHandler(res,err);
                                }
                            }
                        });
                    }
                });
            }

            else {
                var err = {};
                err.statusCode = 400;
                err.message = "Empty Body";
                responseHandler.error(res, err);
            }
        }
        catch (err){
            responseHandler.error(res,err);
        }
    };

    module.exports.login = function (req, res) {
        try{
            if(req.body.user){
                var param = req.body.user;
                // console.log(param);
                commonServices.login(param,function (err, data) {
                    if(err){
                        responseHandler.error(res,err);
                    }
                    else{
                        // console.log(1);
                        if(data.length === 1) {
                            if (data[0].verified !== 0) {
                                //console.log(data[0].verified);
                                if (cryptr.decrypt(data[0].password) === param.password) {
                                    data = {};
                                    var sessionID = randtoken.generate(16);
                                    var token = randtoken.generate(8);
                                    data.email = param.email;
                                    data.sessionID = sessionID;
                                    data.token = token;
                                    data.expiry = (moment(moment.now()).add(12, 'hours')) * 1;
                                    commonServices.entersession(data, function (err, data) {
                                        if (err) {
                                            responseHandler.error(res, err);
                                        }
                                        else {
                                            var dat = {};
                                            dat.sessionID = sessionID;
                                            dat.token = token;
                                            dat.email = param.email;
                                            // console.log(moment.now());
                                            // console.log((moment(moment.now()).add(1,'days'))*1);
                                            responseHandler.response(res, dat);
                                        }
                                    });
                                }
                                else {
                                    var err = {};
                                    err.statusCode = 420;
                                    err.message = "Incorrect password";
                                    err.code = "Password error";
                                    responseHandler.error(res, err);
                                }
                            }
                            else {
                                var err = {};
                                err.statusCode = 421;
                                err.message = "User not verified";
                                responseHandler.error(res, err);
                            }
                        }
                        else{
                            var err = {};
                            err.statusCode = 404;
                            err.message = "user does not exists";
                            responseHandler.error(res,err);
                        }
                    }
                })
            }
            else{
                var err = {};
                err.statusCode = 400;
                err.message = "Empty Body";
                responseHandler.error(res,err);
            }
        }
        catch (err){
            responseHandler.error(res,err);
        }
    };

    module.exports.logout = function (req, res) {
        try{
            var sessionId = req.headers['sessionid'];
            var token = req.headers['token'];
            console.log(sessionId);
            if(token && sessionId){
                commonServices.checksession(sessionId,function (err, data) {
                    if(err){
                        responseHandler.error(res,err);
                    }
                    else{
                        if(data.length ===0){
                            var error = {};
                            error.statusCode = 401;
                            error.message = "Session does not exists. Login to continue";
                            responseHandler.error(res,error);
                        }
                        else {
                            if (data[0].token === token) {
                                commonServices.logout(sessionId,function (err, data) {
                                    if(err){
                                        var error = {};
                                        error.statusCode = 401;
                                        error.message = "Something went wrong.";
                                        responseHandler.error(res,error);
                                    }
                                    else{
                                        var data = {};
                                        data.message = "Log out sucessful";
                                        responseHandler.response(res,data);
                                    }
                                })
                            }
                            else {
                                var err = {};
                                err.statusCode = 401;
                                err.message = "Invalid token";
                                responseHandler.error(res, err);
                            }
                        }
                    }
                })
            }
            else{
                var error = {};
                error.statusCode = 401;
                error.message = "Empty header";
                responseHandler.error(res,error);
            }
        }
        catch (err){
            responseHandler.error(res,err);
        }
    };

    module.exports.submitOtp = function (req, res) {
        try{
            if(req.body) {
                var param = req.body.otp;
                commonServices.beginTransaction(function (err) {
                    if(err){
                        responseHandler.error(res,err);
                    }
                    else{
                        //console.log(param.email);
                        commonServices.checkOtp(param.email,function (err, data) {
                            if(err){
                                transactionHandler.rollBackHandler(res,err)
                            }
                            else{
                                if(data.length === 0) {
                                    var error = {};
                                    error.statusCode = 401;
                                    error.message = "User does not exists.Please signup";
                                    transactionHandler.rollBackHandler(res,error);
                                }
                                else
                                {
                                    //console.log(data);
                                    // if(data[0].verified === 0) {
                                    if(data[0].otp = param.otp){
                                        //console.log(param.email);
                                        commonServices.login(param,function (err,data) {
                                            if(err){
                                                transactionHandler.rollBackHandler(res,err);
                                            }
                                            else{
                                                console.log(data);
                                                if(data[0].verified === 0) {
                                                    commonServices.updatestatus(param.email, function (err, data) {
                                                        if (err) {
                                                            transactionHandler.rollBackHandler(res,err);
                                                        }
                                                        else {
                                                            commonServices.deleteOtp(param.email,function (err, data) {
                                                                if(err){
                                                                   transactionHandler.rollBackHandler(re,err);
                                                                }
                                                                else{
                                                                   transactionHandler.commitHandler(res,data);
                                                                }
                                                            })
                                                        }
                                                    });
                                                }
                                                else{
                                                    var error = {};
                                                    error.statusCode = 405;
                                                    error.message = "User alredy verified.Login to continue.";
                                                    transactionHandler.rollBackHandler(res,error);
                                                }
                                            }
                                        });
                                    }
                                    else{
                                        var error = {};
                                        error.statusCode = 404;
                                        error.message = "Invalid otp.";
                                        transactionHandler.rollBackHandler(res,error);
                                    }
                                }
                            }
                        });
                    }
                })
            }
        }
        catch (err){
            responseHandler.error(res,err);
        }
    }
})();