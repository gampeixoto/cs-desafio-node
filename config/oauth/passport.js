/* jshint node:true */

let passport = require('passport');
let LocalStrategi = require('passport-local').Strategy;
const User = require('../../app/models/user');
const Token = require('./token')();
const sponsor = require('../../sponsor');

module.exports = () => {
    passport.use(new LocalStrategi({ usernameField: "email", passwordField: "senha" },
        (email, password, done) => {
            User.findOne({ "email": email }, (err, user) => {
                if (err) { return done(err); }

                if (!user) { return done(null, false, { 'mensage': "Usuário e/ou senha inválidos" }); }

                user.verifyPassword(password)
                    .then((isValid) => {
                        if (isValid) {
                            user.lastLogin = Date.now();
                            let token = Token.gen(user);
                            Token.encrypt(token, user)
                                .then((user) => (done(null, sponsor(user, token))))
                                .catch((err) => (done(err)));
                        } else {
                            done(null, false, { 'mensage': "Usuário e/ou senha inválidos" });
                        }
                    });
            });
        }));
    
    
};
