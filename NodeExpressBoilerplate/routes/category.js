exports = module.exports = function (app, mongoose) {
    var express = require("express")
    var router = express.Router()

    router.post("admin/category/add", function (req, res, next) {
        try {
            let category = new app.db.models.Category({
                name: req.body.name
            })
            let savedCatergory = await category.save()
            res.send({
                success: true,
                data: savedCatergory
            });
        } catch (err) {
            res.send({
                success: false,
                message: err.message
            });
        }
    });

    router.post("/category/getall", function (req, res, next) {
        try {
            let CategoryModel = app.db.models.Category;
            let categoryArray = await CategoryModel.find({})
            res.send({
                success: true,
                data: categoryArray
            });
        } catch (err) {
            res.send({
                success: false,
                message: err.message
            });
        }
    });

    app.use("/", router)
}