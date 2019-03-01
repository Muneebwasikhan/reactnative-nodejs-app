exports = module.exports = function (app, mongoose) {
  var express = require("express")
  var router = express.Router()
  const multer = require("multer")
  const cloudinary = require("cloudinary")
  const validator = require("validator")
  // const imgUpload  =require('./imgUploadMiddleWare');

  cloudinary.config({
    cloud_name: app.get("cloud_name"),
    api_key: app.get("api_key"),
    api_secret: app.get("api_secret")
  })

  /* GET users listing. */
  router.post("/addservice", async (req, res, next) => {
    console.log(req.body)
    try {
      if (!req.body.image) {
        return res.send({
          success: false,
          message: "Please Provide a valid Image"
        })
      }
      if (req.body.image.path) {
        var imageObj = await uploadImage(req.body.image.path)
      } else {
        var imageObj = await uploadImage(req.body.image)
      }

      let serviceObj = {
        imageUrl: imageObj.secure_url,
        title: req.body.title,
        user_id: req.body.user_id,
        discription: req.body.discription,
        amount: req.body.amount,
        category: req.body.category
      }

      let newServiceModel = new app.db.models.Services(serviceObj);

      let newServiceObj = await newServiceModel.save();

      res.send({
        success: true,
        data: newServiceObj
      })
    } catch (err) {
      console.log(err)
      res.send({
        success: false,
        message: err.message
      })
    }
  });


  router.post('/getservices', async function (req, res, next) {
    try {
      let ServiceModel = app.db.models.Services;
      let ServiceArray = await ServiceModel.find(req.body);
      res.send({
        success: true,
        data: ServiceArray
      });
    } catch (err) {
      res.send({
        success: false,
        message: err.message
      })
    }
  });







  router.post('/getalluserservices', async function (req, res, next) {
    try {
      let ServiceModel = app.db.models.Services;
      let ServiceArray = await ServiceModel.find({
        user_id: req.body.user_id
      });
      res.send({
        success: true,
        data: ServiceArray
      });
    } catch (err) {
      res.send({
        success: false,
        message: err.message
      })
    }
  });


  app.use("/service", router)



  //Helper Functions

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