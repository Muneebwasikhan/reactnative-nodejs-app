exports = module.exports = function (app, mongoose) {
  var express = require("express");
  var router = express.Router();
  const multer = require("multer");
  const cloudinary = require("cloudinary");
  const validator = require("validator");
  // const imgUpload  =require('./imgUploadMiddleWare'); 

  var storage = multer.diskStorage({
    filename: function (req, file, callback) {
      callback(null, Date.now() + file.originalname);
    }
  });


  var imageFilter = function (req, file, cb) {
    // accept image files only
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/i)) {

      req.imgError = true;
      // return cb(new Error("Only image files are allowed!"), true);
    }
    cb(null, true);
  };
  var upload = multer({ storage: storage, fileFilter: imageFilter });

  cloudinary.config({
    cloud_name: app.get('cloud_name'),
    api_key: app.get('api_key'),
    api_secret: app.get('api_secret')
  });

  /* GET users listing. */
  router.post("/", async (req, res, next) => {
    // console.log(req.body)
    try {
      // console.log(req.file);
      // console.log(req.body);
      cloudinary.v2.uploader.upload(req.body.image, {
        secure: true,
      },
        (err, imgData) => {
          if (err) {
            // console.log(err);
            // change it to unable to process your image, please try again
            console.log(err.message)
            return res.send({ success: false, message: err.message });
          }

          console.log(imgData.secure_url);

          // updateStudent(req, res, imgData.secure_url, _id);

        });
      res.send({success:true})
    } catch (error) {
      console.log(error);
      res.send({ success: false, message: error.message });
    }
  });

  app.use("/addservice", router);
};