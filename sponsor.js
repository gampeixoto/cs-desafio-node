/* jshint node:true */
const moment = require('moment');

module.exports = (user, token) =>{
    function formatPhone(phone) {
        return [{ ddd: phone.areaCode, numero: phone.number }];
    }

    function sponsor(_user, _token) {
        let responder = {};
        console.log(_user);
        responder.id = _user.userID;
        responder.nome = _user.name;
        responder.email = _user.email;
        responder.telefones = _user.phones.length === 1 ?
            formatPhone(_user.phones[0]) : _user.phones.map(
                (phone) => { return formatPhone(phone); });
        responder.data_criacao = moment(_user.created).format('DD/MM/YYYY');
        responder.data_atualizacao = moment(_user.updated).format('DD/MM/YYYY');
        responder.ultimo_login = moment(_user.lastLogin).format('DD/MM/YYYY HH:mm');
        responder.token = _token;

        return responder;
    }

    return sponsor(user, token);
};
