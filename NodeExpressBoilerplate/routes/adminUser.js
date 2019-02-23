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
    });
    router.post("/block", async function (req, res, next) {
        try {
            let UserModel = app.db.models.User;
            let UserData = await UserModel.findOneAndUpdate({
                _id: req.body._id
            }, {
                $set: {
                    block: true
                }
            }, {
                new: true
            });
            res.send({
                success: true,
                data: UserData
            });
        } catch (err) {
            res.send({
                success: false,
                message: err.message
            })
        }
    });
    router.post("/unblock", async function (req, res, next) {
        try {
            let UserModel = app.db.models.User;
            let UserData = await UserModel.findOneAndUpdate({
                _id: req.body._id
            }, {
                $set: {
                    block: false
                }
            }, {
                new: true
            });
            res.send({
                success: true,
                data: UserData
            });
        } catch (err) {
            res.send({
                success: false,
                message: err.message
            })
        }
    });

    router.post("/warning", async function (req, res, next) {
        try {
            let UserModel = app.db.models.User;
            let UserData = await UserModel.findOneAndUpdate({
                _id: req.body._id
            }, {
                $set: {
                    warning: true
                }
            }, {
                new: true
            });
            res.send({
                success: true,
                data: UserData
            });
        } catch (err) {
            res.send({
                success: false,
                message: err.message
            })
        }
    })

    router.post("/unwarning", async function (req, res, next) {
        try {
            let UserModel = app.db.models.User;
            let UserData = await UserModel.findOneAndUpdate({
                _id: req.body._id
            }, {
                $set: {
                    warning: false
                }
            }, {
                new: true
            });
            res.send({
                success: true,
                data: UserData
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