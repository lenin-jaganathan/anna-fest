(function () {

    var connection = require('../config/connection');
    var moment = require('moment');

    module.exports.register = function (param, callback) {
        try {
            //console.log(param);
            var query = 'insert into users set ?';
            // console.log(param.phone);
            connection.query(query, param, function (err, data) {
                callback(err, data);
            });
        }
        catch (err){
            callback(err);
        }
    };

    module.exports.checkUser = function(param,callback){
      try {
          var query = 'select id from users where email =?';
          connection.query(query,param,function (err, data) {
           callback(err,data);
          })
      }
      catch (err){
          callback(err);
      }

    };

    module.exports.checkOtp = function (param, callback) {
        try {
            //console.log(param);
            var query = 'select * from  verification where email = "'+param+'";';
            // console.log(param.phone);
            connection.query(query, function (err, data) {
                //console.log(data);
                callback(err, data);
            });
        }
        catch (err){
            callback(err);
        }
    };


    module.exports.deleteOtp = function (param, callback) {
        try {
            var query = 'delete  from  verification where email = "'+param+'";';
            // console.log(param.phone);
            connection.query(query, function (err, data) {
                callback(err, data);
            });
        }
        catch (err){
            callback(err);
        }
    };

    module.exports.getOtp = function (param,callback) {
        try{
            var query = 'select * from verification where email="'+param+'";';
            connection.query(query,function (err,data) {
                callback(err,data);
            })
        }
        catch (err){
            callback(err);
        }
    };

    module.exports.enterOtp = function (param, callback) {
        try {
            var query = 'insert into verification set ?';
            // console.log(param.phone);
            connection.query(query, param, function (err, data) {
                callback(err, data);
            });
        }
        catch (err){
            callback(err);
        }
    };

    module.exports.updatestatus  = function(param,callback){
        try{
            var query = 'update users set verified=1 where email="'+param+'";';
            connection.query(query,function (err, data) {
                callback(err,data);
            })
        }
        catch (err){
            callback(err);
        }
    };



    module.exports.login = function (param, callback) {
        try {
            var query = 'select email,password,verified from users where email = ?';
            connection.query(query, [param.email], function (err, data) {
                //console.log(data);
                callback(err, data);
            })
        }
        catch (err){
            callback(err);
        }
    };

    module.exports.entersession = function (param, callback) {
        try {
            var query = 'insert into sessions set?';
            connection.query(query, param, function (err, data) {
                callback(err, data);
            })
        }
        catch (err){
            callback(err);
        }
    };

    module.exports.checksession = function(sessionID,callback){
        try {
            var query = 'select * from sessions where sessionId = ' + '"' + sessionID + '";';
            connection.query(query, function (err, data) {
               // console.log(data);
                callback(err, data);
            })
        }
        catch (err){
            callback(err);
        }
    };

    module.exports.deletesession = function(email,callback) {
        try {
            var query = 'delete from sessions where email = ' + '"' + email +'" and expiry < '+moment.now()+ '';
            connection.query(query, function (err, data) {
                callback(err, data);
            })
        }
        catch (err){
            callback(err);
        }
    };

    module.exports.logout = function(sessionId,callback) {
        try {
            var query = 'delete from sessions where sessionId = ' + '"' + sessionId +'"';
            connection.query(query, function (err, data) {
                callback(err, data);
            })
        }
        catch (err){
            callback(err);
        }
    };

    module.exports.checkRegistration = function(param,callback){
        try {
            var query = 'select * from sportRegistration where email = ' + '"' + param.email + '" and sportId = '+param.sportId+';';
            // console.log(query);
            connection.query(query, function (err, data) {
                // console.log(data);
                callback(err, data);
            })
        }
        catch (err){
            callback(err);
        }
    };

    module.exports.getUsers = function (callback) {
      try{
          var query = 'select id,name,phone,email,college from users';
          connection.query(query,function (err, data) {
              callback(err,data);
          })
      }
      catch(err){
          callback(err);
      }
    };

    module.exports.checkAvailability= function(param,callback){
      try{
          var query = 'select count(sportId) as count from sportRegistration where sportId =?';
          connection.query(query,param,function (err, data) {
              //console.log(data[0].count);
              callback(err,data);
          })
      }
      catch (err){
          callback(err);
      }
    };

    module.exports.registerSport = function (param, callback) {
        try {
            var query = 'insert into sportRegistration set?';
            connection.query(query, param, function (err, data) {
                callback(err, data);
            })
        }
        catch (err){
            callback(err);
        }
    };

    module.exports.viewSport = function (param, callback) {
        try{
            //console.log(param);
            var query = 'select u.id,u.email,u.name,u.phone,u.college,sp.sport from users u join sportRegistration s on (u.email = s.email) join sports sp on (sp.id = s.sportId) where sp.id='+param+';';

            connection.query(query,function (err, data) {
              callback(err,data);
            })
        }
        catch (err){
            callback(err);
        }
    }
})();