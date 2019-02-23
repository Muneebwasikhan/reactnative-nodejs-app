exports = module.exports = function (app, mongoose) {
    "use strict"
    let Schema = mongoose.Schema

    let Category = new Schema({
        name: {
            type: String
        },
        date: {
            type: Number,
            default: Date.now()
        }
    })
    app.db.model("Category", Category)
}