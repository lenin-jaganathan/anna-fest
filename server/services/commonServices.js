(function () {
    var commonDao = require('../dao/commonDao');
    var connection = require('../config/connection');

    module.exports.beginTransaction = function (callback) {
        try{
            connection.beginTransaction(function (err){
             callback(err);
            });
        }
        catch (err) {
            callback(err);
        }
    };

    module.exports.rollback = function (callback) {
        try{
            connection.rollback(function (err) {
                callback(err);
            })
        }
        catch (err){
            callback(err);
        }
    };

    module.exports.commit = function (callback) {
        try {
         connection.commit(function (err) {
             console.log(10);

             callback(err);
         })
        }
        catch (err){
            callback(err);
        }
    };

    module.exports.register = function (param,callback) {
        commonDao.register(param,callback);
    };


    module.exports.enterOtp = function(param,callback){
        commonDao.enterOtp(param,callback);
    };

    module.exports.checkOtp = function(param,callback){
       // console.log(param);
        commonDao.checkOtp(param,callback);
    };

    module.exports.deleteOtp = function(param,callback){
        commonDao.deleteOtp(param,callback);
    };


    module.exports.checkUser = function (param, callback) {
      commonDao.checkUser(param,callback);
    };

    module.exports.login = function (param, callback) {
        commonDao.login(param,callback);
    };

    module.exports.entersession = function (param, callback) {
        commonDao.entersession(param,callback);
    };

    module.exports.checksession = function(sessionId,callback){
        commonDao.checksession(sessionId,callback);
    };

    module.exports.deletesession = function (email, callback) {
        commonDao.deletesession(email,callback);
    };

    module.exports.logout = function (sessionId, callback) {
        commonDao.logout(sessionId,callback);
    };

    module.exports.checkRegistration = function (param, callback) {
        commonDao.checkRegistration(param,callback);
    };

    module.exports.registerSport = function (param, callback) {
        console.log(param);
        commonDao.registerSport(param,callback);
    };

    module.exports.getUsers = function (callback) {
        commonDao.getUsers(callback);
    };

    module.exports.viewSport = function (param, callback) {
        commonDao.viewSport(param,callback);
    };

    module.exports.checkAvailability = function(param,callback){
        commonDao.checkAvailability(param,callback);
    };

    module.exports.getOtp = function(param,callback){
        commonDao.getOtp(param,callback);
    };

    module.exports.updatestatus = function(param,callback){
        commonDao.updatestatus(param,callback);
    }


})();