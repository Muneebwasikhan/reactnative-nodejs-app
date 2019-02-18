exports = module.exports = function(app, mongoose) {
  var express = require("express");
  var router = express.Router();

  /* GET users listing. */
  router.post("/numberandprofile", async (req, res, next) => {
    // console.log(req.body)
    try {
      let upadataDataNumImg = await app.db.models.RegStudent.findOneAndUpdate(
        { fbId: req.body.fbId },
        { $set: { phoneNumber: req.body.phoneNumber, profilePhoto: req.body.profilePhoto, } },
        { new: true }
      );
      if (upadataDataNumImg) {
        return res.send({
          success: true,
          studentData: upadataDataNumImg
        });
      }
      else{
        return res.send({
          success: false,
          message: 'Invalid User'
        });
      }
      
    } catch (error) {
      res.send({ success: false, message: error.message });
    }
  });

  app.use("/updateData", router);
};
