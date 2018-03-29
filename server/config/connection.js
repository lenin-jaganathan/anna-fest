(function(){

    var mysql = require('mysql');
    var config = require('./config.json');
    var con = mysql.createConnection(config.test);

    con.connect(function (err, data) {
        if(err){
            console.log("sql connection error :"+ err.message);
        }
        else{
            console.log("SQL connection made sucessfully");
        }
    });
    module.exports = con;
})();
