
exports = module.exports = function (app, mongoose) {

    // 'use strict';a

    var Schema = mongoose.Schema;

    var RegStudent = new Schema({
        userName: {
            type: String,
            require: true
        },
        fbId: {
            type: String,
            require: true
        },
        accessToken: {
            type: String,
            require: true
        },
        email: {
            type: String,
        },
        phoneNumber: {
            type: String,
        },
        profilePhoto: {
            type: String,
        }
    });

    app.db.model('RegStudent', RegStudent);

}