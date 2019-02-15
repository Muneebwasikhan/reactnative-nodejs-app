exports = module.exports = function(app, mongoose) {
  var express = require("express");
  var router = express.Router();

  /* GET users listing. */
  router.post("/", async (req, res, next) => {
    // console.log(req.body)
    try {
      let previousData = await app.db.models.RegStudent.findOneAndUpdate(
        { fbId: req.body.fbId },
        { $set: { accessToken: req.body.accessToken } },
        { new: true }
      );
      if (previousData) {
        return res.send({
          success: true,
          already: true,
          studentData: previousData
        });
      }
      let RegStudentModel = new app.db.models.RegStudent({
        userName: req.body.name,
        fbId: req.body.fbId,
        accessToken: req.body.accessToken
      });
      let regStudent = await RegStudentModel.save();
      res.send({ success: true, already: false, studentData: regStudent });
    } catch (error) {
      res.send({ success: false, message: error.message });
    }
  });

  app.use("/studentAuth", router);
};
