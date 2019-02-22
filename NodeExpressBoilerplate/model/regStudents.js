exports = module.exports = function(app, mongoose) {
  // 'use strict';a

  var Schema = mongoose.Schema

  var RegStudent = new Schema({
    userName: {
      type: String,
      require: true
    },
    fbId: {
      type: String,
      require: true
    },
    accessToken: {
      type: String,
      require: true
    },
    email: {
      type: String
    },
    phoneNumber: {
      type: String
    },
    skills: {
      type: Array
    },
    profilePhoto: {
      type: String
    },
    location: {
      type: Object
    },
    rating: {
      type: Object
    }
  })

  app.db.model("RegStudent", RegStudent)
}
