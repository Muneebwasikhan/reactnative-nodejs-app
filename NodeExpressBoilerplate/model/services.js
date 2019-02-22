
exports = module.exports = function (app, mongoose) {

    // 'use strict';a

    var Schema = mongoose.Schema;

    var Services = new Schema({
        title: {
            type: String
        },
        image: {
            type: String
        },
        user_id: {
            type: String
        },
        discription: {
            type: String
        },
        amount: {
            type: String
        },
        category: {
            type: String
        },
        longitude: {
            type: String
        },
        latitude: {
            type: String
        }
    });

    app.db.model('Services', Services);

}