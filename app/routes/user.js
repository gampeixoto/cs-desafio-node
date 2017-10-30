/* jshint node:true */
module.exports = (app) => {
    let controller = app.controllers.user;
    app.post('/user', controller.createUser);
    app.get('/user/:id',controller.getUser);
};