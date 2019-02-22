exports = module.exports = function (app, mongoose) {
    var express = require("express")
    var router = express.Router()

    router.post("/getchat", async function (req, res, next) {
        try {

            let newChatObj = {
                person1_id: req.body.person1_id,
                person2_id: req.body.person1_id,
                person1_name: req.body.person1_name,
                person2_name: req.body.person2_name
            }
            let ChatModel = app.db.models.Chat;

            let ChatObj = await ChatModel.findOne({
                $or: [{
                    person1_id: req.body.person1_id,
                    person2_id: req.body.person2_id
                }, {
                    person1_id: req.body.person2_id,
                    person2_id: req.body.person1_id
                }]
            })
            if (ChatObj) {
                let messagesArray = await getMessages(chatObj);
                res.send({
                    success: true,
                    data: {
                        chatObj: ChatObj,
                        messagesArray
                    }
                });
            } else {
                let newChat = new ChatModel(newChatObj);
                let newChatObject = await newChat.save();
                res.send({
                    success: true,
                    data: {
                        chatObj: newChatObject,
                        messagesArray: []
                    }
                })
            }

        } catch (err) {
            return res.send({
                success: false,
                message: err.message
            })
        }

    });


    app.use("/chat", router)







    /**
     * 
     * @param {Object} chatObj to find messages related to this
     */
    async function getMessages(chatObj) {
        return new Promise(async (resolve, reject) => {
            try {
                let MessageModel = app.db.models.Message;
                let MessageArray = await MessageModel.find({
                    chatId: chatObj._id
                });
                resolve(MessageArray);
            } catch (err) {
                reject(err)
            }
        })
    }



}