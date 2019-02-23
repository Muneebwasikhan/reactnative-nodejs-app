exports = module.exports = function (app, mongoose) {
    var express = require("express")
    var router = express.Router()

    router.get("/", function (req, res, next) {
        if (req.body.username == "irfan" && req.body.password) {
            return res.send({
                success: true,
                message: "Password Correct"
            });
        }
        res.send({
            success: false,
            message: "Invalid username or password"
        })
    })

    app.use("/adminauth", router)
}