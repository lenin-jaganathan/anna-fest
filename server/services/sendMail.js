(function () {
    var mailer  = require('../config/mail');

    module.exports.sendVerification = function (email, msg, callback) {
        var mailJson = {};
        mailJson.to = email;
        mailJson.from = 'chintokankarateindiaofficial@gmail.com';
        mailJson.text = 'Enter the otp to confirm registration.. '+msg;
        console.log('sending mail');
        mailer.sendMail(mailJson,function (err, data) {
            console.log(data);
            console.log(err);
            callback(err,data);
        })
    }

})();