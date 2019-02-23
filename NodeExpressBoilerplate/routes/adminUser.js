exports = module.exports = function (app, mongoose) {
    var express = require("express")
    var router = express.Router()

    router.post("/", async function (req, res, next) {
        try {
            let UserModel = app.db.models.User;
            let UserList = await UserModel.find({});
            res.send({
                success: true,
                data: UserList
            });
        } catch (err) {
            res.send({
                success: false,
                message: err.message
            })
        }
    })

    app.use("/admin/user", router)
}