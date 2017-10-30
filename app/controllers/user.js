/* jshint node:true */

const guid = require('guid');
const Token = require('../../config/oauth/token')();
const sponsor = require('../../sponsor');
module.exports = (app) => {
    const User = app.models.user;

    let Controller = {};

    Controller.createUser = (req, res) => {
        console.log('cheguei no controle');
        let data = req.body;
        console.log(data);
        let _user = {};
        _user.userID = guid.raw();
        _user.name = data.nome;
        _user.email = data.email;
        _user.password = data.senha;
        _user.phones = (data.telefones || []).map((phone) => {
            return { areaCode: phone.ddd, number: phone.numero };
        });

        let token;
        User.createUserDate(_user)
            .then((result) => {
                if (!result)
                    res.status(400).json({ "mensagem": "E-mail já existente" });

                let user = result;
                token = Token.gen(user);
                return Token.encrypt(token, user);
            })
            .then((user) => (res.json(sponsor(user, token))))
            .catch((erro) => (res.status(400).json({ 'mensagem': erro.message })));

    };

    Controller.getUser = function (req, res) {
        User.find({ "userID": req.params.id }).exec()
            .then(function (user) {
                let result = user[0];
                delete result.token;
                res.json(sponsor(result));
            });
    };
    return Controller;
};
