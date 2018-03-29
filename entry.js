(function() {

    var expresss = require('express');
    var config = require('./server/config/config.json');
    var connection = require('./server/config/connection');
    var authHandler = require('./server/middlewares/authHandler');
    var bodyParser = require('body-parser');
    var cors = require('cors');
    var app = expresss();
    app.use(cors('combined'));
    app.use(bodyParser.json());
    app.use('/api/web/*',authHandler());
    var routes = require('./server/index')(app);

    process.on('SIGINT',function () {
        console.log("Server closed");
        process.exit(0);
    });
    app.listen(config.port);

    module.exports = app;
})();