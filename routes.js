const loginRouter = require("./Routes/LoginRoutes");

module.exports = function(app) {
    app.use('/api/v1/', loginRouter);

}