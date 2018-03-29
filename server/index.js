(function () {
    
    module.exports = function (app) {
        app.use('/api/web',require('./routes/activitiesRoutes'));
        app.use('/user',require('./routes/routes'));
    };

})();