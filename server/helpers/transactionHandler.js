(function () {
    var commonService = require('../services/commonServices');
    var responseHandler = require('./responseHandler');

    module.exports.commitHandler = function (res,data) {
        try{
            console.log('inside commit');
            commonService.commit(function (commiterr) {
                console.log('inside commit err');
                if(commiterr){

                    commonService.rollback(function (rollerr) {
                        if(rollerr){
                            responseHandler.error(res,roller);
                        }
                        else{
                            responseHandler.error(res,commiterr);
                        }
                    });
                }
                else{
                    responseHandler.response(res,data);
                }
            });
        }
        catch (err){
            responseHandler.error(res,err);
        }
    };


    module.exports.rollBackHandler = function (res, err) {
        try {
            commonService.rollback(function (rollerr) {
                if(rollerr){
                    responseHandler.error(res,rollerr);
                }
                else{
                    responseHandler.error(res,err);
                }
            });
        }
        catch (err){
            responseHandler.error(res,err);
        }
    };


})();