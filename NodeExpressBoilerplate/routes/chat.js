exports = module.exports = function (app, mongoose) {
    var express = require("express")
    var router = express.Router()
    const socket = require('socket.io');
    const io = socket();


    router.post("/getallchat", async function (req, res, next) {
        try{

            let ChatModel = app.db.models.Chat;
            let ChatArray = await ChatModel.find({
                $or: [{
                    person1_id: req.body.userId,
                }, {
                    person2_id: req.body.userId
                }]
            });
            return res.send({
                success: true,
                data: ChatArray
            });
        }catch(err){
            return res.send({
                success: false,
                message: err.message
            });
        }

    })



    router.post("/getchat", async function (req, res, next) {
        try {
            if (req.body.person1_id == req.body.person2_id) {
                return res.send({success:false,message:"Please provide different ids you cancnot chat with yourself"})
            }
            let newChatObj = {
                person1_id: req.body.person1_id,
                person2_id: req.body.person2_id,
            }
            let person1Obj = await getPersonInfo(req.body.person1_id);
            let person2Obj = await getPersonInfo(req.body.person2_id);

            newChatObj.person1_name = person1Obj.userName;
            newChatObj.person2_name = person2Obj.userName;
            newChatObj.person1_image = person1Obj.profilePhoto;
            newChatObj.person2_image = person2Obj.profilePhoto;


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
                let messagesArray = await getMessages(ChatObj);
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
            });
        }
    });

    router.post('/sendmessage', async function (req, res, next) {
        console.log("socket.io")
        try {
            let messageObj = {
                message: req.body.message,
                senderId: req.body.user_id,
                chatId: req.body.chatId
            };
            let MessageModel = new app.db.models.Message(messageObj);
            let newMessageObj = await MessageModel.save();
            
            res.send({
                success: true,
                message: "Message Sent Successful"
            });
            io.emit(req.body.chatId, newMessageObj);
        } catch (err) {
            return res.send({
                success: false,
                message: err.message
            });
        }

    })


    app.use("/chat", router)


    /** 
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



    async function getPersonInfo(person_id) {
        console.log(person_id);
        return new Promise(async (resolve, reject) => {
            try {
                let UserModel = app.db.models.User;
                let PersonObj = await UserModel.findOne({
                    _id: person_id
                });
                if(!PersonObj){
                    return reject ({message:"User Id is Invalid"})
                }
                resolve(PersonObj);
            } catch (err) {
                reject(err)
            }
        })
    }



}