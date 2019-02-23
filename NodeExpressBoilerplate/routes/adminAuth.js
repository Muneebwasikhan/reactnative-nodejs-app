exports = module.exports = function (app, mongoose) {
    var express = require("express")
    var router = express.Router()

    router.post("/", function (req, res, next) {
        if (req.body.username == "irfan" && req.body.password == "123") {
            return res.send({
                success: true,
                databaseToken: "Pp1575z8ds7d5a4ass5d4asd98ad5a1ss6d54a98de"
            });
        }
        res.send({
            success: false,
            message: "Invalid username or password"
        })
    })

    app.use("/adminauth", router)
}