
const Token = require('../../config/oauth/token')();
const sponsor = require('../../sponsor');

module.exports = (app) => {
    const User = app.models.user;
    
    app.post("/sing_in", (req, res, next) => {
        let token ="";
        User.findOne({ email: req.body.email })
            .then((user) => {
                return user.verifyPassword(req.body.password)
                    .then((isValid) => {
                        return (isValid) ? Promise.resolve(user) : Promise.reject(
                            res.status(403).json({ 'mensage': "Usuário e/ou senha inválidos" }));
                    });
            })
            .then((user) => {
                user.lastLogin = Date.now();
                token = Token.gen(user);
                return Token.encrypt(token, user);
            }).then((user) => {
                res.status(200).json(sponsor(user, token));
            })
            .catch((err) => {
                err.status = 401;
                err.message = { 'mensage': "Usuário e/ou senha inválidos" };
                next(err);
            });
    });
};