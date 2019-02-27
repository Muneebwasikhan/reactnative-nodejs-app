exports = module.exports = function (app, mongoose) {
    "use strict"
    let Schema = mongoose.Schema

    let UserSchema = new Schema({
        person1_id: {
            type: String,
            required:true
        },
        person1_name: {
            type: String,
            required:true
        },
        person1_image:{
            type: String,
            required:true
        },
        person2_id: {
            type: String,
            required:true
        },
        person2_name: {
            type: String,
            required:true
        },
        person2_image:{
            type: String,
            required:true
        },
        chatInitDate: {
            type: Number,
            default: Date.now()
        }
    })
    app.db.model("Chat", UserSchema)
}
