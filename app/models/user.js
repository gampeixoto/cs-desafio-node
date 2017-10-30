/* jshint node:true */

let mongoose = require('mongoose');
let timestamp = require('mongoose-timestamp');
let validate = require('mongoose-validator');
let bcrypt = require('mongoose-bcrypt');
let validadeEmail = require('mongoose-unique-validator');

module.exports = function () {
    const phoneValidate = validate({
        validator: "isNumeric",
        message: "Só são aceitos numeros"
    });
    
    const emailValidadete = validate({
        validator: "isEmail",
        message: "Email esta em um formato inválido"
    });
    let UserSchema = mongoose.Schema({
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            require: true,
            index: {
                unique: true
            },
            validate: emailValidadete
        },
        password: {
            type: String,
            required: true,
            bcrypt: true
        },
        userID: {
            type: String,
            index: {
                unique: true
            }
        },
        lastLogin: {
            type: Date
        },
        phones: [{
            areaCode: {
                type: String,
                required: true,
                length: 2,
                validate: phoneValidate
            },
            number: {
                type: String,
                required: true,
                min: 8,
                max: 9,
                validate: phoneValidate
            }
        }],
        token: {
            type: String
        }
    });

    UserSchema.plugin(timestamp, {
        createdAt: 'created',
        updatedAt: 'updated'
    });

    UserSchema.plugin(validadeEmail, {message:"E-mail já existente"});

    UserSchema.plugin(bcrypt);

    UserSchema.static('createUserDate', function (params, callbacK) {
        return this.model("User")
            .create(params)
            .then((user) => {
                user.lastLogin = user.created;
                return user.save();
            }).then(callbacK);
    });

    return mongoose.model("User", UserSchema);
};