exports = module.exports = function (app, mongoose) {
  var express = require("express")
  var router = express.Router();


  const cloudinary = require("cloudinary")
  const validator = require("validator")
  // const imgUpload  =require('./imgUploadMiddleWare');

  cloudinary.config({
    cloud_name: app.get("cloud_name"),
    api_key: app.get("api_key"),
    api_secret: app.get("api_secret")
  });



  /* GET users listing. */
  router.post("/numberandprofile", async (req, res, next) => {
    // console.log(req.body)
    try {

      if (!req.body.profilePhoto) {
        res.send({
          success: false,
          message: "Please provide Profile Image"
        })
      }
      // console.log(req.body);

      let profileImageObj = await uploadImage(req.body.profilePhoto);


      let upadataDataNumImg = await app.db.models.User.findOneAndUpdate({
        fbId: req.body.fbId
      }, {
        $set: {
          phoneNumber: req.body.phoneNumber,
          profilePhoto: profileImageObj.secure_url
        }
      }, {
        new: true
      })
      if (upadataDataNumImg) {
        return res.send({
          success: true,
          studentData: upadataDataNumImg
        })
      } else {
        return res.send({
          success: false,
          message: "Invalid User"
        })
      }
    } catch (error) {
      res.send({
        success: false,
        message: error.message
      })
    }
  })

  app.use("/updateData", router);




  //Upload Image
  async function uploadImage(image) {
    return new Promise((resolve, reject) => {
      try {
        cloudinary.v2.uploader.upload(
          image, {
            secure: true
          },
          (err, imgData) => {
            if (err) {
              reject(err)
            }
            console.log(imgData.secure_url)
            resolve(imgData)
          }
        )
      } catch (err) {
        reject(err)
      }
    })
  }




}