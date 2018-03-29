(function () {
    var express = require('express');
    var router = express.Router();
    var activityController = require('../controllers/activityController');

    router.post('/registerSport',function (req, res) {
        activityController.registerSport(req,res);
    });


    module.exports = router;

})();