/* jshint node:true */
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt-nodejs');
const config = require('../../config.js');

module.exports = () => {
    let token = {};

    token.gen = (user) => {
        let payload = { "sub": user.userID };
        return jwt.sign(payload, config.JWT_SECRET, {
            expiresIn: 30 * 60
        });
    };

    token.encrypt = (token, user) => {
        return new Promise((resolve, reject) => {
            bcrypt.genSalt(5, (erro, salt) => {
                if (erro) reject("não foi gerado o token");
                bcrypt.hash(token, salt, null, (err, hash) => {
                    if (err) reject("não foi gerado o token");

                    user.token = hash;
                    resolve(user.save());
                });
            });

        });
    };

    token.decrypt = (token, user) => {
        bcrypt.compare(token, user.token, (err, isMatch) => {
            if (err) return new Error('Não autorizado');
            return isMatch;
        });
    };

    return token;
};
