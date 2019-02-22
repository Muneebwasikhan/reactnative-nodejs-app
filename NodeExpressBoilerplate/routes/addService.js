exports = module.exports = function (app, mongoose) {
  var express = require("express");
  var router = express.Router();
  const multer = require("multer");
  const cloudinary = require("cloudinary");
  const validator = require("validator");


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
      console.log(req.body);
      res.send('data')
    } catch (error) {
      res.send({ success: false, message: error.message });
    }
  });

  app.use("/addservice", router);
};