exports = module.exports = function(app, mongoose) {
  var express = require("express")
  var router = express.Router()

  /* GET users listing. */
  router.post("/", async (req, res, next) => {
    // console.log(req.body)
    try {
      let previousData = await app.db.models.User.findOneAndUpdate(
        { fbId: req.body.fbId },
        { $set: { accessToken: req.body.accessToken } },
        { new: true }
      )
      if (previousData) {
        return res.send({
          success: true,
          already: true,
          studentData: previousData
        })
      }
      let UserModel = new app.db.models.User({
        userName: req.body.name,
        fbId: req.body.fbId,
        accessToken: req.body.accessToken
      })
      let UserObj = await UserModel.save()
      res.send({ success: true, already: false, userData: User })
    } catch (error) {
      res.send({ success: false, message: error.message })
    }
  })

  app.use("/userauth", router)
}
