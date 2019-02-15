
exports = module.exports = function (app, mongoose) {

    // 'use strict';
    const validator = require('validator');
    var Schema = mongoose.Schema;

    var RegStudent = new Schema({
        userName: {
            type: String,
            require: true
        },
        fbId: {
            type: String,
            require: true,
        },
        accessToken: {
            type: String,
            require: true,
        },
        email: {
            type: String,
            trim: true,
            validate: {
                validator: validator.isEmail,
                message: '{VALUE} is not a valid email'
            }
        },
        phoneNumber: {
            type: String,
            minlength: 10,
            unique: true
        }
    });

    app.db.model('RegStudent', RegStudent);

}