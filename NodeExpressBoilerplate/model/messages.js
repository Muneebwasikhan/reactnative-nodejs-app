exports = module.exports = function (app, mongoose) {
    "use strict"
    let Schema = mongoose.Schema

    let Message = new Schema({
        chatId: {
            type: String,
            required: true
        },
        senderId: {
            type: String,
            required: true
        },
        message: {
            type: String,
        },
        messageDataTime: {
            type: Number,
            default: Date.now()
        }
    })
    app.db.model("Message", Message)
}