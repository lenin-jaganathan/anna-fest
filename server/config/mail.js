(function () {
    var nodemailer = require('nodemailer');

    var mail = nodemailer.createTransport("smtp",{
        service : "Gmail",
        auth :{
            user : "lenijl18@gmail.com",
            pass : "ninel1807"
        }
    });

    module.exports = mail;
})();
